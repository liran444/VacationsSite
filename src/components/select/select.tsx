import React, { Component } from "react";
import "./select.css";

export default class SelectComponent extends Component<any> {
  public constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div>
        <select
          name={this.props.name}
          onChange={this.props.onOptionSelected}
          value={
            this.props.selected?.id
              ? JSON.stringify(this.props.selected)
              : "default"
          }
        >
          <option disabled value="default" key="default">
            {this.props.placeholder}
          </option>

          {/* Iterating through an array of options and assigning as a value for each option 
          a Stringified JSON object */}
          {this.props.options.map((option: any, index: any) => (
            <option value={JSON.stringify(option)} key={index}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
