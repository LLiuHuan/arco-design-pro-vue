import { localStg } from '@/utils';
import { REFRESH_TOKEN_KEY, TOKEN_KEY, USER_INFO_KEY } from '@/enums';

/** 获取用户信息 */
export function getUserInfo() {
  const emptyInfo: Auth.UserInfo = {
    userId: '',
    userName: '',
    userRole: 'user',
  };
  return localStg.get(USER_INFO_KEY) || emptyInfo;
}

/** 获取token */
export function getToken() {
  return localStg.get(TOKEN_KEY) || '';
}

/** 去除用户相关缓存 */
export function clearAuthStorage() {
  localStg.remove(TOKEN_KEY);
  localStg.remove(REFRESH_TOKEN_KEY);
  localStg.remove(USER_INFO_KEY);
}
