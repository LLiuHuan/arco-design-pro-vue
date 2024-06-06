import type { Router } from 'vue-router';
import { AxiosCanceler } from '@/utils/http/httpCancel';
import { appSetting } from '@/settings/projectSetting';
import { Nullable } from '~/types/global';

/**
 * The interface used to close the current page to complete the request when the route is switched - [切换路由时关闭当前页面完成请求的接口]
 * @param router
 */
export function createHttpGuard(router: Router) {
  const { removeAllHttpPending } = appSetting;
  let axiosCanceler: Nullable<AxiosCanceler>;
  if (removeAllHttpPending) {
    axiosCanceler = new AxiosCanceler();
  }
  router.beforeEach(async () => {
    // Switching the route will delete the previous request - [切换路由会删除之前的请求]
    axiosCanceler?.removeAllPending();
    return true;
  });
}
