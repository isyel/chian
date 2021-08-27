import { BaseModel } from './BaseModel';

export type UserModel = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Name: string; // to be removed
  fullName: string;
  phoneNumber: string;
  refills: number;
  maintenances: number;
  email: string;
  referralId: string;
} & BaseModel;

export type AuthDataModel = {
  userId: string;
  name: string;
  email: string;
  phoneNumber: string;
  verificationStatus: boolean;
};
