import type { Router } from 'vue-router';
import { useRouteStoreWithOut } from '@/store/modules/route';
import { configureDynamicParamsMenu } from '../helper/menuHelper';

export function createParamMenuGuard(router: Router) {
  const routeStore = useRouteStoreWithOut();
  router.beforeEach(async (to, _, next) => {
    // filter no name route
    if (!to.name) {
      next();
      return;
    }

    // menu has been built.
    if (!routeStore.getIsInitAuthRoute) {
      next();
      return;
    }

    // const menus: App.Menu[] = [];
    // if (isBackMode()) {
    //   menus = permissionStore.getBackMenuList;
    // } else if (isRouteMappingMode()) {
    //   menus = permissionStore.getFrontMenuList;
    // }
    routeStore.getMenus.forEach((item) =>
      configureDynamicParamsMenu(item, to.params),
    );

    next();
  });
}
