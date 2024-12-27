export interface IPagination {
  total?: number;
  page: number;
  pageSize: number;
  offset?: number;
  docs?: any[];
  data?: any[];
}
