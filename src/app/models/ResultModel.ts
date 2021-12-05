import { PaginationModel } from './PaginationModel';
import { UserModel } from './UserModel';

export type ResultModel = {
  status: boolean;
  data: PaginationModel | UserModel | any;
  order?: PaginationModel | any;
  message?: string;
};
