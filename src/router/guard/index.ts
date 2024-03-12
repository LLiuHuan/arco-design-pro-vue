import type { Router } from 'vue-router';
import { unref } from 'vue';
import nProgress from 'nprogress';
import { setRouteChange } from '@/utils';
import { useTransitionSetting } from '@/hooks/setting';

/**
 * 路由守卫函数
 * @param router - 路由实例
 */
export function setupRouterGuard(router: Router) {
  createPageGuard(router);
  createProgressGuard(router);
}

/**
 * Hooks for handling page state - [处理页面状态的钩子]
 */
function createPageGuard(router: Router) {
  //
  const loadedPageMap = new Map<string, boolean>();

  router.beforeEach(async (to) => {
    // 页面已经加载过了，再次打开会更快，不需要进行加载和其他处理
    to.meta.loaded = !!loadedPageMap.get(to.path);
    // 通知路由更改
    setRouteChange(to);

    return true;
  });

  router.afterEach((to) => {
    loadedPageMap.set(to.path, true);
  });
}

// 创建顶部进度条守卫
export function createProgressGuard(router: Router) {
  const { getOpenNProgress } = useTransitionSetting();
  router.beforeEach(async (to) => {
    if (to.meta.loaded) {
      return true;
    }
    unref(getOpenNProgress) && nProgress.start();
    return true;
  });

  router.afterEach(async () => {
    unref(getOpenNProgress) && nProgress.done();
    return true;
  });
}
