import { defineStore } from 'pinia';
import { REFRESH_TOKEN_KEY, StoreEnum, TOKEN_KEY } from '@/enums';
import { LoginModel, UserInfoModel } from '@/api/auth/model/userModel';
import { computed, reactive, Ref, ref } from 'vue';
import { useGo } from '@/hooks/web/usePage';
import { useLoading } from '@adp/hooks';
// eslint-disable-next-line import/no-cycle
// eslint-disable-next-line import/no-cycle
import { fetchLogin, fetchUserInfo } from '@/api/auth/user';
import { localStg } from '@/utils/cache';
import { useRoute } from 'vue-router';
import { useRouteStore } from '../route';
import { useMultipleTabStore } from '../multipleTab';

export const useAuthStore = defineStore(StoreEnum.Auth, () => {
  const route = useRoute();
  const routeStore = useRouteStore();
  const tabStore = useMultipleTabStore();

  const { loading: loginLoading, startLoading, endLoading } = useLoading();

  const token: Ref<string> = ref(localStg.get(TOKEN_KEY) || '');

  const userInfo: UserInfoModel = reactive({
    user: '',
    userId: '',
    userName: '',
    avatar: '',
    userRole: [],
    homeName: '',
  });

  /**
   * @description 是否是超级管理员
   * @description Whether it is a super administrator
   */
  const isStaticSuper = computed(() => {
    const { VITE_AUTH_ROUTE_MODE, VITE_STATIC_SUPER_ROLE } = import.meta.env;

    return (
      VITE_AUTH_ROUTE_MODE === 'static' &&
      userInfo.userRole.includes(VITE_STATIC_SUPER_ROLE)
    );
  });

  /**
   * @description 用户是否登录
   * @description Whether the user is logged in
   */
  const isLogin = computed(() => Boolean(token.value));

  /**
   * @description 重置store
   * @description Reset store
   *
   * @param isGoLogin
   */
  function resetStore() {
    const authStore = useAuthStore();

    localStg.remove(TOKEN_KEY);
    localStg.remove(REFRESH_TOKEN_KEY);

    authStore.$reset();

    if (!route.meta.constant) {
      const { goLogin } = useGo(false);
      goLogin();
    }
    tabStore.setCacheTabs();
    routeStore.resetStore();
  }

  async function getUserInfoByToken() {
    // 获取用户信息
    const resp = await fetchUserInfo();

    // 成功后把用户信息存储到缓存中
    if (resp) {
      Object.assign(userInfo, resp);

      return true;
    }

    return false;
  }

  /**
   * @description 登录
   * @description login
   *
   * @param backendToken
   */
  async function loginByToken(backendToken: LoginModel) {
    // 先把token存储到缓存中(后面接口的请求头需要token)
    localStg.set(TOKEN_KEY, backendToken.token ?? '');
    localStg.set(REFRESH_TOKEN_KEY, backendToken?.refreshToken ?? '');

    // 获取用户信息
    const pass = await getUserInfoByToken();

    if (pass) {
      token.value = backendToken.token;

      return true;
    }
    return false;
  }

  async function login(username: string, password: string) {
    startLoading();

    try {
      const resp = await fetchLogin({ username, password });

      if (!resp) {
        endLoading();
        resetStore();
        return;
      }

      const pass = await loginByToken(resp);

      if (pass) {
        // 登录成功后重定向到登录后的地址
        await routeStore.initAuthRoute();

        const { toRedirect } = useGo(false);

        await toRedirect();
      }
    } finally {
      endLoading();
    }
  }

  async function logout() {
    resetStore();
  }

  async function initUserInfo() {
    const hasToken = localStg.get(TOKEN_KEY);

    if (hasToken) {
      const resp = await getUserInfoByToken();

      if (!resp) {
        resetStore();
      }
    }
  }

  return {
    token,
    userInfo,

    isStaticSuper,
    isLogin,

    loginLoading,
    initUserInfo,

    login,
    logout,
    resetStore,
  };

  // persist: {
  //   key: PINIA_CACHE.PINIA_AUTH_STORE,
  //   storage: localStorage,
  //   debug: true,
  // },
});
