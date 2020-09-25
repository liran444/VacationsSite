import { AppState } from "./app-state";
import { ActionType } from "./action-type";
import { Action } from "./action";
import axios from "axios";

// This function is NOT called directly by you
export function reduce(oldAppState: AppState, action: Action): AppState {
  // Cloning the oldState (creating a copy)
  const newAppState = { ...oldAppState };

  switch (action.type) {
    case ActionType.ChangeUserState:
      newAppState.user_state = action.payload;
      break;
    case ActionType.GetAllVacations:
      newAppState.vacations = action.payload;
      break;
    case ActionType.DeleteVacation:
      newAppState.vacations = newAppState.vacations.filter((item) => item.id != action.payload);
      break;
    case ActionType.Login:
      newAppState.loggedInUser = action.payload;
      sessionStorage.setItem("user_data", JSON.stringify(action.payload));
      break;
    case ActionType.AddVacation:
      newAppState.vacations.push(action.payload);
      break;
    case ActionType.GetAllDestinations:
      newAppState.destinations = action.payload;
      break;
    case ActionType.ChangeAdminState:
      newAppState.admin_state = action.payload;
      break;
    case ActionType.StoreVacationUnderEdit:
      newAppState.vacation_under_edit = action.payload.vacation;
      newAppState.admin_state = action.payload.admin_state;
      break;
    case ActionType.UpdateStoredVacation:
      newAppState.vacations.find((element) => {

        if (element.id === action.payload.id) {
          element.image_file_name = action.payload.image_file_name;
          element.description = action.payload.description;
          element.destination = action.payload.destination;
          element.destination_id = action.payload.destination_id;
          element.price = action.payload.price;
          element.start_date = action.payload.start_date;
          element.end_date = action.payload.end_date;
          return element;
        }

      });
      break;
    case ActionType.UpdateIsFollowing:
      newAppState.vacations.find((element) => {
        if (element.id === action.payload.id) {
          element.is_following = action.payload.is_following;
        }
        return element;
      });
      break;
    case ActionType.GetUserDataFromSessionStorage:
      newAppState.loggedInUser = JSON.parse(
        sessionStorage.getItem("user_data")
      );

      if (newAppState.loggedInUser) {
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + newAppState.loggedInUser.token;
      }
      break;
  }

  // After returning the new state, it's being published to all subscribers
  // Each component will render itself based on the new state
  return newAppState;
}
