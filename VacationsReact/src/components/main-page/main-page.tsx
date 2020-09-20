import React, { ChangeEvent, Component } from "react";
import "./main-page.css";
import axios from "axios";
import { store } from "../../redux/store";
import { Unsubscribe } from "redux";
import { ActionType } from "../../redux/action-type";
import { Vacation } from "../../models/Vacation";
import config from "../../config";
import ResponsiveDialog from "../dialog/dialog";
import VacationComponent from "../vacation/vacation";
import { Button } from "@material-ui/core";
import { SuccessfulLoginServerResponse } from "../../models/SuccessfulLoginServerResponse";
import DatePicker from "react-datepicker";
import socketIOClient from "socket.io-client";

interface MainPageState {
  vacations: Vacation[];
  is_modal_open: boolean;
  loggedInUser: SuccessfulLoginServerResponse;
  start_date: Date;
  end_date: Date;
  description: string;
  socket: any;
}

export default class MainPage extends Component<any, MainPageState> {
  private unsubscribeStore: Unsubscribe;
  public admin_state: string;
  public vacation_under_edit: Vacation;
  private errorMessage: string;
  private min_date?: Date;
  // public socket: Object;

  public constructor(props: any) {
    super(props);
    this.state = {
      vacations: [],
      is_modal_open: false,
      loggedInUser: store.getState().loggedInUser,
      start_date: null,
      end_date: null,
      description: "",
      socket: null
    };

    this.admin_state = "default";
    this.vacation_under_edit = null;
    this.errorMessage = "";
    this.min_date = new Date();
    this.min_date.setDate(this.min_date.getDate() + 1);
    // this.socket = null;
  }

  public async componentDidMount() {
    this.unsubscribeStore = store.subscribe(() => {

      let loggedInUser = store.getState().loggedInUser;
      this.setState({
        vacations: store.getState().vacations,
        loggedInUser,
      })

    });
    let socketConn = socketIOClient(`http://${window.location.hostname}:3002`);
    this.setState({ socket: socketConn });
    //Register to edit vacation event
    socketConn.on("edit-vacation", (editedVacation: Vacation) => {
      store.dispatch({
        type: ActionType.UpdateStoredVacation,
        payload: editedVacation,
      });
    });

    //Register to delete vacation event
    socketConn.on("delete-vacation", (id: number) => {
      store.dispatch({
        type: ActionType.DeleteVacation,
        payload: id,
      });
    });

    //Register to add vacation event
    socketConn.on("add-vacation", (vacation: Vacation) => {
      console.log('vacation.id', vacation.id);
      store.dispatch({
        type: ActionType.AddVacation,
        payload: vacation,
      });
    });

    await this.getAllVacations();
  }

  /**
   * Handles the selection of starting date and updates the state
   * @param value - The starting date selected for the vacation
   */
  public onStartDateSelected = (value: any) => {
    const start_date = this.fixDate(value);
    this.setState({ start_date });
  };

  /**
   * Handles the selection of starting date and updates the state
   * @param value - The ending date selected for the vacation
   */
  public onEndDateSelected = (value: any) => {
    const end_date = this.fixDate(value);
    this.setState({ end_date });
  };

  public fixDate(date: any) {
    if (date) {
      let fixedDate = date;
      // Fixing some issue related to timezones
      fixedDate.setMinutes(300);
      return fixedDate;
    }
    return null;
  }

  private onDescriptionInputChanged = (args: ChangeEvent<HTMLInputElement>) => {
    const description = args.target.value;
    this.setState({ description });
  };

