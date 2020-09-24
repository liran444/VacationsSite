import React, { Component } from "react";
import { Bar } from 'react-chartjs-2';
import axios from "axios";
import config from "../../config";
import { FollowersData } from "../../models/FollowersData";
import ResponsiveDialog from "../dialog/dialog";
import "./graph.css";

interface GraphState {
  data: object,
  is_modal_open: boolean
}

export default class Graph extends Component<any, GraphState> {
  public errorMessage: string;
  public options: object;

  public constructor(props: any) {
    super(props);
    this.state = {
      data: null,
      is_modal_open: false
    };

    this.options = {
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            min: 0,
            stepSize: 1
          }
        }]
      },
    }
    this.errorMessage = "";
  }


  public async componentDidMount() {
    await this.getAllFollowersData();
  }

  public getAllFollowersData = async () => {
    try {
      const response = await axios.get<FollowersData[]>(
        `${config.server_url}/followers/`
      );
      this.displayData(response.data)

    } catch (error) {
      this.errorMessage = "Failed to get Vacations, " + error.response?.data;
      this.setState({ is_modal_open: true });
    }
  };

  public displayData(followersData: FollowersData[]) {
    let labels: any = [];
    let dataArray: any = [];

    for (let prop in followersData) {
      if (Object.prototype.hasOwnProperty.call(followersData, prop)) {
        labels[prop] = (`Vacation #${followersData[prop].vacation_id}`);
        dataArray[prop] = (followersData[prop].total_followers);
      }
    }
    const data = {
      labels: [...labels],
      datasets: [
        {
          label: 'Amount of Followers',
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: [...dataArray]
        }
      ]
    }
    this.setState({ data })
  }

  public onModalClosed() {
    this.setState({ is_modal_open: false });
    this.errorMessage = "";
  }

  public onGoBackButtonClicked() {
    this.props.history.push("/mainPage");
  }

  render() {
    return (
      <div className="graphContainer">
        <div>
          <h2>Admin Reports</h2>
          <button className="btn btn-primary" onClick={() => this.onGoBackButtonClicked()}>Go Back</button>
        </div>
        {this.state.data &&
          <Bar
            data={this.state.data}
            width={100}
            height={500}
            options={this.options}
          />
        }

        {this.state.is_modal_open && (
          <ResponsiveDialog
            open={this.state.is_modal_open}
            onClose={() => this.onModalClosed()}
            errorMessage={this.errorMessage}
          />
        )}
      </div>
    );
  }
};
