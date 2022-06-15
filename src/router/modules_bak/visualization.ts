// import { RouteRecordRaw } from 'vue-router';
// import { Layout } from '@/router/constant';
// import { IconList } from '@arco-design/web-vue/es/icon';
//
// const routeName = 'visualization';
//
// const dataAnalysis = import('@/views/visualization/data-analysis/index.vue');
// const multiDimensionDataAnalysis = import(
//   '@/views/visualization/multi-dimension-data-analysis/index.vue'
// );
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
//     path: '/visualization',
//     name: `${routeName}.index`,
//     redirect: '/visualization/data-analysis',
//     component: Layout,
//     meta: {
//       title: routeName,
//       icon: IconList,
//       permissions: ['visualization'],
//       sort: 0,
//     },
//     children: [
//       {
//         path: 'data-analysis',
//         name: `${routeName}.data-analysis`,
//         meta: {
//           title: 'data-analysis',
//           permissions: ['visualization_data-analysis'],
//         },
//         component: () => dataAnalysis,
//       },
//       {
//         path: 'multi-dimension-data-analysis',
//         name: `${routeName}.multi-dimension-data-analysis`,
//         meta: {
//           title: 'multi-dimension-data-analysis',
//           permissions: ['visualization_multi-dimension-data-analysis'],
//         },
//         component: () => multiDimensionDataAnalysis,
//       },
//     ],
//   },
// ];
//
// export default routes;

import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [];
export default routes;
