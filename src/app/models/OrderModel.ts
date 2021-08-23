import { BaseModel } from './BaseModel';
import { OptionsModel } from './OptionsModel';

export type OrderModel = {
  userId: string;
  orderItems: [{ options: OptionsModel; quantity: number }];
  street: string;
  city: string;
  state: string;
  deliveryPrice: number;
  paymentMethod?: string;
  paymentStatus?: string;
  coordinates?: any;
} & BaseModel;
