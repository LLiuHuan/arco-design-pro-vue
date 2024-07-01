const plugin = {
  name: 'plugin',
  path: '/plugin',
  component: 'basic',
  children: [
    {
      name: 'plugin_charts',
      path: '/plugin/charts',
      component: 'multi',
      children: [
        {
          name: 'plugin_charts_echarts',
          path: '/plugin/charts/echarts',
          component: 'self',
          meta: {
            title: 'Echarts',
            i18nKey: 'routes.plugin.charts.echarts.title',
            ignoreAuth: true,
          },
        },
      ],
      meta: {
        title: '图表',
        i18nKey: 'routes.plugin.charts.title',
      },
    },
  ],
  meta: {
    title: '插件',
    i18nKey: 'routes.plugin.title',
    icon: 'bi:plugin',
    order: 4,
  },
};

export default plugin;
