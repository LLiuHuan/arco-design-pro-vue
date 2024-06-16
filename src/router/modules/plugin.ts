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
            i18nTitle: 'routes.plugin.charts.echarts.title',
            ignoreAuth: true,
          },
        },
      ],
      meta: {
        i18nTitle: 'routes.plugin.charts.title',
      },
    },
  ],
  meta: {
    i18nTitle: 'routes.plugin.title',
    icon: 'bi:plugin',
    order: 4,
  },
};

export default plugin;
