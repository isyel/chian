import { UserModel } from './UserModel';

export type ResultModel = {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  indexFrom: number;
  items: any[];
  allOrders: any[];
  data: UserModel | any;
  order: any[];
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
