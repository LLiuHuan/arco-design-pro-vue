import { defHttp } from '@/utils/http';

enum Api {
  Login = '/login',
  GetUserInfo = '/getUserInfo',
}

export const fetchLogin = (username: string, password: string) => {
  return defHttp.post<ApiAuth.loginResult>({
    url: Api.Login,
    data: { username, password },
  });
};

export const fetchUserInfo = () => {
  return defHttp.get<ApiAuth.loginByTokenResult>({
    url: Api.GetUserInfo,
  });
};
