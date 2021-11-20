import { UserModel } from './UserModel';

export type DeliveryAgentModel = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  noOfFulfilledDeliveries: number;
  noOfDeliveries: number;
  orders: any;
  transactions: any;
  vehicle: string;
  location: string;
} & UserModel;
