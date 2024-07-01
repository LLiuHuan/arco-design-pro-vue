export interface MenuRouteModel extends AuthRoute.ConstRoute {
  id: string;
}

export interface UserRouteModel {
  routes: MenuRouteModel[];
  home: PageRoute.LastDegreeRouteKey;
}
