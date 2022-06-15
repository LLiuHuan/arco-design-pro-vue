// import { RouteRecordRaw } from 'vue-router';
// import { Layout } from '@/router/constant';
// import { IconExclamationCircleFill } from '@arco-design/web-vue/es/icon';
//
// const routeName = 'errors';
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
//     path: '/errors',
//     name: `${routeName}.index`,
//     redirect: '/errors/403',
//     component: Layout,
//     meta: {
//       title: routeName,
//       icon: IconExclamationCircleFill,
//       permissions: ['errors_errors'],
//       sort: 0,
//     },
//     children: [
//       {
//         path: '403',
//         name: `${routeName}.403`,
//         meta: {
//           title: `${routeName}.403`,
//           permissions: ['errors_403'],
//         },
//         component: () => import('@/views/errors/403/index.vue'),
//       },
//       {
//         path: '404',
//         name: `${routeName}.404`,
//         meta: {
//           title: `${routeName}.404`,
//           permissions: ['errors_404'],
//         },
//         component: () => import('@/views/errors/404/index.vue'),
//       },
//       {
//         path: '500',
//         name: `${routeName}.500`,
//         meta: {
//           title: `${routeName}.500`,
//           permissions: ['errors_500'],
//         },
//         component: () => import('@/views/errors/500/index.vue'),
//       },
//     ],
//   },
// ];
//
// export default routes;
