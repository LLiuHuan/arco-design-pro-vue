/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-28 12:17:56
 * @LastEditTime: 2025-08-01 01:57:06
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
      // 缺省页
      {
        meta: {
          icon: 'mdi:lightbulb-error-outline',
          title: $t('demos.fallback.title'),
        },
        name: 'FallbackDemos',
        path: '/demos/fallback',
        children: [
          {
            name: 'Fallback403Demo',
            path: '/demos/fallback/403',
            component: () => import('#/views/_core/fallback/forbidden.vue'),
            meta: {
              icon: 'mdi:do-not-disturb-alt',
              title: '403',
            },
          },
          {
            name: 'Fallback404Demo',
            path: '/demos/fallback/404',
            component: () => import('#/views/_core/fallback/not-found.vue'),
            meta: {
              icon: 'mdi:table-off',
              title: '404',
            },
          },
          {
            name: 'Fallback500Demo',
            path: '/demos/fallback/500',
            component: () =>
              import('#/views/_core/fallback/internal-error.vue'),
            meta: {
              icon: 'mdi:server-network-off',
              title: '500',
            },
          },
          {
            name: 'FallbackOfflineDemo',
            path: '/demos/fallback/offline',
            component: () => import('#/views/_core/fallback/offline.vue'),
            meta: {
              icon: 'mdi:offline',
              title: $t('ui.fallback.offline'),
            },
          },
        ],
      },
      // 菜单徽标
      {
        meta: {
          badgeType: 'dot',
          badgeVariants: 'destructive',
          icon: 'lucide:circle-dot',
          title: $t('demos.badge.title'),
        },
        name: 'BadgeDemos',
        path: '/demos/badge',
        children: [
          {
            name: 'BadgeDotDemo',
            component: () => import('#/views/demos/badge/index.vue'),
            path: '/demos/badge/dot',
            meta: {
              badgeType: 'dot',
              icon: 'lucide:square-dot',
              title: $t('demos.badge.dot'),
            },
          },
          {
            name: 'BadgeTextDemo',
            component: () => import('#/views/demos/badge/index.vue'),
            path: '/demos/badge/text',
            meta: {
              badge: '10',
              icon: 'lucide:square-dot',
              title: $t('demos.badge.text'),
            },
          },
          {
            name: 'BadgeColorDemo',
            component: () => import('#/views/demos/badge/index.vue'),
            path: '/demos/badge/color',
            meta: {
              badge: 'Hot',
              badgeVariants: 'destructive',
              icon: 'lucide:square-dot',
              title: $t('demos.badge.color'),
            },
          },
        ],
      },
    ],
  },
];

export default routes;
