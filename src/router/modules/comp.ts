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
  ],
  meta: {
    title: '组件',
    icon: 'ci:main-component',
    order: 5,
  },
};

export default components;
