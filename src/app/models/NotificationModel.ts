import { BaseModel } from './BaseModel';

export type NotificationModel = {
  type: string;
  message: string;
} & BaseModel;
