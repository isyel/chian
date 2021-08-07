import { BaseModel } from './BaseModel';

export type UserModel = {
  fullName: string;
  phoneNumber: number;
  refills: number;
  maintenances: number;
  email: string;
  referralId: string;
} & BaseModel;
