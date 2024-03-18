declare namespace AuthRouteUtils {
  /** 路由key层级分割符 */
  type RouteKeySplitMark = '_';

  /** 路由path层级分割符 */
  type RoutePathSplitMark = '/';

  /** 空白字符串 */
  type BlankString = '';

  /** key转换成path */
  type KeyToPath<K extends string> =
    K extends `${infer _Left}${RouteKeySplitMark}${RouteKeySplitMark}${infer _Right}`
      ? never
      : K extends `${infer Left}${RouteKeySplitMark}${infer Right}`
        ? Left extends BlankString
          ? never
          : Right extends BlankString
            ? never
            : KeyToPath<`${Left}${RoutePathSplitMark}${Right}`>
        : `${RoutePathSplitMark}${K}`;

  /** 根据路由key获取路由路径 */
  type GetRoutePath<K extends AuthRoute.AllRouteKey = AuthRoute.AllRouteKey> =
    K extends AuthRoute.AllRouteKey
      ? K extends AuthRoute.RootRouteKey
        ? AuthRoute.RootRoutePath
        : K extends AuthRoute.NotFoundRouteKey
          ? AuthRoute.NotFoundRoutePath
          : KeyToPath<K>
      : never;

  /** 获取一级路由(有子路由的一级路由和没有子路由的路由) */
  type GetFirstDegreeRouteKey<
    K extends AuthRoute.RouteKey = AuthRoute.RouteKey,
  > = K extends `${infer _Left}${RouteKeySplitMark}${infer _Right}` ? never : K;

  /** 获取有子路由的一级路由 */
  type GetFirstDegreeRouteKeyWithChildren<
    K extends AuthRoute.RouteKey = AuthRoute.RouteKey,
  > = K extends `${infer Left}${RouteKeySplitMark}${infer _Right}`
    ? Left
    : never;

  /** 单级路由的key (单级路由需要添加一个父级路由用于应用布局组件) */
  type SingleRouteKey = Exclude<
    GetFirstDegreeRouteKey,
    | GetFirstDegreeRouteKeyWithChildren
    | AuthRoute.RootRouteKey
    | AuthRoute.NotFoundRouteKey
  >;

  /** 单独路由父级路由key */
  type SingleRouteParentKey = `${SingleRouteKey}-parent`;

  /** 单独路由父级路由path */
  type SingleRouteParentPath = KeyToPath<SingleRouteParentKey>;

  /** 获取路由动态路径 */
  type GetDynamicPath<P extends AuthRoute.RoutePath> =
    | `${P}/:${string}`
    | `${P}/:${string}(${string})`
    | `${P}/:${string}(${string})?`;
}
