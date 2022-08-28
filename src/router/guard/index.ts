import type { Router } from 'vue-router';
import { useTitle } from '@vueuse/core';
import NProgress from 'nprogress';
import { useI18n } from '@/hooks/web/useI18n';
import { createPermissionGuard } from './permission';
import 'nprogress/nprogress.css';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

/**
 * 路由守卫函数
 * @param router - 路由实例
 */
export function createRouterGuard(router: Router) {
  router.beforeEach(async (to, from, next) => {
    // 开始 loadingBar
    NProgress.start();
    // 页面跳转权限处理
    await createPermissionGuard(to, from, next);
  });
  router.afterEach((to) => {
    // 为了解决第一次刷新没办法自动获取到中英文问题
    setTimeout(() => {
      const { t } = useI18n();
      // 设置document title
      useTitle(to.meta.title ? t(to.meta.title as string) : '');
    }, 100);
    // 结束 loadingBar
    NProgress.done();
  });
}
