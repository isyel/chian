export type RegisterModel = {
  fullName: string;
  phoneNumber: number;
  password: string;
  email: string;
  referralId?: string;
};

export type LoginModel = {
  password: string;
  'email/phone': string;
};

export type ReissueTokenModel = {
  token: string;
  refreshToken: string;
};
