import http from '@/utils/http/axios';

export function getMessageList(params) {
  return http.request({
    url: '/message/list',
    method: 'get',
    params,
  });
}
