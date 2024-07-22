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

  type RedirectRouteKey = 'redirect';

  /**
   * the route key
   * @translate 页面路由
   */
  type RouteKey =
    | 'redirect-page'
    | '403'
    | '404'
    | '500'
    | 'exception'
    | 'redirect'
    | 'constant-page'
    | 'login'
    | 'not-found-page'
    | 'not-found'
    | 'about'
    | 'about-parent'
    | 'dashboard'
    | 'dashboard_analysis'
    | 'dashboard_workbench'
    | 'comp'
    | 'comp_loading'
    | 'comp_table'
    | 'comp_table_basic'
    | 'comp_form'
    | 'comp_form_basic'
    | 'user-center'
    | 'document'
    | 'document_vue3'
    | 'document_github'
    | 'func'
    | 'func_:id_sub1'
    | 'func_error-log'
    | 'func_upload-chunk'
    | 'permission'
    | 'permission_front'
    | 'permission_front_auth-page-a'
    | 'permission_front_auth-page-b'
    | 'permission_front_btn'
    | 'exception_403';

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

  type RedirectRoutePath = '/redirect/:pathMatch(.*)';

  type RedirectRouteKey = PageRoute.RedirectRouteKey;

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
   * - flow - 流程布局(多级路由的第一级路由) 垂直布局
   * - multi - 多级路由布局(三级路由或三级以上时，除第一级路由和最后一级路由，其余的采用该布局)
   * - self - 作为子路由，使用自身的布局(作为最后一级路由，没有子路由)
   */
  type RouteComponentType = 'basic' | 'blank' | 'multi' | 'self';

  /** 路由描述 */
  interface RouteMeta<K extends AuthRoute.RoutePath> {
    /**
     * 路由标题(可用来作document.title或者菜单的名称)
     * Route name
     */
    title: string;
    /**
     * 路由国际化名称(用来支持多国语言 如果i18nKey和title同时存在优先使用i18nKey)
     * Route internationalized name
     */
    i18nKey?: string;
    /**
     * 哪些类型的用户有权限才能访问的路由(空的话则表示不需要权限)
     * 后端动态路由数据不需要该属性，直接由后端根据用户角色返回对应权限的路由数据
     * Which types of users have permission to access the route
     * If it is empty, it means that no permission is required
     */
    roles?: string[];
    /**
     * 是否缓存路由
     * Whether to cache the route
     */
    keepAlive?: boolean | null;
    /**
     * 是否固定路由
     * Is constant route
     *
     * 设置为true时，访问路由时不会进行登录验证，也不会进行权限验证
     * when it is set to true, there will be no login verification and no permission verification to access the route
     */
    constant?: boolean | null;
    /**
     * 图标
     * Iconify icon
     *
     * 它可以在菜单或面包屑中使用
     * It can be used in the menu or breadcrumb
     */
    icon?: string;
    /**
     * 本地图标
     * Local icon
     *
     * 在"src/assets/svg-icon"中，如果设置了，将忽略图标
     * In "src/assets/svg-icon", if it is set, the icon will be ignored
     */
    localIcon?: string;
    /**
     * @description 路由顺序
     * @description Router order
     */
    order?: number | null;
    /**
     * 外链链接
     * The outer link of the route
     */
    href?: string;
    /**
     * 是否在菜单中隐藏(一些列表、表格的详情页面需要通过参数跳转，所以不能显示在菜单中)
     * Whether to hide the route in the menu
     */
    hideInMenu?: boolean | null;
    /**
     * 进入路由时将激活菜单键
     * The menu key will be activated when entering the route
     *
     * 路由不在菜单中
     * The route is not in the menu
     *
     * @example
     *  路由为"user_detail"，如果设置为"user_list"，菜单"user_list"将被激活
     *  the route is "user_detail", if it is set to "user_list", the menu "user_list" will be activated
     */
    activeMenu?: PageRoute.RouteKey | null;
    /**
     * 默认情况下，相同的路由路径将使用一个选项卡，即使使用不同的查询，如果设置为 true，则路由
     * 不同的查询将使用不同的选项卡
     *
     * By default, the same route path will use one tab, even with different query, if set true, the route with
     * different query will use different tabs
     */
    multiTab?: boolean | null;
    /**
     * 如果设置，路由将在选项卡中固定，并且值是固定选项卡的顺序
     * If set, the route will be fixed in tabs, and the value is the order of fixed tabs
     */
    fixedIndexInTab?: number | null;
    /**
     * 如果设置查询参数，进入路由时将自动携带
     * if set query parameters, it will be automatically carried when entering the route
     */
    query?: { key: string; value: string }[] | null;

    /** 路由的动态路径(需要动态路径的页面需要将path添加进范型参数) */
    dynamicPath?: AuthRouteUtils.GetDynamicPath<K>;
    /** 作为单级路由的父级路由布局组件 */
    singleLayout?: Extract<AuthRoute.RouteComponentType, 'basic' | 'blank'>;
    /** 表示是否是多级路由的中间级路由(用于转换路由数据时筛选多级路由的标识，定义路由时不用填写) */
    multi?: boolean;
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

  type _RouteRecordBase = import('vue-router')._RouteRecordBase;
  type ConstRoute = Omit<_RouteRecordBase, 'name' | 'path' | 'children'> & {
    name: string;
    path: string;
    component?: RouteComponentType;
    children?: ConstRoute[];
  };
  /**
   * @description 前端导入的路由模块
   * @description Front-end imported route module
   * - key: 路由名称
   * - value: 路由模块
   * @example
   * Record<string, { default: ConstRoute }>
   * {
   *   './about.ts': () => import('./about.ts'),
   * }
   */
  type RouteModule = Record<string, { default: ConstRoute }>;
}
