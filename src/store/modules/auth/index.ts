import { defineStore } from 'pinia';
import {
  REFRESH_TOKEN_KEY,
  ROLES_KEY,
  TOKEN_KEY,
  USER_INFO_KEY,
} from '@/enums';
import { getAuthCache, setAuthCache } from '@/utils/auth';
import { store } from '@/store';
import { LoginModel, UserInfoModel } from '@/api/auth/model/userModel';
import { fetchLogin, fetchUserInfo } from '@/api/auth/user';
import { isArray } from '@/utils/common';
import { useGo } from '@/hooks/web/usePage';
import { useI18n } from '@/hooks/web/useI18n';
import { Notification } from '@arco-design/web-vue';
import { useRouteStoreWithOut } from '@/store/modules/route';
import { router } from '@/router';
import { unref } from 'vue';

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
  user: '',
  userId: '',
  userName: '',
  avatar: '',
  userRole: [],
  homeName: 'dashboard',
};

const { goLogin } = useGo(false);

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
    isStaticSuper(state) {
      const { VITE_AUTH_ROUTE_MODE, VITE_STATIC_SUPER_ROLE } = import.meta.env;
      return (
        VITE_AUTH_ROUTE_MODE === 'static' &&
        state.roleList.includes(VITE_STATIC_SUPER_ROLE ?? 'Super')
      );
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
    resetStore(isGoLogin = true) {
      setAuthCache(TOKEN_KEY, '');
      setAuthCache(REFRESH_TOKEN_KEY, '');
      setAuthCache(USER_INFO_KEY, {});
      setAuthCache(ROLES_KEY, []);
      this.$reset();

      console.log(unref(router.currentRoute));

      if (isGoLogin || !unref(router.currentRoute).meta.constant) {
        goLogin();
      }
      const routeStore = useRouteStoreWithOut();
      routeStore.resetStore();
    },
    setLoginLoading(loading: boolean) {
      this.loginLoading = loading;
    },
    async loginByToken(backendToken: LoginModel) {
      // 先把token存储到缓存中(后面接口的请求头需要token)
      this.setToken(backendToken);

      // 获取用户信息
      const resp = await fetchUserInfo();
      const { userRole } = resp;
      if (isArray(userRole)) {
        const roleList = userRole.map((item) => item) as string[];
        this.setRoleList(roleList);
      } else {
        resp.userRole = [];
        this.setRoleList([]);
      }

      // 成功后把用户信息存储到缓存中
      this.setUserInfo(resp);

      return resp;
    },
    async login(username: string, password: string) {
      this.setLoginLoading(true);
      // Simulate login request - [模拟登录请求]
      const resp = await fetchLogin({
        username,
        password,
      });

      if (!resp) {
        this.setLoginLoading(false);
        this.resetStore();
        return;
      }

      const userInfo = await this.loginByToken(resp);

      if (userInfo) {
        // 登录成功后重定向到登录后的地址
        const routeStore = useRouteStoreWithOut();
        await routeStore.initAuthRoute();

        const { toRedirect } = useGo(false);

        await toRedirect();

        // 登录成功弹出欢迎提示
        if (routeStore.isInitAuthRoute) {
          const { t } = useI18n();
          Notification.success({
            title: t('sys.login.common.loginSuccess'),
            content: t(`sys.login.common.welcomeBack`, {
              userName: this.getUserInfo.userName,
            }),
            duration: 3000,
          });
        }
      }
    },
    async logout() {
      // 退出登录
      this.resetStore();
    },
  },

  // persist: {
  //   key: PINIA_CACHE.PINIA_AUTH_STORE,
  //   storage: localStorage,
  //   debug: true,
  // },
});

// // Need to be used outside the setup - [需要在设置之外使用]
export function useAuthStoreWithOut() {
  return useAuthStore(store);
}
