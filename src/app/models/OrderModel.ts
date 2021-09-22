import { BaseModel } from './BaseModel';
import { OptionsModel } from './OptionsModel';

export type OrderModel = {
  userId: string;
  orderItems: [{ options: OptionsModel; quantity: number }];
  deliveryAddress: {
    city: string;
    state: string;
    street: string;
    latitude?: number;
    longitude?: number;
  };
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

export type OrderModelPayload = {
  userId: string;
  orderItems: [{ options: OptionsModel; quantity: number }];
  latitude?: number;
  longitude?: number;
  city: string;
  state: string;
  street?: string;
  postalCode?: string;
  deliveryPrice: number;
  paymentMethod?: string;
  paymentStatus?: string;
};
