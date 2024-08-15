/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2024-05-13 22:31:00
 * @LastEditTime: 2024-07-18 00:13:03
 * @LastEditors: LLiuHuan
 */
import { BasicFetchResult } from '@/api/model/baseModel';

export interface LoginParams {
  username: string;
  password: string;
  rememberPassword?: boolean;
}

export interface LoginModel {
  token: string;
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
