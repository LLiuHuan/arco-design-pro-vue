type ElegantConstRoute = import('@elegant-router/types').ElegantConstRoute;

export interface MenuRoute extends ElegantConstRoute {
  id: string;
}

export interface UserRouteModel {
  routes: MenuRoute[];
  home: import('@elegant-router/types').LastLevelRouteKey;
}
