import type { RouteLocationNormalizedLoaded, RouteRecordNormalized } from 'vue-router';
import { EnumStorageKey } from '@/enums';
import { storage } from '@/utils/storage/storage';

/**
 *  根据vue路由获取tab路由
 * @param route
 */
export function getTabRouteByVueRoute(
  route: RouteRecordNormalized | RouteLocationNormalizedLoaded
) {
  const fullPath = hasFullPath(route) ? route.fullPath : route.path;
  const tabRoute: GlobalTabRoute = {
    name: route.name,
    fullPath,
    meta: route.meta,
    scrollPosition: {
      left: 0,
      top: 0,
    },
  };
  return tabRoute;
}

/**
 * 获取该页签在多页签数据中的索引
 * @param tabs - 多页签数据
 * @param path - 该页签的路径
 */
export function getIndexInTabRoutes(tabs: GlobalTabRoute[], path: string) {
  return tabs.findIndex((tab) => tab.fullPath === path);
}

/**
 * 判断该页签是否在多页签数据中
 * @param tabs - 多页签数据
 * @param path - 该页签的路径
 */
export function isInTabRoutes(tabs: GlobalTabRoute[], path: string) {
  return getIndexInTabRoutes(tabs, path) > -1;
}

/**
 * 根据路由名称获取该页签在多页签数据中的索引
 * @param tabs - 多页签数据
 * @param routeName - 路由名称
 */
export function getIndexInTabRoutesByRouteName(tabs: GlobalTabRoute[], routeName: string) {
  return tabs.findIndex((tab) => tab.name === routeName);
}

/**
 * 判断路由是否有fullPath属性
 * @param route 路由
 */
function hasFullPath(
  route: RouteRecordNormalized | RouteLocationNormalizedLoaded
): route is RouteLocationNormalizedLoaded {
  return Boolean((route as RouteLocationNormalizedLoaded).fullPath);
}

/** 缓存多页签数据 */
export function setTabRoutes(data: GlobalTabRoute[]) {
  storage.set(EnumStorageKey['multi-tab-routes'], data);
}

/** 获取缓存的多页签数据 */
export function getTabRoutes() {
  const routes: GlobalTabRoute[] = [];
  const data = storage.get<GlobalTabRoute[]>(EnumStorageKey['multi-tab-routes']);
  if (data) {
    const defaultTabRoutes = data.map((item: GlobalTabRoute) => ({
      ...item,
      scrollPosition: {
        left: 0,
        top: 0,
      },
    }));
    routes.push(...defaultTabRoutes);
  }
  return routes;
}

/** 清空多页签数据 */
export function clearTabRoutes() {
  setTabRoutes([]);
}
