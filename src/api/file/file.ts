import http from '@/utils/http/axios';
import { PageInfo } from '@/api/types/common/types';

export const getFileList = (data: PageInfo) => {
  return http.request({
    url: '/v1/file/getFileList',
    method: 'post',
    data: data,
  });
};
