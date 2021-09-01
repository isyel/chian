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
  session: string;
  isAuthenticated: boolean;
  userDetails: {
    userId: string;
    name: string;
    email: string;
    phoneNumber: string;
    verificationStatus: boolean;
    userName: string;
    roles: [];
  };
  userId: string;
  name: string;
  email: string;
  phoneNumber: string;
  verificationStatus: boolean;
  userName: string;
  roles: [];
};
