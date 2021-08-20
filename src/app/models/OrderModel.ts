import { BaseModel } from './BaseModel';

export type OrderModel = {
  userId: string;
  orderItems: any;
  street: string;
  city: string;
  state: string;
  deliveryPrice: number;
  paymentMethod?: string;
  paymentStatus?: string;
} & BaseModel;
