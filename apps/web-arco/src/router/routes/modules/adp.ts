/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:37:08
 * @LastEditTime: 2025-07-15 22:53:58
 * @LastEditors: LLiuHuan
 */
import type { RouteRecordRaw } from 'vue-router';

import {
  ARCO_ANT_PREVIEW_URL,
  ARCO_DOC_URL,
  ARCO_ELE_PREVIEW_URL,
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
      title: $t('demos.adp.title'),
    },
    name: 'ArcoProject',
    path: '/arco',
    children: [
      {
        name: 'ArcoDocument',
        path: '/arco/document',
        component: IFrameView,
        meta: {
          icon: 'lucide:book-open-text',
          link: ARCO_DOC_URL,
          title: $t('demos.adp.document'),
        },
      },
      {
        name: 'ArcoGithub',
        path: '/arco/github',
        component: IFrameView,
        meta: {
          icon: 'mdi:github',
          link: ARCO_GITHUB_URL,
          title: 'Github',
        },
      },
      {
        name: 'ArcoAntd',
        path: '/arco/antd',
        component: IFrameView,
        meta: {
          badgeType: 'dot',
          icon: SvgAntdvLogoIcon,
          link: ARCO_ANT_PREVIEW_URL,
          title: $t('demos.adp.antdv'),
        },
      },
      {
        name: 'ArcoElementPlus',
        path: '/arco/ele',
        component: IFrameView,
        meta: {
          badgeType: 'dot',
          icon: 'logos:element',
          link: ARCO_ELE_PREVIEW_URL,
          title: $t('demos.adp.element-plus'),
        },
      },
      {
        name: 'ArcoNaive',
        path: '/arco/naive',
        component: IFrameView,
        meta: {
          badgeType: 'dot',
          icon: 'logos:naiveui',
          link: ARCO_NAIVE_PREVIEW_URL,
          title: $t('demos.adp.naive-ui'),
        },
      },
    ],
  },
  {
    name: 'ArcoAbout',
    path: '/arco/about',
    component: () => import('#/views/_core/about/index.vue'),
    meta: {
      icon: 'lucide:copyright',
      title: $t('demos.adp.about'),
      order: 9999,
    },
  },
];

export default routes;
