import { BaseModel } from './BaseModel';

export type EarningsModel = {
  balance: number;
  totalEarnings: number;
  totalFines: number;
  totalWithdrawal: number;
} & BaseModel;
