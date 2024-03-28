import { defineStore } from 'pinia';
import { useRouterPush } from '@/hooks/component';
import { nextTick, unref } from 'vue';
import { router } from '@/router';
import { useMultipleTabStore } from '@/store/modules/multipleTab';
import { useRouteStore } from '@/store/modules/route';
import { fetchLogin, fetchUserInfo } from '@/api/auth/user';
import { localStg } from '@/utils';
import { REFRESH_TOKEN_KEY, TOKEN_KEY, USER_INFO_KEY } from '@/enums';
import { Notification } from '@arco-design/web-vue';
import { useI18n } from '@/hooks/web';
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

    async handleActionAfterLogin(backendToken: ApiAuth.Token) {
      const route = useRouteStore();
      const { toLoginRedirect } = useRouterPush(false);

      const loginSuccess = await this.loginByToken(backendToken);

      if (loginSuccess) {
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
    async loginByToken(backendToken: ApiAuth.Token) {
      let successFlag = false;

      // 先把token存储到缓存中(后面接口的请求头需要token)
      const { token, refreshToken } = backendToken;
      localStg.set(TOKEN_KEY, token);
      localStg.set(REFRESH_TOKEN_KEY, refreshToken);

      // 获取用户信息
      const resp = await fetchUserInfo();
      if (resp) {
        // 成功后把用户信息存储到缓存中
        localStg.set(USER_INFO_KEY, resp);

        // 更新状态
        this.userInfo = resp;
        this.token = token;

        successFlag = true;
      }

      return successFlag;
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
        await this.handleActionAfterLogin(resp);
        // console.log(resp);
      }

      this.loginLoading = false;
    },
  },
});
