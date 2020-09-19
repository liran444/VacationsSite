export class Vacation {
  public constructor(
    public id?: number,
    public destination_id?: number,
    public destination?: string,
    public description?: string,
    public start_date?: string,
    public end_date?: string,
    public price?: number,
    public image_file_name?: string,
    public image_file?: File,
    public is_following?: boolean
  ) {}
}
