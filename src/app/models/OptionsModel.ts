import { BaseModel } from './BaseModel';

export type OptionsModel = {
  size: string;
  price: number;
  name: string;
} & BaseModel;
