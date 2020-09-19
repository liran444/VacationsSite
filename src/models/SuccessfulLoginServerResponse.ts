export class SuccessfulLoginServerResponse {
  public constructor(
    public user_type?: string,
    public token?: string,
    public firstname?: string,
    public lastname?: string
  ) {}
}
