import { BaseModel } from './BaseModel';

export type AddressModel = {
  userId?: string;
  street: string;
  city: string;
  state: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
} & BaseModel;
