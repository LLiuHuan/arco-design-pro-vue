import { EnumStorageKey } from '@/enums';
import { storage } from '@/utils/storage/storage';

/** 设置token */
export function setToken(token: string) {
  storage.set(EnumStorageKey.token, token);
}

/** 获取token */
export function getToken() {
  return storage.get<string>(EnumStorageKey.token) || '';
}

/** 去除token */
export function removeToken() {
  storage.remove(EnumStorageKey.token);
}

/** 获取refresh token */
export function getRefreshToken() {
  return storage.get<string>(EnumStorageKey['refresh-token']) || '';
}

/** 设置refresh token */
export function setRefreshToken(token: string) {
  storage.set(EnumStorageKey['refresh-token'], token);
}

/** 去除refresh token */
export function removeRefreshToken() {
  storage.remove(EnumStorageKey['refresh-token']);
}

/** 获取用户信息 */
export function getUserInfo() {
  const emptyInfo: Auth.UserInfo = {
    userId: '',
    userName: '',
    userRole: 'user',
  };
  const userInfo: Auth.UserInfo =
    storage.get<Auth.UserInfo>(EnumStorageKey['user-info']) || emptyInfo;
  return userInfo;
}

/** 设置用户信息 */
export function setUserInfo(userInfo: Auth.UserInfo) {
  storage.set(EnumStorageKey['user-info'], userInfo);
}

/** 去除用户信息 */
export function removeUserInfo() {
  storage.remove(EnumStorageKey['user-info']);
}

/** 去除用户相关缓存 */
export function clearAuthStorage() {
  removeToken();
  removeRefreshToken();
  removeUserInfo();
}
