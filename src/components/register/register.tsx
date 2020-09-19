import React, { Component, ChangeEvent } from "react";
import axios from "axios";
import "./register.css";
import { UserRegisterDetails } from "../../models/UserRegisterDetails";
import { SuccessfulLoginServerResponse } from "../../models/SuccessfulLoginServerResponse";
import { store } from "../../redux/store";
import { ActionType } from "../../redux/action-type";
import config from "../../config";
import ResponsiveDialog from "../dialog/dialog";

interface RegisterState {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  is_modal_open: boolean;
}

export default class Register extends Component<any, RegisterState> {
  private errorMessage: string;

  public constructor(props: any) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      is_modal_open: false,
    };

    this.errorMessage = "";
  }

  public componentDidMount() {
    store.dispatch({
      type: ActionType.ChangeUserState,
      payload: "REGISTER",
    });
  }

  private onFirstnameInputChanged = (args: ChangeEvent<HTMLInputElement>) => {
    const firstname = args.target.value;
    this.setState({ firstname });
  };

  private onLastnameInputChanged = (args: ChangeEvent<HTMLInputElement>) => {
    const lastname = args.target.value;
    this.setState({ lastname });
  };

  private onUsernameInputChanged = (args: ChangeEvent<HTMLInputElement>) => {
    const username = args.target.value;
    this.setState({ username });
  };

  private onPasswordInputChanged = (args: ChangeEvent<HTMLInputElement>) => {
    const password = args.target.value;
    this.setState({ password });
  };

  private register = async () => {
    try {
      let userRegisterDetails = new UserRegisterDetails(
        this.state.firstname,
        this.state.lastname,
        this.state.username,
        this.state.password
      );
      const response = await axios.post<SuccessfulLoginServerResponse>(
        `${config.server_url}/users/`,
        userRegisterDetails
      );
      const serverResponse = response.data;

      axios.defaults.headers.common["Authorization"] =
        "Bearer " + serverResponse.token;

      store.dispatch({
        type: ActionType.Login,
        payload: serverResponse,
      });

      sessionStorage.setItem("user_data", JSON.stringify(serverResponse));

      this.props.history.push("/mainPage");
    } catch (error) {
      console.log(error);
      this.errorMessage = "Failed to register, " + error.response.data;
      this.setState({ is_modal_open: true });
    }
  };

  public onModalClosed() {
    this.setState({ is_modal_open: false });
    this.errorMessage = "";
  }

  /**
   * Validates that the text inputs  meet the requirements and setting an error message accordingly
   */
  public isFormValid = () => {
    let { firstname, lastname, username, password } = this.state;

    if (firstname.trim().length < 3 || firstname.trim().length > 20) {
      this.errorMessage = "Firstname must contain between 3 - 20 letters";
      return false;
    }
    if (lastname.trim().length < 3 || lastname.trim().length > 20) {
      this.errorMessage = "Lastname must contain between 3 - 20 letters";
      return false;
    }
    if (username.trim().length < 4 || username.trim().length > 16) {
      this.errorMessage = "Username must contain between 4 - 20 letters";
      return false;
    }
    if (password.trim().length < 4 || password.trim().length > 16) {
      this.errorMessage = "Password must contain between 4 - 16 letters";
      return false;
    }

    return true;
  };

  public render() {
    return (
      <div className="register">
        <input
          type="text"
          placeholder="Firstname"
          name="firstname"
          value={this.state.firstname}
          onChange={this.onFirstnameInputChanged}
        />
        <br />
        <input
          type="text"
          placeholder="Lastname"
          name="lastname"
          value={this.state.lastname}
          onChange={this.onLastnameInputChanged}
        />
        <br />
        <input
          type="text"
          placeholder="User name"
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
        <input
          type="button"
          value="login"
          disabled={!this.isFormValid()}
          onClick={this.register}
        />

        {!this.isFormValid() && (
          <div className="alertMessage">
            <span>{this.errorMessage}</span>
          </div>
        )}

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
