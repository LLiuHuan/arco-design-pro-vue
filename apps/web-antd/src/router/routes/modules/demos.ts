/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-12-16 12:18:02
 * @LastEditTime: 2026-02-18 23:55:07
 * @LastEditors: LLiuHuan
 */
import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'ic:baseline-view-in-ar',
      keepAlive: true,
      order: 1000,
      title: $t('demos.title'),
    },
    name: 'Demos',
    path: '/demos',
    children: [
      {
        meta: {
          title: $t('demos.antd'),
        },
        name: 'AntDesignDemos',
        path: '/demos/ant-design',
        component: () => import('#/views/demos/antd/index.vue'),
      },
      {
        name: 'CropperDemo',
        path: '/demos/cropper',
        component: () => import('#/views/demos/cropper/index.vue'),
        meta: {
          icon: 'mdi:crop',
          title: $t('examples.cropper.title'),
        },
      },
    ],
  },
];

export default routes;
