import { BaseModel } from './BaseModel';

export type OptionsModel = {
  size: number;
  price: number;
  name: string;
} & BaseModel;
