export type PaginationModel = {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  indexFrom: number;
  data: any[];
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};
