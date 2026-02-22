import type { RouteRecordRaw } from 'vue-router';

import {
  QIN_ANT_PREVIEW_URL,
  QIN_DOC_URL,
  QIN_ELE_PREVIEW_URL,
  QIN_GITHUB_URL,
  QIN_LOGO_URL,
  QIN_NAIVE_PREVIEW_URL,
  QIN_TD_PREVIEW_URL,
} from '@qin/constants';
import { SvgAntdvLogoIcon, SvgTDesignIcon } from '@qin/icons';

import { IFrameView } from '#/layouts';
import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      badgeType: 'dot',
      icon: QIN_LOGO_URL,
      order: 9998,
      title: $t('demos.qin.title'),
    },
    name: 'QinProject',
    path: '/qin-admin',
    children: [
      {
        name: 'QinDocument',
        path: '/qin-admin/document',
        component: IFrameView,
        meta: {
          icon: 'lucide:book-open-text',
          link: QIN_DOC_URL,
          title: $t('demos.qin.document'),
        },
      },
      {
        name: 'QinGithub',
        path: '/qin-admin/github',
        component: IFrameView,
        meta: {
          icon: 'mdi:github',
          link: QIN_GITHUB_URL,
          title: 'Github',
        },
      },
      {
        name: 'QinAntd',
        path: '/qin-admin/antd',
        component: IFrameView,
        meta: {
          badgeType: 'dot',
          icon: SvgAntdvLogoIcon,
          link: QIN_ANT_PREVIEW_URL,
          title: $t('demos.qin.antdv'),
        },
      },
      {
        name: 'QinNaive',
        path: '/qin-admin/naive',
        component: IFrameView,
        meta: {
          badgeType: 'dot',
          icon: 'logos:naiveui',
          link: QIN_NAIVE_PREVIEW_URL,
          title: $t('demos.qin.naive-ui'),
        },
      },
      {
        name: 'QinTDesign',
        path: '/qin-admin/tdesign',
        component: IFrameView,
        meta: {
          badgeType: 'dot',
          icon: SvgTDesignIcon,
          link: QIN_TD_PREVIEW_URL,
          title: $t('demos.qin.tdesign'),
        },
      },
      {
        name: 'QinElementPlus',
        path: '/qin-admin/ele',
        component: IFrameView,
        meta: {
          badgeType: 'dot',
          icon: 'logos:element',
          link: QIN_ELE_PREVIEW_URL,
          title: $t('demos.qin.element-plus'),
        },
      },
    ],
  },
  {
    name: 'QinAbout',
    path: '/qin-admin/about',
    component: () => import('#/views/_core/about/index.vue'),
    meta: {
      icon: 'lucide:copyright',
      title: $t('demos.qin.about'),
      order: 9999,
    },
  },
  {
    name: 'Profile',
    path: '/profile',
    component: () => import('#/views/_core/profile/index.vue'),
    meta: {
      icon: 'lucide:user',
      hideInMenu: true,
      title: $t('page.auth.profile'),
    },
  },
];

export default routes;
