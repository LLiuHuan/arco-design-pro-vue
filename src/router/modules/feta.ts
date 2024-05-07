const components: AuthRoute.Route = {
  name: 'feta',
  path: '/feta',
  component: 'basic',
  children: [
    {
      name: 'feta_:id_sub1',
      path: '/feta/:id/sub1',
      component: 'self',
      meta: {
        title: '111aaa',
      },
    },
  ],
  meta: {
    title: '功能',
  },
};

export default components;