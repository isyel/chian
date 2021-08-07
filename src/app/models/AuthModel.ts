import { BaseModel } from './BaseModel';

export type RegisterModel = {
  fullName: string;
  phoneNumber: number;
  password: string;
  email: string;
  referralId?: string;
} & BaseModel;

export type LoginModel = {
  password: string;
  'email/phone': string;
};

export type ReissueTokenModel = {
  token: string;
  refreshToken: string;
};
