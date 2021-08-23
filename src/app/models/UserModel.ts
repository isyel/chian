import { BaseModel } from './BaseModel';

export type UserModel = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Name: string; // to be removed
  fullName: string;
  phoneNumber: number;
  refills: number;
  maintenances: number;
  email: string;
  referralId: string;
} & BaseModel;
