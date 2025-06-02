/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 15:35:10
 * @LastEditTime: 2025-05-28 11:35:15
 * @LastEditors: LLiuHuan
 */
import type { RouteRecordRaw } from 'vue-router';

import {
  ARCO_ANT_PREVIEW_URL,
  ARCO_DOC_URL,
  ARCO_GITHUB_URL,
  ARCO_LOGO_URL,
  ARCO_NAIVE_PREVIEW_URL,
} from '@arco/constants';
import { SvgAntdvLogoIcon } from '@arco/icons';

import { IFrameView } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      badgeType: 'dot',
      icon: ARCO_LOGO_URL,
      order: 9998,
      title: $t('demos.vben.title'),
    },
    name: 'ArcoProject',
    path: '/vben-admin',
    children: [
      {
        name: 'ArcoDocument',
        path: '/vben-admin/document',
        component: IFrameView,
        meta: {
          icon: 'lucide:book-open-text',
          link: ARCO_DOC_URL,
          title: $t('demos.vben.document'),
        },
      },
      {
        name: 'ArcoGithub',
        path: '/vben-admin/github',
        component: IFrameView,
        meta: {
          icon: 'mdi:github',
          link: ARCO_GITHUB_URL,
          title: 'Github',
        },
      },
      {
        name: 'ArcoNaive',
        path: '/vben-admin/naive',
        component: IFrameView,
        meta: {
          badgeType: 'dot',
          icon: 'logos:naiveui',
          link: ARCO_NAIVE_PREVIEW_URL,
          title: $t('demos.vben.naive-ui'),
        },
      },
      {
        name: 'ArcoAntd',
        path: '/vben-admin/antd',
        component: IFrameView,
        meta: {
          badgeType: 'dot',
          icon: SvgAntdvLogoIcon,
          link: ARCO_ANT_PREVIEW_URL,
          title: $t('demos.vben.antdv'),
        },
      },
    ],
  },
  {
    name: 'ArcoAbout',
    path: '/vben-admin/about',
    component: () => import('#/views/_core/about/index.vue'),
    meta: {
      icon: 'lucide:copyright',
      title: $t('demos.vben.about'),
      order: 9999,
    },
  },
];

export default routes;
