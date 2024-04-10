import { useAuthStoreWithOut } from '@/store/modules/auth';
import { fetchLogin, fetchUserInfo } from '@/api/auth/user';
import { LoginModel } from '@/api/auth/model/userModel';
import { isArray } from '@/utils/common';
import { useRouteStoreWithOut } from '@/store/modules/route';
import { useI18n } from '@/hooks/web/useI18n';
import { Notification } from '@arco-design/web-vue';
import { unref } from 'vue';
import { router } from '@/router';
import { useGo } from '@/hooks/web/usePage';
import { useRoute } from '@/hooks/web/useRoute';

export const useAuth = () => {
  const authStore = useAuthStoreWithOut();
  const routeStore = useRouteStoreWithOut();

  const resetAuthStore = (goLogin: boolean = true) => {
    authStore.resetAuthStore();
    routeStore.resetRouteStore();
    const route = unref(router.currentRoute);
    if (route.meta?.ignoreAuth || goLogin) {
      // Redirect to login page - [重定向到登录页]
      // router.push({ name: 'login' });
    }
  };
  const loginByToken = async (backendToken: LoginModel) => {
    // 先把token存储到缓存中(后面接口的请求头需要token)
    authStore.setToken(backendToken);

    // 获取用户信息
    const resp = await fetchUserInfo();
    const { userRole } = resp;
    if (isArray(userRole)) {
      const roleList = userRole.map((item) => item) as string[];
      authStore.setRoleList(roleList);
    } else {
      resp.userRole = [];
      authStore.setRoleList([]);
    }

    // 成功后把用户信息存储到缓存中
    authStore.setUserInfo(resp);

    return resp;
  };

  /**
   * @description Handle action after login - [登录后处理动作]
   * @param backendToken - [后端返回的token]
   */
  const handleActionAfterLogin = async (backendToken: LoginModel) => {
    if (!backendToken) return;

    const userInfo = await loginByToken(backendToken);

    if (userInfo) {
      // 登录成功后重定向到登录后的地址
      const { initAuthRoute } = useRoute();
      await initAuthRoute();

      const { toRedirect } = useGo(router);

      toRedirect();

      // 登录成功弹出欢迎提示
      if (routeStore.isInitAuthRoute) {
        const { t } = useI18n();
        Notification.success({
          title: t('sys.login.common.loginSuccess'),
          content: t(`sys.login.common.welcomeBack`, {
            userName: authStore.getUserInfo.userName,
          }),
          duration: 3000,
        });
      }

      return;
    }

    resetAuthStore();
  };

  /**
   * @description Login after successful or failed logic - [处理登录后成功或失败的逻辑]
   * @param username
   * @param password
   */
  const login = async (username: string, password: string) => {
    const { setLoginLoading } = authStore;
    setLoginLoading(true);
    // Simulate login request - [模拟登录请求]
    const resp = await fetchLogin({
      username,
      password,
    });

    if (resp) {
      await handleActionAfterLogin(resp);
    }

    setLoginLoading(false);
  };

  const logout = async () => {
    // TODO: 可以增加一个接口，告诉后端退出登录
    // if (getToken()) {
    //   try {
    //     // await fetchLogout();
    //   } catch (error) {
    //     console.error('退出登录失败', error);
    //   }
    // }
    // 退出登录后重置状态
    resetAuthStore();
  };

  return {
    resetAuthStore,
    handleActionAfterLogin,
    loginByToken,
    login,
    logout,
  };
};
