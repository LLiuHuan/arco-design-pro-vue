import { toRaw } from 'vue';
import { RouteParams } from 'vue-router';

/**
 * config menu with given params
 */
const menuParamRegex = /(?::)([\s\S]+?)((?=\/)|$)/g;

export function configureDynamicParamsMenu(
  menu: App.Menu,
  params: RouteParams,
) {
  const { routePath, routeParam } = toRaw(menu);
  let realPath = routeParam || routePath;
  const matchArr = realPath.match(menuParamRegex);

  matchArr?.forEach((it) => {
    const realIt = it.substring(1);
    if (params[realIt]) {
      realPath = realPath.replace(`:${realIt}`, params[realIt] as string);
    }
  });
  // save original param path.
  if (!routeParam && matchArr && matchArr.length > 0) {
    menu.routeParam = routePath;
  }
  menu.routePath = realPath as AuthRoute.RoutePath;
  // children
  menu.children?.forEach((item) => configureDynamicParamsMenu(item, params));
}
