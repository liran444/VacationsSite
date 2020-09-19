import React, { Component } from "react";
import "./header.css";
import { NavLink } from "react-router-dom";
import { store } from "../../redux/store";
import { ActionType } from "../../redux/action-type";
import { Unsubscribe } from "redux";
import { SuccessfulLoginServerResponse } from "../../models/SuccessfulLoginServerResponse";

interface HeaderState {
  loggedInUser: SuccessfulLoginServerResponse;
  user_state: string;
}

export default class Header extends Component<any, HeaderState> {
  private unsubscribeStore: Unsubscribe;
  public store: { phone: string; email: string };

  constructor(prop: any) {
    super(prop);
    this.state = { loggedInUser: null, user_state: "default" };

    this.store = {
      email: "vacations4u.email.com",
      phone: "+972-50-455-0188",
    };
  }

  componentDidMount() {
    this.unsubscribeStore = store.subscribe(() =>
      this.setState({
        loggedInUser: store.getState().loggedInUser,
        user_state: store.getState().user_state,
      })
    );

    store.dispatch({
      type: ActionType.GetUserDataFromSessionStorage,
      payload: null,
    });
  }

  private logout = () => {
    sessionStorage.removeItem("user_data");

    store.dispatch({
      type: ActionType.Login,
      payload: null,
    });
  };

  componentWillUnmount() {
    this.unsubscribeStore();
  }

  // public componentDidMount() {
  //   store.dispatch({
  //     type: ActionType.ChangeUserState,
  //     payload: "LOGIN",
  //   });
  // }

  public render() {
    return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <span id="profile">
                Welcome {this.state.loggedInUser?.firstname} to Vacations4U!
              </span>
              {this.state.loggedInUser !== null && (
                <NavLink
                  to="/login"
                  exact
                  onClick={this.logout}
                  className="btn btn-danger headerButton"
                >
                  Log-out
                </NavLink>
              )}
              {!this.state.loggedInUser &&
                this.state.user_state === "REGISTER" && (
                  <NavLink
                    to="/login"
                    exact
                    className="btn btn-primary headerButton"
                  >
                    Login
                  </NavLink>
                )}

              {!this.state.loggedInUser && this.state.user_state === "LOGIN" && (
                <NavLink
                  to="/register"
                  exact
                  className="btn btn-primary headerButton"
                >
                  Register
                </NavLink>
              )}
            </div>
            <div className="topRightCornerDiv">
              <div className="float-right contactUsDiv">
                <p className="infoText">
                  Contact Us:{" "}
                  <span>
                    {" "}
                    {this.store.phone} - {this.store.email}{" "}
                  </span>
                </p>
              </div>
              <div id="myNavbar">
                <ul className="nav navbar-nav navbar-right navbarUl"></ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
