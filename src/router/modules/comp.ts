const components: AuthRoute.Route = {
  name: 'comp',
  path: '/comp',
  component: 'basic',
  children: [
    {
      name: 'comp_loading',
      path: '/comp/loading',
      component: 'self',
      meta: {
        title: 'Loading',
        ignoreAuth: true,
      },
    },
    {
      name: 'comp_table',
      path: '/comp/table',
      component: 'multi',
      meta: {
        title: '表格',
        ignoreAuth: true,
      },
      children: [
        {
          name: 'comp_table_basic',
          path: '/comp/table/basic',
          component: 'self',
          meta: {
            title: '基础表格',
            ignoreAuth: true,
          },
        },
      ],
    },
    {
      name: 'comp_form',
      path: '/comp/form',
      component: 'multi',
      meta: {
        title: '表格',
        ignoreAuth: true,
      },
      children: [
        {
          name: 'comp_form_basic',
          path: '/comp/form/basic',
          component: 'self',
          meta: {
            title: '基础表单',
            ignoreAuth: true,
          },
        },
      ],
    },
  ],
  meta: {
    title: '组件',
    icon: 'ci:main-component',
    order: 5,
  },
};

export default components;
