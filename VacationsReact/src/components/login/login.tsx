import React, { Component, ChangeEvent } from "react";
import axios from "axios";
import "./login.css";
import { UserLoginDetails } from "../../models/UserLoginDetails";
import { SuccessfulLoginServerResponse } from "../../models/SuccessfulLoginServerResponse";
import { store } from "../../redux/store";
import { ActionType } from "../../redux/action-type";
import config from "../../config";
import ResponsiveDialog from "../dialog/dialog";

interface LoginState {
  username: string;
  password: string;
  is_modal_open: boolean;
}

export default class Login extends Component<any, LoginState> {
  private errorMessage: string;

  public constructor(props: any) {
    super(props);
    this.state = {
      username: "",
      password: "",
      is_modal_open: false,
    };

    this.errorMessage = "";
  }

  public componentDidMount() {
    store.dispatch({
      type: ActionType.ChangeUserState,
      payload: "LOGIN",
    });
  }

  private onUsernameInputChanged = (args: ChangeEvent<HTMLInputElement>) => {
    const username = args.target.value;
    this.setState({ username });
  };

  private onPasswordInputChanged = (args: ChangeEvent<HTMLInputElement>) => {
    const password = args.target.value;
    this.setState({ password });
  };

  private login = async () => {
    try {
      let userLoginDetails = new UserLoginDetails(
        this.state.username,
        this.state.password
      );
      const response = await axios.post<SuccessfulLoginServerResponse>(
        `${config.server_url}/users/login`,
        userLoginDetails
      );
      const serverResponse = response.data;

      axios.defaults.headers.common["Authorization"] =
        "Bearer " + serverResponse.token;

      store.dispatch({
        type: ActionType.Login,
        payload: serverResponse,
      });

      this.props.history.push("/mainPage");
    } catch (error) {
      console.log(error);
      this.errorMessage = "Failed to log-in, " + error.response.data;
      this.setState({ is_modal_open: true });
    }
  };

  public onModalClosed() {
    this.setState({ is_modal_open: false });
    this.errorMessage = "";
  }

  public render() {
    return (
      <div className="login">
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={this.state.username}
          onChange={this.onUsernameInputChanged}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          name="password"
          value={this.state.password}
          onChange={this.onPasswordInputChanged}
        />
        <br />
        <input type="button" value="login" onClick={this.login} />

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
}
