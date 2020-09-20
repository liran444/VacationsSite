import React, { Component, ChangeEvent, FormEvent } from "react";
import "./vacation-form.css";
import axios from "axios";
import { store } from "../../redux/store";
import { ActionType } from "../../redux/action-type";
import { Destination } from "../../models/Destination";
import DatePicker from "react-datepicker";
import config from "../../config";
import SelectComponent from "../select/select";
import "react-datepicker/dist/react-datepicker.css";
import { Unsubscribe } from "redux";
import { Vacation } from "../../models/Vacation";
import ResponsiveDialog from "../dialog/dialog";
import FormData from "form-data";

interface VacationFormState {
  admin_state: string;
  vacation_under_edit: Vacation;
  destinations: Destination[];
  chosen_destination: Destination;
  description: string;
  start_date: Date;
  end_date: Date;
  price: number;
  is_modal_open: boolean;
  preview: string;
}

export default class VacationForm extends Component<any, VacationFormState> {
  private unsubscribeStore: Unsubscribe;
  private min_date?: Date;
  private errorMessage?: string;
  private fileInput: HTMLInputElement;

  public constructor(props: any) {
    super(props);
    this.state = {
      admin_state: "default",
      vacation_under_edit: store.getState().vacation_under_edit,
      destinations: [],
      chosen_destination: null,
      description: "",
      start_date: null,
      end_date: null,
      price: null,
      is_modal_open: false,
      preview: "",
    };

    this.min_date = new Date();
    this.errorMessage = "";
  }

  public async componentDidMount() {
    this.unsubscribeStore = store.subscribe(() =>
      this.setState({
        destinations: store.getState().destinations,
        vacation_under_edit: store.getState().vacation_under_edit,
        admin_state: store.getState().admin_state,
      })
    );
    if (store.getState().vacation_under_edit !== null) {
      this.initState();
    } else {
      this.initDates();
    }

    this.setState({
      admin_state: store.getState().admin_state,
    });
    await this.getAllDestinations();
  }

  public initState = () => {
    this.setState({
      chosen_destination: {
        id: store.getState().vacation_under_edit?.destination_id,
        name: store.getState().vacation_under_edit?.destination,
      },
      start_date: new Date(store.getState().vacation_under_edit?.start_date),
      end_date: new Date(store.getState().vacation_under_edit?.end_date),
      description: store.getState().vacation_under_edit?.description,
      price: store.getState().vacation_under_edit?.price,
    });
  };

  public initDates = () => {
    let two_days_from_now = new Date();
    this.min_date.setDate(this.min_date.getDate() + 1);
    two_days_from_now.setDate(two_days_from_now.getDate() + 2);

    this.setState({ start_date: this.min_date });
    this.setState({ end_date: two_days_from_now });
  };

  public getAllDestinations = async () => {
    if (store.getState().destinations.length === 0) {
      try {
        const response = await axios.get<Destination[]>(
          `${config.server_url}/destinations/`
        );

        store.dispatch({
          type: ActionType.GetAllDestinations,
          payload: response.data,
        });
      } catch (error) {
        console.log(error);
        this.errorMessage =
          "Failed to get Destinations, " + error.response.data;
        this.setState({ is_modal_open: true });
      }
    } else {
      this.setState({
        destinations: store.getState().destinations,
      });
    }
  };

  /**
   * Handles the selection of starting date and updates the state
   * @param value - The starting date selected for the vacation
   */
  public onStartDateSelected = (value: any) => {
    const start_date = value;
    this.setState({ start_date });
  };

  /**
   * Handles the selection of starting date and updates the state
   * @param value - The ending date selected for the vacation
   */
  public onEndDateSelected = (value: any) => {
    const end_date = value;
    this.setState({ end_date });
  };

  public onDestinationSelectedHandler = (
    args: ChangeEvent<HTMLSelectElement>
  ) => {
    const chosen_destination = JSON.parse(args.target.value);
    this.setState({ chosen_destination });
  };

  public areChosenDatesValid = () => {
    let { start_date, end_date } = this.state;
    if (new Date(start_date) < new Date(end_date)) {
      return true;
    }

    this.errorMessage =
      "The ending date must be greater than the starting date";
    return false;
  };

  private onDescriptionChanged = (args: ChangeEvent<HTMLInputElement>) => {
    const description = args.target.value;
    this.setState({ description });
  };

  private onPriceChanged = (args: ChangeEvent<HTMLInputElement>) => {
    const price = +args.target.value;
    this.setState({ price });
  };

  public addVacation = async () => {
    try {
      let addVacationDetails = new Vacation(
        null,
        this.state.chosen_destination.id,
        this.state.chosen_destination.name,
        this.state.description,
        this.state.start_date.toISOString().split("T")[0],
        this.state.end_date.toISOString().split("T")[0],
        this.state.price,
        this.state.vacation_under_edit.image_file_name
      );

      await axios.post<Vacation>(
        `${config.server_url}/vacations/`,
        addVacationDetails
      );

      this.props.onClose();
    } catch (error) {
      console.log(error);
      this.errorMessage = "Failed to add Vacation, " + error.response?.data;
      this.setState({ is_modal_open: true });
    }
  };

