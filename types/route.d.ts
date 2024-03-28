declare namespace PageRoute {
  /**
   * the root route key
   * @translate 根路由
   */
  type RootRouteKey = 'root';

  /**
   * the not found route, which catch the invalid route path
   * @translate 未找到路由(捕获无效路径的路由)
   */
  type NotFoundRouteKey = 'not-found';

  /**
   * the route key
   * @translate 页面路由
   */
  type RouteKey =
    | '403'
    | '404'
    | '500'
    | 'redirect'
    | 'constant-page'
    | 'login'
    | 'not-found'
    | 'about'
    | 'dashboard'
    | 'dashboard_analysis'
    | 'dashboard_workbench';

  /**
   * last degree route key, which has the page file
   * @translate 最后一级路由(该级路有对应的页面文件)
   */
  type LastDegreeRouteKey = Extract<
    RouteKey,
    | '403'
    | '404'
    | '500'
    | 'redirect'
    | 'constant-page'
    | 'login'
    | 'not-found'
    | 'about'
    | 'auth-demo_permission'
    | 'auth-demo_super'
    | 'component_button'
    | 'component_card'
    | 'component_table'
    | 'dashboard_analysis'
    | 'dashboard_workbench'
    | 'document_naive'
    | 'document_project-link'
    | 'document_project'
    | 'document_vite'
    | 'document_vue'
    | 'exception_403'
    | 'exception_404'
    | 'exception_500'
    | 'function_tab-detail'
    | 'function_tab-multi-detail'
    | 'function_tab'
    | 'function_websocket'
    | 'management_auth'
    | 'management_role'
    | 'management_route'
    | 'management_user'
    | 'multi-menu_first_second-new_third'
    | 'multi-menu_first_second'
    | 'plugin_charts_antv'
    | 'plugin_charts_echarts'
    | 'plugin_copy'
    | 'plugin_editor_markdown'
    | 'plugin_editor_quill'
    | 'plugin_icon'
    | 'plugin_map'
    | 'plugin_print'
    | 'plugin_swiper'
    | 'plugin_video'
  >;
}

declare namespace AuthRoute {
  /** 根路由路径 */
  type RootRoutePath = '/';

  /** 捕获无效路由的路由路径 */
  type NotFoundRoutePath = '/:pathMatch(.*)*';

  type RootRouteKey = PageRoute.RootRouteKey;

  type NotFoundRouteKey = PageRoute.NotFoundRouteKey;

  type RouteKey = PageRoute.RouteKey;

  type AllRouteKey = RouteKey | RootRouteKey | NotFoundRouteKey;

  /** 路由路径 */
  type RoutePath<K extends AllRouteKey = AllRouteKey> =
    AuthRouteUtils.GetRoutePath<K>;

  /**
   * 路由的组件
   * - basic - 基础布局，具有公共部分的布局
   * - blank - 空白布局
   * - multi - 多级路由布局(三级路由或三级以上时，除第一级路由和最后一级路由，其余的采用该布局)
   * - self - 作为子路由，使用自身的布局(作为最后一级路由，没有子路由)
   */
  type RouteComponentType = 'basic' | 'blank' | 'multi' | 'self';

  /** 路由描述 */
  interface RouteMeta<K extends AuthRoute.RoutePath> {
    /** 路由标题(可用来作document.title或者菜单的名称) */
    title: string;
    /** 用来支持多国语言 如果i18nTitle和title同时存在优先使用i18nTitle */
    // i18nTitle?: I18nType.I18nKey;
    i18nTitle?: string;
    /** 路由的动态路径(需要动态路径的页面需要将path添加进范型参数) */
    dynamicPath?: AuthRouteUtils.GetDynamicPath<K>;
    /** 作为单级路由的父级路由布局组件 */
    singleLayout?: Extract<RouteComponentType, 'basic' | 'blank'>;
    /** 需要登录权限 */
    requiresAuth?: boolean;
    /**
     * 哪些类型的用户有权限才能访问的路由(空的话则表示不需要权限)
     * @description 后端动态路由数据不需要该属性，直接由后端根据用户角色返回对应权限的路由数据
     */
    permissions?: Auth.RoleType[];
    /** 缓存页面 */
    keepAlive?: boolean;
    /** 菜单和面包屑对应的图标 */
    icon?: string;
    /** 使用本地svg作为的菜单和面包屑对应的图标(assets/svg-icon文件夹的的svg文件名) */
    localIcon?: string;
    /** 是否在菜单中隐藏(一些列表、表格的详情页面需要通过参数跳转，所以不能显示在菜单中) */
    hide?: boolean;
    /** 外链链接 */
    href?: string;
    /** 是否支持多个tab页签(默认一个，即相同name的路由会被替换) */
    multiTab?: boolean;
    /** 路由顺序，可用于菜单的排序 */
    order?: number;
    /** 当前路由需要选中的菜单项(用于跳转至不在左侧菜单显示的路由且需要高亮某个菜单的情况) */
    activeMenu?: RouteKey;
    /** 表示是否是多级路由的中间级路由(用于转换路由数据时筛选多级路由的标识，定义路由时不用填写) */
    multi?: boolean;
    /** 是否固定在tab卡不可关闭  */
    affix?: boolean;
  }

  type Route<K extends AllRouteKey = AllRouteKey> = K extends AllRouteKey
    ? {
        /** 路由名称(路由唯一标识) */
        name: K;
        /** 路由路径 */
        path: AuthRouteUtils.GetRoutePath<K>;
        /** 路由重定向 */
        redirect?: AuthRouteUtils.GetRoutePath;
        /**
         * 路由组件
         * - basic: 基础布局，具有公共部分的布局
         * - blank: 空白布局
         * - multi: 多级路由布局(三级路由或三级以上时，除第一级路由和最后一级路由，其余的采用该布局)
         * - self: 作为子路由，使用自身的布局(作为最后一级路由，没有子路由)
         */
        component?: RouteComponentType;
        /** 子路由 */
        children?: Route[];
        /** 路由描述 */
        meta: RouteMeta<RoutePath<K>>;
      } & Omit<
        import('vue-router').RouteRecordRaw,
        'name' | 'path' | 'redirect' | 'component' | 'children' | 'meta'
      >
    : never;

  /** 前端导入的路由模块 */
  type RouteModule = Record<string, { default: Route }>;
}
