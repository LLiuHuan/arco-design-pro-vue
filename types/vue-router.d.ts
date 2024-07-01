import 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    /**
     * 路由名称
     * Route name
     */
    title: string;
    /**
     * 路由国际化名称
     * Route internationalized name
     */
    i18nKey?: string;
    /**
     * 哪些类型的用户有权限才能访问的路由
     * Which types of users have permission to access the route
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
     * 是否在菜单中隐藏
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

    /**
     * 路由的动态路径(需要动态路径的页面需要将path添加进范型参数)
     */
    dynamicPath?: AuthRouteUtils.GetDynamicPath<K>;
    /**
     * 作为单级路由的父级路由布局组件
     */
    singleLayout?: Extract<
      AuthRoute.RouteComponentType,
      'basic' | 'blank' | 'flow'
    >;
    /**
     * 表示是否是多级路由的中间级路由(用于转换路由数据时筛选多级路由的标识，定义路由时不用填写)
     */
    multi?: boolean;

    /**
     * 是否已加载
     * Whether it has been loaded
     */
    loaded?: boolean;

    // /**
    //  * Whether to ignore permissions
    //  * 是否忽略权限
    //  */
    // ignoreAuth?: boolean;
    // /**
    //  * Menu items that need to be selected for the current route
    //  * 当前路由需要选中的菜单项
    //  */
    // currentActiveMenu?: string;
    //
    // // Never show in tab
    // hideTab?: boolean;
    // dynamicLevel?: number;
    // /** 是否固定在tab卡不可关闭  */
    // affix?: boolean;
    //
    // hideMenu?: boolean;
  }
}
