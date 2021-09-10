import { BaseModel } from './BaseModel';

export type RegisterModel = {
  fullName: string;
  phoneNumber: number;
  password: string;
  email: string;
  referralId?: string;
  userType: string;
} & BaseModel;

export type LoginModel = {
  password: string;
  'email/phone': string;
  userType: string;
};

export type ForgotPasswordModel = {
  email: string;
};

export type PasswordUpdateModel = {
  email: string;
  token: string;
  password: string;
};

export type ReissueTokenModel = {
  token: string;
  refreshToken: string;
};
