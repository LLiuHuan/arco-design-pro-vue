import { defHttp } from '@/utils/http';

export const fetchLogin = (username: string, password: string) => {
  return defHttp.request({
    url: '/login',
    // url: 'https://mock.apifox.com/m1/3402401-0-default/api/v1/login',
    method: 'POST',
    data: { username, password },
  });
};
