import { defineStore } from 'pinia';
import {
  PINIA_CACHE,
  REFRESH_TOKEN_KEY,
  ROLES_KEY,
  TOKEN_KEY,
  USER_INFO_KEY,
} from '@/enums';
import { getAuthCache, setAuthCache } from '@/utils/auth';
import { store } from '@/store';
import { LoginModel, UserInfoModel } from '@/api/auth/model/userModel';

interface AuthState {
  /**
   * User information - [用户信息]
   */
  userInfo: UserInfoModel;
  /**
   * User token - [用户token]
   */
  token: string;
  /**
   * Login loading status - [登录加载状态]
   */
  loginLoading: boolean;
  /**
   * Role list - [角色列表]
   */
  roleList: string[];

  /**
   * Whether the session has timed out - [会话是否已超时]
   */
  sessionTimeout: boolean;
}

const emptyInfo: UserInfoModel = {
  userId: '',
  userName: '',
  avatar: '',
  userRole: [],
  homeName: 'dashboard',
};

export const useAuthStore = defineStore({
  id: 'store-auth',
  state: (): AuthState => ({
    userInfo: getAuthCache<UserInfoModel>(USER_INFO_KEY) || emptyInfo,
    token: getAuthCache(TOKEN_KEY) || '',
    loginLoading: false,
    roleList: [],
    sessionTimeout: false,
  }),
  getters: {
    /**
     * @description Whether logged in - [是否登录]
     * @param state
     */
    isLogin(state) {
      return Boolean(state.token);
    },
    /**
     * @description Get user information - [获取用户信息]
     * @param state
     */
    getToken(state) {
      return state.token || getAuthCache<string>(TOKEN_KEY);
    },
    /**
     * @description Get role list - [获取角色列表]
     * @param state
     */
    getRoleList(state) {
      return state.roleList.length > 0
        ? state.roleList
        : getAuthCache<string[]>(ROLES_KEY);
    },
    getUserInfo(state) {
      return (
        state.userInfo ||
        getAuthCache<UserInfoModel>(USER_INFO_KEY) ||
        emptyInfo
      );
    },
    getSessionTimeout(state) {
      return state.sessionTimeout;
    },
    getLoginLoading(state) {
      return state.loginLoading;
    },
  },
  actions: {
    /**
     * @description Set token - [设置token]
     * @param {LoginModel} backendToken
     */
    setToken(backendToken: LoginModel) {
      const { token, refreshToken } = backendToken;
      this.token = token ?? '';
      setAuthCache(TOKEN_KEY, token ?? '');
      setAuthCache(REFRESH_TOKEN_KEY, refreshToken ?? '');
    },
    /**
     * @description Set user information - [设置用户信息]
     * @param userInfo
     */
    setUserInfo(userInfo: UserInfoModel) {
      this.userInfo = userInfo;
      setAuthCache(USER_INFO_KEY, userInfo);
    },
    /**
     * @description Set role list - [设置角色列表]
     * @param roleList
     */
    setRoleList(roleList: string[]) {
      this.roleList = roleList;
      setAuthCache(ROLES_KEY, roleList);
    },
    /**
     * @description Set session timeout - [设置会话超时]
     * @param flag
     */
    setSessionTimeout(flag: boolean) {
      this.sessionTimeout = flag;
    },
    /**
     * @description Reset auth status - [重置auth状态]
     */
    resetAuthStore() {
      setAuthCache(TOKEN_KEY, '');
      setAuthCache(REFRESH_TOKEN_KEY, '');
      setAuthCache(USER_INFO_KEY, {});
      setAuthCache(ROLES_KEY, []);
      this.$reset();
    },
    setLoginLoading(loading: boolean) {
      this.loginLoading = loading;
    },
  },

  persist: {
    key: PINIA_CACHE.PINIA_AUTH_STORE,
    storage: localStorage,
    debug: true,
  },
});

// // Need to be used outside the setup - [需要在设置之外使用]
export function useAuthStoreWithOut() {
  return useAuthStore(store);
}
