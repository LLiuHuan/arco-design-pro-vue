export interface BasicFetchResult<T> {
  code: number;
  data: T;
  message: string;
}