  public editVacation = async () => {
    try {
      let editedVacation = new Vacation(
        this.state.vacation_under_edit.id,
        this.state.chosen_destination.id,
        this.state.chosen_destination.name,
        this.state.description,
        this.state.start_date.toISOString().split("T")[0],
        this.state.end_date.toISOString().split("T")[0],
        this.state.price,
        this.state.vacation_under_edit.image_file_name
      );

      await axios.put<Vacation>(
        `${config.server_url}/vacations/`,
        editedVacation
      );

      this.props.onClose();
    } catch (error) {
      console.log(error);
      this.errorMessage = "Failed to edit Vacation, " + error.response?.data;
      this.setState({ is_modal_open: true });
    }
  };

  public onFormSubmitted = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (this.state.admin_state === "Adding") {
      await this.addVacation();
    }
    if (this.state.admin_state === "Editing") {
      await this.editVacation();
    }
  };

  /**
   * Validates that the text inputs  meet the requirements and setting an error message accordingly
   */
  public areTextInputsValid = () => {
    let { description, price } = this.state;
    let text_length = description.trim().length;

    if (text_length < 4 || text_length > 45) {
      this.errorMessage = "Description must contain between 4 - 45 letters";
      return false;
    }
    if (isNaN(price) || price < 100) {
      this.errorMessage = "Price must be 100$ or greater";
      return false;
    }

    return true;
  };

  public isVacationImageValid() {
    if (this.state.vacation_under_edit?.image_file_name) {
      return true;
    }

    this.errorMessage = "Please Select Image";
    return false;
  }

  public isFormValid = () => {
    if (
      this.areChosenDatesValid() &&
      this.areTextInputsValid() &&
      this.isVacationImageValid()
    ) {
      return true;
    }

    return false;
  };

  componentWillUnmount() {
    this.unsubscribeStore();
  }

  public onModalClosed() {
    this.setState({ is_modal_open: false });
    this.errorMessage = "";
  }

  public uploadImage = async (image: File) => {
    try {
      const myFormData = new FormData();
      myFormData.append("image", image, image.name);

      const response = await axios.post<Vacation>(
        `${config.server_url}/vacations/upload_image_file/`,
        myFormData
      );

      let uuidFileName = response.data;

      return uuidFileName;
    } catch (error) {
      console.log(error);
      this.errorMessage = "Failed to upload image, " + error.response.data;
      this.setState({ is_modal_open: true });
    }
  };

  private setImage = async (args: ChangeEvent<HTMLInputElement>) => {
    // Extracting the selected file date (textual info)
    const image = args.target.files[0];

    let uuidFileName = await this.uploadImage(image);
    if (uuidFileName) {
      // Cloning vacation
      const vacation_under_edit = { ...this.state.vacation_under_edit };

      // Adding the image to the cloned vacation object
      vacation_under_edit.image_file = image;
      vacation_under_edit.image_file_name = "" + uuidFileName;

      // Updating the state
      this.setState({ vacation_under_edit });

      // Display image on client:
      var reader = new FileReader();

      // Initializing the "onload" event of the reader object
      // Meaning : AFTER the picture is selected, the preview field
      // will be refreshed, and will display the picture
      reader.onload = (event) =>
        this.setState({ preview: event.target.result.toString() });

      // Read the file data (image binary), into the image field
      reader.readAsDataURL(image);
    }
  };

  public render() {
    return (
      <div className="vacation-form">
        <form
          className="vacation-form"
          onSubmit={(event) => {
            this.onFormSubmitted(event);
          }}
        >
          <div>
            <SelectComponent
              name="groupsSelectBox"
              placeholder="-- Select Destination --"
              options={this.state.destinations}
              selected={this.state.chosen_destination}
              onOptionSelected={(event: any) => {
                this.onDestinationSelectedHandler(event);
              }}
            />

            {this.state.chosen_destination?.id && (
              <div>
                <input
                  className="uploadInput"
                  type="file"
                  onChange={this.setImage}
                  accept="image/*"
                  ref={(fi) => (this.fileInput = fi)}
                />
                <button
                  type="button"
                  className="uploadButton"
                  onClick={() => this.fileInput.click()}
                >
                  Select Vacation Image
                </button>
                <br />
                <br />

                <img
                  src={
                    this.state.vacation_under_edit?.image_file_name
                      ? `${config.server_url}/uploads/${this.state.vacation_under_edit.image_file_name}`
                      : this.state.preview
                  }
                  alt="Vacation Destination"
                />
                <br />
                <br />

                <span className="formSpan">Description:</span>
                <input
                  type="text"
                  placeholder="* Enter Description..."
                  name="description"
                  value={this.state.description}
                  onChange={this.onDescriptionChanged}
                />

                <span className="formSpan">Start Date:</span>
                <DatePicker
                  selected={this.state.start_date}
                  onChange={(date) => {
                    this.onStartDateSelected(date);
                  }}
                  selectsStart
                  startDate={this.state.start_date}
                  minDate={this.min_date}
                  endDate={this.state.end_date}
                />

                <span className="formSpan">End Date:</span>
                <DatePicker
                  selected={this.state.end_date}
                  onChange={(date) => {
                    this.onEndDateSelected(date);
                  }}
                  selectsEnd
                  startDate={this.state.start_date}
                  minDate={this.min_date}
                  endDate={this.state.end_date}
                />

                <span className="formSpan">Total Price:</span>
                <input
                  type="number"
                  placeholder="* Enter Price"
                  name="price"
                  value={this.state.price || ""}
                  onChange={this.onPriceChanged}
                />

                {!this.isFormValid() && (
                  <div className="alertMessage">
                    <span>{this.errorMessage}</span>
                  </div>
                )}

                {this.isFormValid() && (
                  <div className="center">
                    <input type="submit" className="submitButton" />
                  </div>
                )}
              </div>
            )}
          </div>
        </form>

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
