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
    icon: 'ion:git-compare-outline',
    order: 5,
  },
};

export default components;
