const dashboard: AuthRoute.Route = {
  name: 'dashboard',
  path: '/dashboard',
  component: 'basic',
  children: [
    {
      name: 'dashboard_analysis',
      path: '/dashboard/analysis',
      component: 'self',
      meta: {
        title: '分析页',
        ignoreAuth: true,
        i18nTitle: 'routes.dashboard.analysis.title',
        affix: true,
      },
    },
    {
      name: 'dashboard_workbench',
      path: '/dashboard/workbench',
      component: 'self',
      meta: {
        title: '工作台',
        ignoreAuth: true,
        i18nTitle: 'routes.dashboard.workbench.title',
      },
    },
  ],
  meta: {
    title: '仪表盘',
    icon: 'mdi:monitor-dashboard',
    order: 1,
    i18nTitle: 'routes.dashboard.title',
  },
};

export default dashboard;
