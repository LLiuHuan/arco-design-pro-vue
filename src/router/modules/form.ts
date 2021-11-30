// import { RouteRecordRaw } from 'vue-router';
// import { Layout } from '@/router/constant';
// import { IconSettings } from '@arco-design/web-vue/es/icon';
//
// const routeName = 'form';
//
// const step = import('@/views/form/step/index.vue');
// const group = import('@/views/form/group/index.vue');
//
// /**
//  * @param name 路由名称, 必须设置,且不能重名
//  * @param meta 路由元信息（路由附带扩展信息）
//  * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
//  * @param meta.disabled 禁用整个菜单
//  * @param meta.title 菜单名称
//  * @param meta.icon 菜单图标
//  * @param meta.keepAlive 缓存该路由
//  * @param meta.sort 排序越小越排前
//  * */
// const routes: Array<RouteRecordRaw> = [
//   {
//     path: '/form',
//     name: `${routeName}.index`,
//     redirect: '/form/step',
//     component: Layout,
//     meta: {
//       title: routeName,
//       icon: IconSettings,
//       permissions: ['form'],
//       sort: 0,
//     },
//     children: [
//       {
//         path: 'step',
//         name: `${routeName}.step`,
//         meta: {
//           title: 'step',
//           permissions: ['form_step'],
//         },
//         component: () => step,
//       },
//       {
//         path: 'group',
//         name: `${routeName}.group`,
//         meta: {
//           title: 'group',
//           permissions: ['form_group'],
//         },
//         component: () => group,
//       },
//     ],
//   },
// ];
//
// export default routes;

import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [];
export default routes;
