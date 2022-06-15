// import { RouteRecordRaw } from 'vue-router';
// import { Layout } from '@/router/constant';
// import { IconList } from '@arco-design/web-vue/es/icon';
//
// const routeName = 'list';
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
//     path: '/list',
//     name: `${routeName}.index`,
//     redirect: '/list/search-table',
//     component: Layout,
//     meta: {
//       title: routeName,
//       icon: IconList,
//       permissions: ['profile'],
//       sort: 0,
//     },
//     children: [
//       {
//         path: 'search-table',
//         name: `${routeName}.search-table`,
//         meta: {
//           title: 'search-table',
//           permissions: ['list_search-table'],
//         },
//         component: () => import('@/views/list/search-table/index.vue'),
//       },
//       {
//         path: 'card',
//         name: `${routeName}.card`,
//         meta: {
//           title: 'card',
//           permissions: ['list_card'],
//         },
//         component: () => import('@/views/list/card/index.vue'),
//       },
//     ],
//   },
// ];
//
// export default routes;

import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [];
export default routes;
