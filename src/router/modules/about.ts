const about: AuthRoute.Route = {
  name: 'about',
  path: '/about',
  component: 'self',
  meta: {
    title: '关于',
    icon: 'simple-icons:aboutdotme',
    order: 10,
    singleLayout: 'basic',
  },
};

export default about;
