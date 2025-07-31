/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-28 12:17:56
 * @LastEditTime: 2025-08-01 02:12:14
 * @LastEditors: LLiuHuan
 */
import type { RouteRecordRaw } from 'vue-router';

import { IFrameView } from '#/layouts';
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
      // 菜单激活图标
      {
        meta: {
          activeIcon: 'fluent-emoji:radioactive',
          icon: 'bi:radioactive',
          title: $t('demos.activeIcon.title'),
        },
        name: 'ActiveIconDemos',
        path: '/demos/active-icon',
        children: [
          {
            name: 'ActiveIconDemo',
            component: () => import('#/views/demos/active-icon/index.vue'),
            path: '/demos/active-icon/children',
            meta: {
              activeIcon: 'fluent-emoji:radioactive',
              icon: 'bi:radioactive',
              title: $t('demos.activeIcon.children'),
            },
          },
        ],
      },
      // 外部链接
      {
        meta: {
          icon: 'ic:round-settings-input-composite',
          title: $t('demos.outside.title'),
        },
        name: 'OutsideDemos',
        path: '/demos/outside',
        children: [
          {
            name: 'IframeDemos',
            path: '/demos/outside/iframe',
            meta: {
              icon: 'mdi:newspaper-variant-outline',
              title: $t('demos.outside.embedded'),
            },
            children: [
              {
                name: 'VueDocumentDemo',
                path: '/demos/outside/iframe/vue-document',
                component: IFrameView,
                meta: {
                  icon: 'logos:vue',
                  iframeSrc: 'https://cn.vuejs.org/',
                  keepAlive: true,
                  title: 'Vue',
                },
              },
              {
                name: 'UnoCSSDemo',
                path: '/demos/outside/iframe/unocss',
                component: IFrameView,
                meta: {
                  icon: 'logos:unocss',
                  iframeSrc: 'https://unocss.dev/',
                  // keepAlive: true,
                  title: 'UnoCSS',
                },
              },
            ],
          },
          {
            name: 'ExternalLinkDemos',
            path: '/demos/outside/external-link',
            meta: {
              icon: 'mdi:newspaper-variant-multiple-outline',
              title: $t('demos.outside.externalLink'),
            },
            children: [
              {
                name: 'ViteDemo',
                path: '/demos/outside/external-link/vite',
                component: IFrameView,
                meta: {
                  icon: 'logos:vitejs',
                  link: 'https://vitejs.dev/',
                  title: 'Vite',
                },
              },
              {
                name: 'VueUseDemo',
                path: '/demos/outside/external-link/vue-use',
                component: IFrameView,
                meta: {
                  icon: 'logos:vueuse',
                  link: 'https://vueuse.org',
                  title: 'VueUse',
                },
              },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
