import http from '@/utils/http/axios';

export function getUserInfo(params) {
  return http.request({
    url: '/user/userInfo',
    method: 'get',
    params,
  });
}
