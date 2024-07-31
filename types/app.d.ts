declare namespace App {
  type RouteLocationNormalizedLoaded =
    import('vue-router').RouteLocationNormalizedLoaded;
  type RouteMeta = import('vue-router').RouteMeta;
  type VNode = import('vue').VNode;

  /**
   * @description The global header props
   * @description 全局头部属性
   */
  interface Header {
    /** Whether to show the logo */
    showLogo?: boolean;
    /** Whether to show the menu toggle */
    showMenuToggle?: boolean;
    /** Whether to show the menu */
    showMenu?: boolean;
  }

  type Menu = {
    /**
     * 菜单Key
     * The menu key
     *
     * 等于路由key
     * Equal to the route key
     */
    key: string;
    /**
     * 菜单标签
     * The menu label
     */
    label: string;
    /**
     * 菜单i18n key
     * The menu i18n key
     */
    i18nKey?: string;
    /**
     * 路由key
     * The route key
     */
    routeKey: RouteKey;
    /**
     * 路由路径 dashboard_analysis => /dashboard/analysis
     * The route path
     */
    routePath: RoutePath;
    /**
     * 菜单图标
     * The menu icon
     */
    icon?: () => VNode;
    /**
     * 菜单子项
     * The menu children
     */
    children?: Menu[];
  };

  type Breadcrumb = Omit<Menu, 'children'> & {
    options?: Breadcrumb[];
  };

  type TabRoute = Pick<
    RouteLocationNormalizedLoaded,
    'name' | 'path' | 'meta'
  > &
    Partial<
      Pick<RouteLocationNormalizedLoaded, 'fullPath' | 'query' | 'matched'>
    >;

  type Tab = {
    /**
     * @description id
     * @description The tab id
     */
    id: string;
    /**
     * @description 标签名称
     * @description The tab label
     */
    label: string;
    /**
     * The new tab label
     *
     * If set, the tab label will be replaced by this value
     */
    newLabel?: string;
    /**
     * The old tab label
     *
     * when reset the tab label, the tab label will be replaced by this value
     */
    oldLabel?: string;
    /** The tab route key */
    routeKey: LastLevelRouteKey;
    /** The tab route path */
    routePath: RouteMap[LastLevelRouteKey];
    /** The tab route full path */
    fullPath: string;
    /** The tab fixed index */
    fixedIndex?: number | null;
    /**
     * Tab icon
     *
     * Iconify icon
     */
    icon?: string;
    /**
     * Tab local icon
     *
     * Local icon
     */
    localIcon?: string;
    /** I18n key */
    i18nKey?: string;
  };

  // interface Tab
  //   extends Pick<
  //     import('vue-router').RouteLocationNormalized,
  //     'name' | 'meta' | 'fullPath' | 'query' | 'params'
  //   > {
  //   /** 滚动的位置 */
  //   scrollPosition?: {
  //     left: number;
  //     top: number;
  //   };
  // }
}
