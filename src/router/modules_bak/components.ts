// import { RouteRecordRaw } from 'vue-router';
// import { Layout } from '@/router/constant';
// import { IconCommand } from '@arco-design/web-vue/es/icon';
//
// const routeName = 'components';
// const markdown = import('@/views/components/markdown/index.vue');
// const split = import('@/views/components/split/index.vue');
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
//     path: '/components',
//     name: `${routeName}.index`,
//     redirect: '/components/markdown',
//     component: Layout,
//     meta: {
//       title: routeName,
//       icon: IconCommand,
//       permissions: ['components'],
//       sort: 8,
//     },
//     children: [
//       {
//         path: 'markdown',
//         name: `${routeName}.markdown`,
//         meta: {
//           title: `${routeName}.markdown`,
//           permissions: ['components_markdown'],
//         },
//         component: () => markdown,
//       },
//       {
//         path: 'split',
//         name: `${routeName}.split`,
//         meta: {
//           title: `${routeName}.split`,
//           permissions: ['components_split'],
//         },
//         component: () => split,
//       },
//     ],
//   },
// ];
//
// export default routes;
