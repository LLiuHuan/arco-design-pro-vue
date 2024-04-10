import { iconRender } from '@/utils/common';
import type { App } from '~/types/app';

/** 给菜单添加可选属性 */
function addPartialProps(config: {
  menu: App.Menu;
  icon?: string;
  localIcon?: string;
  children?: App.Menu[];
}) {
  const item = { ...config.menu };

  const { icon, localIcon, children } = config;

  if (localIcon) {
    Object.assign(item, { icon: iconRender({ localIcon }) });
  }

  if (icon) {
    Object.assign(item, {
      icon: iconRender({ icon }),
    });
  }

  if (children) {
    Object.assign(item, { children });
  }
  return item;
}

/** 路由不转换菜单 */
function hideInMenu(route: AuthRoute.Route) {
  return Boolean(route.meta.hide);
}

/**
 * 将权限路由转换成菜单
 * @param routes - 路由
 */
export function transformAuthRouteToMenu(
  routes: AuthRoute.Route[],
): App.Menu[] {
  const globalMenu: App.Menu[] = [];
  routes.forEach((route) => {
    const { name, path, meta } = route;
    let menuChildren: App.Menu[] | undefined;
    if (route.children && route.children.length > 0) {
      menuChildren = transformAuthRouteToMenu(route.children);
    }
    const menuItem: App.Menu = addPartialProps({
      menu: {
        routeName: name as AuthRoute.RouteKey,
        routePath: path,
        meta,
      },
      icon: meta.icon,
      localIcon: meta.localIcon,
      children: menuChildren,
    });

    if (!hideInMenu(route)) {
      globalMenu.push(menuItem);
    }
  });

  return globalMenu;
}
