import React, { Component } from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import "./layout.css";
import Header from "../header/header";
import Footer from "../footer/footer";
import MainPage from "../main-page/main-page";
import Login from "../login/login";
import Register from "../register/register";
import Graph from "../graph/graph";

export default class Layout extends Component {
  public render() {
    return (
      <BrowserRouter>
        <section className="layout">
          <header>
            <Header />
          </header>

          <main>
            <Switch>
              <Route path="/mainPage" component={MainPage} exact />
              <Route path="/login" component={Login} exact />
              <Route path="/register" component={Register} exact />
              <Route path="/adminReports" component={Graph} exact />
              <Redirect from="/" to="/login" exact />
              <Redirect from="**" to="/login" exact />
            </Switch>
          </main>

          <footer>
            <Footer />
          </footer>
        </section>
      </BrowserRouter>
    );
  }
}
