import { defHttp } from '@/utils/http';
import { MenuRouteModel, UserRouteModel } from './model/routeModel';

enum Api {
  ConstantRoute = '/getConstantRoutes',
  UserRoutes = '/getUserRoutes',
  IsRouteExist = '/isRouteExist',
}

/**
 * @description 获取静态路由
 * @description get constant routes
 */
export function fetchGetConstantRoutes() {
  return defHttp.get<MenuRouteModel[]>({
    url: Api.ConstantRoute,
  });
}

/**
 * @description 获取用户路由
 * @description get user routes
 */
export function fetchGetUserRoutes() {
  return defHttp.get<UserRouteModel>({
    url: Api.UserRoutes,
  });
}

/**
 * @description 判断路由是否存在
 * @description whether the route is exist
 *
 * @param routeName route name
 */
export function fetchIsRouteExist(routeName: string) {
  return defHttp.post<boolean>({ url: '/isRouteExist', params: { routeName } });
}
