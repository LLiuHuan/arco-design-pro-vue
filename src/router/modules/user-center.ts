const userCenter: AuthRoute.Route = {
  name: 'user-center',
  path: '/user-center',
  component: 'self',
  meta: {
    title: '用户中心',
    icon: 'mdi:user',
    order: 8,
    singleLayout: 'basic',
  },
};

export default userCenter;
