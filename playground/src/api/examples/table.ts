/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-07-31 22:39:13
 * @LastEditTime: 2025-07-31 22:42:39
 * @LastEditors: LLiuHuan
 */
import { requestClient } from '../request';

const TABLE_BASE_URL = '/table';

export namespace TableParams {
  export interface PageFetchParams {
    [key: string]: any;
    page: number;
    pageSize: number;
  }
}

const TableAPI = {
  list(params: TableParams.PageFetchParams) {
    return requestClient.get(`${TABLE_BASE_URL}/list`, { params });
  },
};

export default TableAPI;
