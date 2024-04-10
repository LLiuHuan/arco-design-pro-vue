import type { Router } from 'vue-router';
import { createPermissionGuard } from './permissionGuard';
import { createProgressGuard } from './progressGuard';
import { createScrollGuard } from './scrollGuard';
import { createTitleGuard } from './titleGuard';
import { createHttpGuard } from './httpGuard';
import { createPageGuard } from './pageGuard';
import { createPageLoadingGuard } from './pageLoadingGuard';
import { createStateGuard } from './stateGuard';

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
  createStateGuard(router);
}
