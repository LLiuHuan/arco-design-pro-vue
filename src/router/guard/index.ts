import type { Router } from 'vue-router';
import { useTitle } from '@vueuse/core';
import NProgress from 'nprogress';
import { createPermissionGuard } from './permission';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

/**
 * 路由守卫函数
 * @param router - 路由实例
 */
export function createRouterGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    console.log(222222222);

    // 开始 loadingBar
    NProgress.start();
    // 页面跳转权限处理
    console.log(to);
    await createPermissionGuard(to, from, next);
  });
  router.afterEach((to) => {
    // 设置document title
    useTitle(to.meta.title ? (to.meta.title as string) : '');
    // 结束 loadingBar
    NProgress.done();
  });
}
