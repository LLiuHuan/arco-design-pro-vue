const functions: AuthRoute.Route = {
  name: 'func',
  path: '/func',
  component: 'basic',
  children: [
    {
      name: 'func_:id_sub1',
      path: '/func/:id/sub1',
      component: 'self',
      meta: {
        title: '111aaa',
        // dynamicPath: '/func/:id/sub1',
      },
    },
    {
      name: 'func_error-log',
      path: '/func/error-log',
      component: 'self',
      meta: {
        title: '错误日志',
      },
    },
  ],
  meta: {
    title: '功能',
    icon: 'ion:git-compare-outline',
    order: 6,
  },
};

export default functions;
