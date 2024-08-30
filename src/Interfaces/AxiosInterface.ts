export default interface ApiResponse<T = any> {
  status?: "success" | "failed";
  message?: string;
  data?: T;
  token?: string;
  meta?: paginationMeta<T>;
}
export interface ErrorResponse {
  message: string;
  response?: any;
  errors?: any;
}

export interface Response<T = any> {
  message?: string;
  response?: T;
}

export interface paginationMeta <T> {
  currentPage: number;
  from: number;
  lastPage: number;
  links: any;
  path: string;
  perPage: number;
  to: number;
  total: number;
}
