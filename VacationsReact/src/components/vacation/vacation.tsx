import React, { Component } from "react";
import "./vacation.css";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { IconButton } from "@material-ui/core";
import { store } from "../../redux/store";
import { Unsubscribe } from "redux";
import { SuccessfulLoginServerResponse } from "../../models/SuccessfulLoginServerResponse";
import config from "../../config";

interface VacationState {
  loggedInUser: SuccessfulLoginServerResponse;
}

export default class VacationComponent extends Component<any, VacationState> {
  private unsubscribeStore: Unsubscribe;

  public constructor(props: any) {
    super(props);
    this.state = {
      loggedInUser: store.getState().loggedInUser,
    };
  }

  public async componentDidMount() {
    // this.unsubscribeStore = store.subscribe(() =>
    //   this.setState({
    //     loggedInUser: store.getState().loggedInUser,
    //   })
    // );
  }

  componentWillUnmount() {
    // this.unsubscribeStore();
  }

  public render() {
    return (
      <div className="vacation">
        <Card className="root">
          <CardMedia
            className="media"
            image={
              config.server_url +
              "/uploads/" +
              this.props.vacation.image_file_name
            }
            title={this.props.vacation.destination}
          />
          <CardContent>
            {this.state.loggedInUser?.user_type === "ADMIN" && (
              <div>
                <IconButton
                  aria-label="edit"
                  color="primary"
                  onClick={() => this.props.onEditClicked(this.props.vacation)}
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  aria-label="delete"
                  onClick={() =>
                    this.props.onDeleteClicked(this.props.vacation.id)
                  }
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            )}
            <Typography gutterBottom variant="h5" component="h2">
              {this.props.vacation.destination}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="p"
              className="description"
            >
              {this.props.vacation.description}
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              component="span"
              className="description"
            >
              Only {this.props.vacation.price}$
            </Typography>
          </CardContent>
          <CardActions className="d-flex">
            {this.state.loggedInUser?.user_type !== "ADMIN" && (
              <Button
                size="small"
                color="primary"
                onClick={() => {
                  this.props.onFollowButtonClicked(this.props.vacation);
                }}
              >
                {this.props.vacation.is_following ? "Unfollow" : "Follow"}
              </Button>
            )}

            <div className="ml-auto p-2">
              <span className="startDate">
                {this.props.vacation.start_date} -{" "}
              </span>
              <span className="endDate">{this.props.vacation.end_date}</span>
            </div>
          </CardActions>
        </Card>
      </div>
    );
  }
}