  public getAllVacations = async () => {
    try {
      const response = await axios.get<Vacation[]>(
        `${config.server_url}/vacations/`
      );

      // response.data = all the vacations that were returned from the server
      store.dispatch({
        type: ActionType.GetAllVacations,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
      this.errorMessage = "Failed to get Vacations, " + error.response?.data;
      this.setState({ is_modal_open: true });
    }
  };

  public onEditVacationClicked(vacation: Vacation) {
    this.setState({ is_modal_open: true });
    this.admin_state = "Editing";
    this.vacation_under_edit = vacation;

    store.dispatch({
      type: ActionType.StoreVacationUnderEdit,
      payload: { vacation: vacation, admin_state: this.admin_state },
    });
  }

  public onAddVacationClicked() {
    this.setState({ is_modal_open: true });
    this.admin_state = "Adding";

    store.dispatch({
      type: ActionType.StoreVacationUnderEdit,
      payload: { vacation: null, admin_state: this.admin_state },
    });
  }

  public onModalClosed() {
    this.setState({ is_modal_open: false });
    this.admin_state = "default";
    this.errorMessage = "";

    store.dispatch({
      type: ActionType.StoreVacationUnderEdit,
      payload: { vacation: null, admin_state: this.admin_state },
    });
  }

  public onDeleteVacationClicked = async (id: number) => {
    try {
      await axios.delete<void>(`${config.server_url}/vacations/${id}`);
    } catch (error) {
      console.log(error);
      this.errorMessage = "Failed to delete Vacation, " + error.response.data;
      this.setState({ is_modal_open: true });
    }
  };

  public onStatisticsClicked() {
    this.props.history.push("/adminReports");
  }

  componentWillUnmount() {
    this.unsubscribeStore();
  }

  public unfollowVacation = async (vacation: Vacation) => {
    try {
      await axios.delete<void>(
        `${config.server_url}/followers/unfollow?vacation_id=${vacation.id}`
      );
      vacation.is_following = false;

      store.dispatch({
        type: ActionType.UpdateIsFollowing,
        payload: vacation,
      });
    } catch (error) {
      console.log(error);
      this.errorMessage = "Failed to unfollow Vacation, " + error.response.data;
      this.setState({ is_modal_open: true });
    }
  };

  public followVacation = async (vacation: Vacation) => {
    try {
      await axios.post<void>(
        `${config.server_url}/followers/follow?vacation_id=${vacation.id}`
      );
      vacation.is_following = true;

      store.dispatch({
        type: ActionType.UpdateIsFollowing,
        payload: vacation,
      });
    } catch (error) {
      console.log(error);
      this.errorMessage = "Failed to follow Vacation, " + error.response.data;
      this.setState({ is_modal_open: true });
    }
  };

  public onFollowButtonClicked = async (vacation: Vacation) => {
    let duplicateValue = vacation.is_following;
    if (duplicateValue) {
      await this.unfollowVacation(vacation);
    } else if (!duplicateValue || duplicateValue === undefined) {
      await this.followVacation(vacation);
    }
  };

  public render() {
    console.log(this.state.vacations)
    const filteredData = [...this.state.vacations]
      .filter((vacation) =>
        this.state.start_date
          ? vacation.start_date ===
          this.state.start_date.toISOString().split("T")[0]
          : 1
      )
      .filter((vacation) =>
        this.state.end_date
          ? vacation.end_date ===
          this.state.end_date?.toISOString().split("T")[0]
          : 1
      )
      .filter((vacation) =>
        this.state.description
          ? vacation.description
            .toLowerCase()
            .includes(this.state.description.toLowerCase())
          : 1
      );

    return (
      <div className="mainPage">
        <div className="flexDiv">
          <div className="searchBar">
            <span className="formSpan">Search Bar:</span>
            <DatePicker
              selected={this.state.start_date}
              onChange={(date) => {
                this.onStartDateSelected(date);
              }}
              placeholderText="Start Date"
              minDate={this.min_date}
              isClearable
            />

            <DatePicker
              selected={this.state.end_date}
              onChange={(date) => {
                this.onEndDateSelected(date);
              }}
              placeholderText="End Date"
              minDate={this.min_date}
              isClearable
            />

            <input
              type="text"
              placeholder="Description"
              name="description"
              value={this.state.description}
              onChange={this.onDescriptionInputChanged}
            />
          </div>
          {this.state.loggedInUser?.user_type === "ADMIN" && (
            <div className="adminNavDiv">
              <Button
                variant="contained"
                color="primary"
                className="statisticsButton"
                onClick={() => this.onStatisticsClicked()}
              >
                Statistics
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="addVacationButton"
                onClick={() => this.onAddVacationClicked()}
              >
                Add Vacation
              </Button>
            </div>
          )}
        </div>

        {filteredData.map((vacation, index) => (
          <VacationComponent
            vacation={vacation}
            key={index}
            is_following={vacation.is_following}
            onEditClicked={(vacation: Vacation) => {
              this.onEditVacationClicked(vacation);
            }}
            onDeleteClicked={(id: number) => {
              this.onDeleteVacationClicked(id);
            }}
            onFollowButtonClicked={(vacation: Vacation) => {
              this.onFollowButtonClicked(vacation);
            }}
          />
        ))}

        {filteredData.length === 0 && (
          <h3 className="noDataText">No Vacations Found</h3>
        )}

        {this.state.is_modal_open && (
          <ResponsiveDialog
            open={this.state.is_modal_open}
            admin_state={this.admin_state}
            onClose={() => this.onModalClosed()}
            errorMessage={this.errorMessage}
          />
        )}
      </div>
    );
  }
}
