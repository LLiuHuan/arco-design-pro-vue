import { defHttp } from '@/utils/http';
import { LoginModel, LoginParams, UserInfoModel } from './model/userModel';

enum Api {
  Login = '/login',
  GetUserInfo = '/getUserInfo',
}

export const fetchLogin = (params: LoginParams) => {
  return defHttp.post<LoginModel>({
    url: Api.Login,
    data: params,
  });
};

export const fetchUserInfo = () => {
  return defHttp.get<UserInfoModel>({
    url: Api.GetUserInfo,
  });
};
