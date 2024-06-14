import { RoleEnum } from '@/enums/authEnum';

const permission: AuthRoute.Route = {
  name: 'permission',
  path: '/permission',
  component: 'basic',
  children: [
    {
      name: 'permission_front',
      path: '/permission/front',
      component: 'multi',
      children: [
        {
          name: 'permission_front_auth-page-a',
          path: '/permission/front/auth-page-a',
          component: 'self',
          meta: {
            title: '权限页面A',
            ignoreAuth: true,
            roles: [RoleEnum.SUPER],
          },
        },
        {
          name: 'permission_front_auth-page-b',
          path: '/permission/front/auth-page-b',
          component: 'self',
          meta: {
            title: '权限页面B',
            ignoreAuth: true,
            roles: [RoleEnum.USER],
          },
        },
        {
          name: 'permission_front_btn',
          path: '/permission/front/btn',
          component: 'self',
          meta: {
            title: '按钮权限',
            ignoreAuth: true,
          },
        },
      ],
      meta: {
        title: '前端路由',
        ignoreAuth: true,
      },
    },
  ],
  meta: {
    title: '权限管理',
    icon: 'mdi:monitor-dashboard',
    order: 3,
  },
};

export default permission;
