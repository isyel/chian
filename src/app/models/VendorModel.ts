import { UserModel } from './UserModel';

export type VendorModel = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  totalRefills: number;
  noOfRefills: number;
  businessName: string;
  contactInfo: string;
  officeAddress: string;
} & UserModel;
