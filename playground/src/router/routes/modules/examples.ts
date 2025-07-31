/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-07-21 01:21:50
 * @LastEditTime: 2025-07-31 21:52:08
 * @LastEditors: LLiuHuan
 */
import type { RouteRecordRaw } from 'vue-router';

import { $t } from '#/locales';

const routes: RouteRecordRaw[] = [
  {
    meta: {
      icon: 'ion:layers-outline',
      keepAlive: true,
      order: 1000,
      title: $t('examples.title'),
    },
    name: 'Examples',
    path: '/examples',
    children: [
      {
        name: 'FormExample',
        path: '/examples/form',
        meta: {
          icon: 'mdi:form-select',
          title: $t('examples.form.title'),
        },
        children: [
          {
            name: 'FormBasicExample',
            path: '/examples/form/basic',
            component: () => import('#/views/examples/form/basic.vue'),
            meta: {
              title: $t('examples.form.basic'),
            },
          },
          {
            name: 'FormQueryExample',
            path: '/examples/form/query',
            component: () => import('#/views/examples/form/query.vue'),
            meta: {
              title: $t('examples.form.query'),
            },
          },
          {
            name: 'FormRulesExample',
            path: '/examples/form/rules',
            component: () => import('#/views/examples/form/rules.vue'),
            meta: {
              title: $t('examples.form.rules'),
            },
          },
          {
            name: 'FormDynamicExample',
            path: '/examples/form/dynamic',
            component: () => import('#/views/examples/form/dynamic.vue'),
            meta: {
              title: $t('examples.form.dynamic'),
            },
          },
          {
            name: 'FormLayoutExample',
            path: '/examples/form/custom-layout',
            component: () => import('#/views/examples/form/custom-layout.vue'),
            meta: {
              title: $t('examples.form.layout'),
            },
          },
          {
            name: 'FormCustomExample',
            path: '/examples/form/custom',
            component: () => import('#/views/examples/form/custom.vue'),
            meta: {
              title: $t('examples.form.custom'),
            },
          },
          {
            name: 'FormApiExample',
            path: '/examples/form/api',
            component: () => import('#/views/examples/form/api.vue'),
            meta: {
              title: $t('examples.form.api'),
            },
          },
          {
            name: 'FormMergeExample',
            path: '/examples/form/merge',
            component: () => import('#/views/examples/form/merge.vue'),
            meta: {
              title: $t('examples.form.merge'),
            },
          },
          {
            name: 'FormScrollToErrorExample',
            path: '/examples/form/scroll-to-error-test',
            component: () =>
              import('#/views/examples/form/scroll-to-error-test.vue'),
            meta: {
              title: $t('examples.form.scrollToError'),
            },
          },
        ],
      },
      {
        name: 'CaptchaExample',
        path: '/examples/captcha',
        meta: {
          icon: 'logos:recaptcha',
          title: $t('examples.captcha.title'),
        },
        children: [
          {
            name: 'DragVerifyExample',
            path: '/examples/captcha/slider',
            component: () => import('#/views/examples/captcha/slider.vue'),
            meta: {
              title: $t('examples.captcha.sliderCaptcha'),
            },
          },
          {
            name: 'RotateVerifyExample',
            path: '/examples/captcha/slider-rotate',
            component: () =>
              import('#/views/examples/captcha/slider-rotate.vue'),
            meta: {
              title: $t('examples.captcha.sliderRotateCaptcha'),
            },
          },
          {
            name: 'TranslateVerifyExample',
            path: '/examples/captcha/slider-translate',
            component: () =>
              import('#/views/examples/captcha/slider-translate.vue'),
            meta: {
              title: $t('examples.captcha.sliderTranslateCaptcha'),
            },
          },
          {
            name: 'CaptchaPointSelectionExample',
            path: '/examples/captcha/point-selection',
            component: () =>
              import('#/views/examples/captcha/point-selection.vue'),
            meta: {
              title: $t('examples.captcha.pointSelection'),
            },
          },
        ],
      },
      {
        name: 'ModalExample',
        path: '/examples/modal',
        component: () => import('#/views/examples/modal/index.vue'),
        meta: {
          icon: 'system-uicons:window-content',
          keepAlive: true,
          title: $t('examples.modal.title'),
        },
      },
      {
        name: 'DrawerExample',
        path: '/examples/drawer',
        component: () => import('#/views/examples/drawer/index.vue'),
        meta: {
          icon: 'iconoir:drawer',
          keepAlive: true,
          title: $t('examples.drawer.title'),
        },
      },
      {
        name: 'EllipsisExample',
        path: '/examples/ellipsis',
        component: () => import('#/views/examples/ellipsis/index.vue'),
        meta: {
          icon: 'ion:ellipsis-horizontal',
          title: $t('examples.ellipsis.title'),
        },
      },
      {
        name: 'VueResizeDemo',
        path: '/demos/resize/basic',
        component: () => import('#/views/examples/resize/basic.vue'),
        meta: {
          icon: 'material-symbols:resize',
          title: $t('examples.resize.title'),
        },
      },
      {
        name: 'ColPageDemo',
        path: '/examples/layout/col-page',
        component: () => import('#/views/examples/layout/col-page.vue'),
        meta: {
          badge: 'Alpha',
          badgeVariants: 'destructive',
          icon: 'material-symbols:horizontal-distribute',
          title: $t('examples.layout.col-page'),
        },
      },
      {
        name: 'TippyDemo',
        path: '/examples/tippy',
        component: () => import('#/views/examples/tippy/index.vue'),
        meta: {
          icon: 'mdi:message-settings-outline',
          title: 'Tippy',
        },
      },
      {
        name: 'JsonViewer',
        path: '/examples/json-viewer',
        component: () => import('#/views/examples/json-viewer/index.vue'),
        meta: {
          icon: 'tabler:json',
          title: 'JsonViewer',
        },
      },
      {
        name: 'Motion',
        path: '/examples/motion',
        component: () => import('#/views/examples/motion/index.vue'),
        meta: {
          icon: 'mdi:animation-play',
          title: 'Motion',
        },
      },
      {
        name: 'CountTo',
        path: '/examples/count-to',
        component: () => import('#/views/examples/count-to/index.vue'),
        meta: {
          icon: 'mdi:animation-play',
          title: 'CountTo',
        },
      },
      {
        name: 'Loading',
        path: '/examples/loading',
        component: () => import('#/views/examples/loading/index.vue'),
        meta: {
          icon: 'mdi:circle-double',
          title: 'Loading',
        },
      },
    ],
  },
];

export default routes;
