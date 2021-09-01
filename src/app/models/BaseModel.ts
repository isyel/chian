export class BaseModel {
  public id?: number;
  public _id?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public softDelete?: boolean;
  public deletedTime?: Date;
}
