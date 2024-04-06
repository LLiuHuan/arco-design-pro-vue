import type { Router } from 'vue-router';
// import { createParamMenuGuard } from '@/router/guard/paramMenuGuard';
import { createPermissionGuard } from './permissionGuard';
import { createProgressGuard } from './progressGuard';
import { createScrollGuard } from './scrollGuard';
import { createTitleGuard } from './titleGuard';
import { createHttpGuard } from './httpGuard';
import { createPageGuard } from './pageGuard';
import { createPageLoadingGuard } from './pageLoadingGuard';

/**
 * 路由守卫函数
 * @param router - 路由实例
 */
export function setupRouterGuard(router: Router) {
  createPageGuard(router);
  createPageLoadingGuard(router);
  createHttpGuard(router);
  createScrollGuard(router);
  createProgressGuard(router);
  createTitleGuard(router);
  createPermissionGuard(router);
  // createParamMenuGuard(router); // 必须在 createPermissionGuard 之后执行（菜单已构建）

  // createStateGuard(router);
}
