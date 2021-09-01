import { BaseModel } from './BaseModel';
import { OptionsModel } from './OptionsModel';

export type OrderModel = {
  userId: string;
  orderItems: [{ options: OptionsModel; quantity: number }];
  deliveryAddress: { city: string; state: string; address: string };
  latitude: number;
  longitude: number;
  city: string;
  state: string;
  postalCode: string;
  deliveryPrice: number;
  paymentMethod?: string;
  paymentStatus?: string;
  paymentType?: string;
  totalPrice: number;
  orderStatus: string;
} & BaseModel;
