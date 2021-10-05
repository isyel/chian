import { BaseModel } from './BaseModel';
import { DeliveryAgentModel } from './DeliveryAgentModel';
import { OptionsModel } from './OptionsModel';
import { VendorModel } from './VendorModel';

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
  vendor: VendorModel;
  deliveryAgent: DeliveryAgentModel;
  deliveryStatus?: string;
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
