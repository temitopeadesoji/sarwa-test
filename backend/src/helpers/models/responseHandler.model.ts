import { RequestMethod } from './requestMethod.model';

export interface Response {
  success: boolean;
  message: string;
  data: unknown;
}

export interface ResponseLinks {
  href: string;
  rel: string;
  method: RequestMethod;
}

export interface ResponsePagin {
  totalItems: number;
  pageSize: number;
  totalPageSize: number;
  current: number;
  count: number;
  next: number;
  previous: number;
}

export interface ResponsePagination {
  data: unknown;
  paging: ResponsePagin;
  links: ResponseLinks[];
}
