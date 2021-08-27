import { BaseModel } from './BaseModel';

export type UserModel = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  fullName: string;
  phoneNumber: string;
  refills: number;
  maintenances: number;
  email: string;
  referralId: string;
  address: string;
} & BaseModel;

export type AuthDataModel = {
  userId: string;
  useId: string;
  name: string;
  email: string;
  phoneNumber: string;
  verificationStatus: boolean;
};
