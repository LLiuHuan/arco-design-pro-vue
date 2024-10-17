/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2024-05-13 22:31:00
 * @LastEditTime: 2024-10-16 22:03:22
 * @LastEditors: LLiuHuan
 */
import type { Router } from 'vue-router';
import { setRouteChange } from '@/utils/router';
import { useRouteStore } from '@/store/modules/route';

/**
 * Mark the loaded page so that it will be faster to reopen without reloading.
 * 加载过的页面做个标记，重新打开的时候会更快，不需要重新加载
 */
export function createPageGuard(router: Router) {
  const loadedPageMap = new Map<string, boolean>();
  const routeStore = useRouteStore();

  router.beforeEach(async (to) => {
    // The page has already been loaded, it will be faster to open it again, you don’t need to do loading and other processing
    // 页面已经加载过了，再次打开会更快，不需要进行加载和其他处理
    to.meta.loaded = !!loadedPageMap.get(to.fullPath);
    // Notify routing changes
    // 通知路由更改
    setRouteChange(to);

    return true;
  });

  router.afterEach((to) => {
    routeStore.setActiveFirstLevelMenuKeyByRoute(to);

    loadedPageMap.set(to.fullPath, true);
  });
}
