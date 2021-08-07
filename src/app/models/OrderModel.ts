import { BaseModel } from './BaseModel';
import { OptionsModel } from './OptionsModel';

export type OrderModel = {
  userId: string;
  options: OptionsModel[];
  deliveryAddress: [];
  deliveryPrice: number;
  totalPrice: number;
} & BaseModel;
