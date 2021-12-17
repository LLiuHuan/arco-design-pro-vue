import http from '@/utils/http/axios';
import { PageInfo } from '@/api/types/common/types';

export const getAuthorityList = (data: PageInfo) => {
  return http.request({
    url: '/v1/authority/getAuthorityList',
    method: 'get',
    params: data,
  });
};
