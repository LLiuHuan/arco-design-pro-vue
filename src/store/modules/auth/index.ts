import { defineStore } from 'pinia';
import { useRouterPush } from '@/hooks/component';
import { nextTick, unref } from 'vue';
import { router } from '@/router';
import { useMultipleTabStore } from '@/store/modules/multipleTab';
import { useRouteStore } from '@/store/modules/route';
import { fetchLogin, fetchUserInfo } from '@/api/auth/user';
import { localStg } from '@/utils/cache';
import {
  REFRESH_TOKEN_KEY,
  ROLES_KEY,
  TOKEN_KEY,
  USER_INFO_KEY,
} from '@/enums';
import { Notification } from '@arco-design/web-vue';
import { useI18n } from '@/hooks/web';
import { getAuthCache, setAuthCache } from '@/utils/auth';
import { isArray } from '@/utils/common';
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
  },
  actions: {
    /**
     * @description Set token - [设置token]
     * @param token
     */
    setToken(token: string) {
      this.token = token;
      setAuthCache(TOKEN_KEY, token);
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
    resetAuthStore(goLogin: boolean = true) {
      const { toLogin } = useRouterPush(false);
      const { resetTabStore } = useMultipleTabStore();
      const { resetRouteStore } = useRouteStore();
      const route = unref(router.currentRoute);

      setAuthCache(TOKEN_KEY, '');
      setAuthCache(REFRESH_TOKEN_KEY, '');
      setAuthCache(USER_INFO_KEY, {});
      setAuthCache(ROLES_KEY, []);
      this.$reset();

      if (route.meta.requiresAuth || goLogin) {
        toLogin();
      }

      nextTick(() => {
        resetTabStore();
        resetRouteStore();
      });
    },
    /**
     * @description Handle action after login - [登录后处理动作]
     * @param backendToken
     */
    async handleActionAfterLogin(backendToken: LoginModel) {
      if (!backendToken) return;
      const userInfo = await this.loginByToken(backendToken);
      if (userInfo) {
        const route = useRouteStore();
        const { toLoginRedirect } = useRouterPush(false);

        await route.initAuthRoute();
        // 跳转登录后的地址
        toLoginRedirect();
        // 登录成功弹出欢迎提示
        if (route.isInitAuthRoute) {
          const { t } = useI18n();
          Notification.success({
            title: t('sys.login.common.loginSuccess'),
            content: t(`sys.login.common.welcomeBack`, {
              userName: this.userInfo.userName,
            }),
            duration: 3000,
          });
        }

        return;
      }

      // 不成功则重置状态
      this.resetAuthStore();
    },
    /**
     * @description Login by token - [通过token登录（根据token获取用户信息）]
     * @param backendToken
     */
    async loginByToken(backendToken: LoginModel) {
      // 先把token存储到缓存中(后面接口的请求头需要token)
      const { token, refreshToken } = backendToken;
      this.setToken(token);

      // TODO:
      localStg.set(REFRESH_TOKEN_KEY, refreshToken);

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
    /**
     * @description Login after successful or failed logic - [处理登录后成功或失败的逻辑]
     * @param username
     * @param password
     */
    async login(username: string, password: string) {
      this.loginLoading = true;

      // Simulate login request - [模拟登录请求]
      const resp = await fetchLogin({
        username,
        password,
      });
      if (resp) {
        await this.handleActionAfterLogin(resp);
        // console.log(resp);
      }

      this.loginLoading = false;
    },
    async logout(goLogin: boolean) {
      // TODO: 可以增加一个接口，告诉后端退出登录
      // if (getToken()) {
      //   try {
      //     // await fetchLogout();
      //   } catch (error) {
      //     console.error('退出登录失败', error);
      //   }
      // }
      // 退出登录后重置状态
      this.resetAuthStore(goLogin);
    },
  },

  persist: {
    key: 'pinia-auth-store',
    storage: localStorage,
    debug: true,
  },
});

// // Need to be used outside the setup - [需要在设置之外使用]
export function useAuthStoreWithOut() {
  return useAuthStore(store);
}
