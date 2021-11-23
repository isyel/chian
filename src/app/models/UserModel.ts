import { BaseModel } from './BaseModel';
import { EarningsModel } from './EarningsModel';

export type UserModel = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  fullName: string;
  phoneNumber: string;
  noOfOrders: number;
  noOfDeliveries?: number;
  noOfFulfilledDeliveries?: number;
  maintenances: number;
  email: string;
  referralId: string;
  address: string;
  roles: [string];
  avatar?: string;
  location: string;
  latitude?: number;
  longitude?: number;
  earnings: EarningsModel;
  emailVerified: string;
  phoneVerified: string;
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
    roles: [string];
  };
  userId: string;
  name: string;
  email: string;
  phoneNumber: string;
  verificationStatus: boolean;
  userName: string;
  roles: [string];
};
