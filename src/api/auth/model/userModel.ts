import { BasicFetchResult } from '@/api/model/baseModel';

export interface LoginParams {
  username: string;
  password: string;
  rememberPassword?: boolean;
}

export interface LoginModel {
  token?: string;
  refreshToken?: string;
}

export interface UserInfoModel {
  user: string;
  userId: string;
  userName: string;
  avatar: string;
  userRole: string[];
  homeName: string;
}

export type LoginGetResultModel = BasicFetchResult<LoginModel>;
export type UserInfoGetResultModel = BasicFetchResult<UserInfoModel>;
