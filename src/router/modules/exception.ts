const exception: AuthRoute.Route = {
  name: 'exception',
  path: '/exception',
  component: 'basic',
  children: [
    // {
    //   name: '403',
    //   path: '/exception/403',
    //   component: 'self',
    //   meta: {
    //     title: '分析页',
    //     i18nKey: 'routes.dashboard.analysis.title',
    //     constant: true,
    //   },
    // },
  ],
  meta: {
    title: '仪表盘',
    icon: 'mdi:monitor-dashboard',
    order: 1,
    i18nKey: 'routes.dashboard.title',
  },
};

export default exception;
