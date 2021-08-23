export type ResultModel = {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  indexFrom: number;
  items: any[];
  allOrders: any[];
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
