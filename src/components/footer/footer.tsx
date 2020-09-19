import React, { Component } from "react";
import "./footer.css";

export default class Footer extends Component {
  public owner: string = "Liran Dekamhi";
  public currentYear: number = new Date().getFullYear();

  public render() {
    return (
      <div>
        <p className="footer">
          &copy; Copyrights reservered to {this.owner} - {this.currentYear}
        </p>
      </div>
    );
  }
}
