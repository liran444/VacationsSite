import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import VacationForm from "../vacation-form/vacation-form";

interface DialogState {
  open: boolean;
}

export default class ResponsiveDialog extends Component<any, DialogState> {
  public constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={() => this.props.onClose()}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle
            id="responsive-dialog-title"
            className="formHeader addVacation"
          >
            {this.props.errorMessage
              ? "Error!"
              : this.props.admin_state + " A Vacation"}
            <hr />
          </DialogTitle>
          <DialogContent>
            {this.props.errorMessage ? (
              this.props.errorMessage
            ) : (
                <VacationForm onClose={() => this.props.onClose()} />
              )}
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={() => this.props.onClose()}
              color="primary"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
