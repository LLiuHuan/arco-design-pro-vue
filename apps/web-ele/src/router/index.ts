/*
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-08 09:46:45
 * @LastEditTime: 2025-05-08 09:49:42
 * @LastEditors: LLiuHuan
 */
import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

/**
 *  @zh_CN 创建vue-router实例
 */
const router = createRouter({
  history:
    import.meta.env.VITE_ROUTER_HISTORY === 'hash'
      ? createWebHashHistory(import.meta.env.VITE_BASE)
      : createWebHistory(import.meta.env.VITE_BASE),
  // 应该添加到路由的初始路由列表。
  routes: [
    {
      component: () => import('#/views/t1/index.vue'),
      name: 't1',
      path: '/',
      children: [],
    }
  ],
  // 是否应该禁止尾部斜杠。
  // strict: true,
});


export { router };
