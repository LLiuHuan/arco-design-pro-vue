export interface PageInfo {
  page: number;
  pageSize: number;
}

export interface ResponsePage<T> {
  list: Array<T>;
  total: number;
  page: number;
  pageSize: number;
}

export interface CascaderValueType {
  value: string;
  label: string;
  children?: Array<CascaderValueType>;
}
