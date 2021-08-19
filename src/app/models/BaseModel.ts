export class BaseModel {
  public id?: number;
  public _id?: string;
  public createdDate?: Date;
  public updatedDate?: Date;
  public softDelete?: boolean;
  public deletedTime?: Date;
}
