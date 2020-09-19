import { Vacation } from "../models/Vacation";
import { SuccessfulLoginServerResponse } from "../models/SuccessfulLoginServerResponse";
import { Destination } from "../models/Destination";

export class AppState {
  public vacations: Vacation[] = [];
  public destinations: Destination[] = [];
  public loggedInUser: SuccessfulLoginServerResponse = {};
  public admin_state: string = "default";
  public vacation_under_edit: Vacation = {};
  public user_state: string = "default";
}
