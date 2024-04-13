import { localStg } from '@/utils/cache';
import { MULTIPLE_TABS_KEY } from '@/enums';
import { RouteLocationNormalized } from 'vue-router';
import { App } from '~/types/app';

/** 清空多页签数据 */
export function clearTabRoutes() {
  localStg.set(MULTIPLE_TABS_KEY, []);
}

/**
 * 判断路由是否有fullPath属性
 * @param route 路由
 */
function hasFullPath(route: RouteLocationNormalized) {
  return Boolean(route.fullPath);
}

/**
 *  根据vue路由获取tab路由
 * @param route
 */
export function getTabRouteByVueRoute(route: RouteLocationNormalized) {
  const fullPath = hasFullPath(route) ? route.fullPath : route.path;
  const tabRoute: App.Tab = {
    name: route.name,
    fullPath,
    meta: route.meta,
    params: route.params,
    query: route.query,
    scrollPosition: {
      left: 0,
      top: 0,
    },
  };
  return tabRoute;
}
