import http from '@/utils/http/axios';

export const getFileList = (data) => {
  return http.request({
    url: '/v1/file/getFileList',
    method: 'post',
    data: data,
  });
};
