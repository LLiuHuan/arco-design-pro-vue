import { defineStore } from 'pinia';
import { useRouterPush } from '@/hooks/component';
import { nextTick, unref } from 'vue';
import { router } from '@/router';
import { useMultipleTabStore } from '@/store/modules/multipleTab';
import { useRouteStore } from '@/store/modules/route';
import { fetchLogin } from '@/api/auth/user';
import { clearAuthStorage, getToken, getUserInfo } from './helpers';

interface AuthState {
  /**
   * User information - [用户信息]
   */
  userInfo: Auth.UserInfo;
  /**
   * User token - [用户token]
   */
  token: string;
  /**
   * Login loading status - [登录加载状态]
   */
  loginLoading: boolean;
}

export const useAuthStore = defineStore({
  id: 'store-auth',
  state: (): AuthState => ({
    userInfo: getUserInfo(),
    token: getToken(),
    loginLoading: false,
  }),
  getters: {
    /**
     * @description Whether logged in - [是否登录]
     * @param state
     */
    isLogin(state) {
      return Boolean(state.token);
    },
  },
  actions: {
    /**
     * @description Reset auth status - [重置auth状态]
     */
    resetAuthStore() {
      const { toLogin } = useRouterPush(false);
      const { resetTabStore } = useMultipleTabStore();
      const { resetRouteStore } = useRouteStore();
      const route = unref(router.currentRoute);

      clearAuthStorage();
      this.$reset();

      if (route.meta.requiresAuth) {
        toLogin();
      }

      nextTick(() => {
        resetTabStore();
        resetRouteStore();
      });
    },
    /**
     * @description Login after successful or failed logic - [处理登录后成功或失败的逻辑]
     * @param userName
     * @param password
     */
    async login(userName: string, password: string) {
      this.loginLoading = true;

      // Simulate login request - [模拟登录请求]
      const resp = await fetchLogin(userName, password);
      if (resp) {
        // await this.handleActionAfterLogin(data);
        console.log(resp);
      }

      this.loginLoading = false;
    },
  },
});
