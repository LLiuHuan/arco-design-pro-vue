/* eslint-disable */
/* prettier-ignore */
// Generated by elegant-router
// Read more: https://github.com/soybeanjs/elegant-router

import type {GeneratedRoute} from '@elegant-router/types';

export const generatedRoutes: GeneratedRoute[] = [
  {
    name: '403',
    path: '/403',
    component: 'layout.blank$view.403',
    meta: {
      title: '403',
      i18nKey: 'route.403',
      constant: true,
      hideInMenu: true
    }
  },
  {
    name: '404',
    path: '/404',
    component: 'layout.blank$view.404',
    meta: {
      title: '404',
      i18nKey: 'route.404',
      constant: true,
      hideInMenu: true
    }
  },
  {
    name: '500',
    path: '/500',
    component: 'layout.blank$view.500',
    meta: {
      title: '500',
      i18nKey: 'route.500',
      constant: true,
      hideInMenu: true
    }
  },
  {
    name: 'about',
    path: '/about',
    component: 'layout.basic$view.about',
    meta: {
      title: 'about',
      icon: 'simple-icons:aboutdotme',
      i18nKey: 'route.about',
      order: 11
    }
  },
  {
    name: 'comp',
    path: '/comp',
    component: 'layout.basic',
    meta: {
      title: 'comp',
      icon: 'ci:main-component',
      i18nKey: 'route.comp',
      order: 7
    },
    children: [
      {
        name: 'comp_loading',
        path: '/comp/loading',
        component: 'view.comp_loading',
        meta: {
          title: 'comp_loading',
          i18nKey: 'route.comp_loading'
        }
      },
      {
        name: 'comp_table',
        path: '/comp/table',
        meta: {
          title: 'comp_table',
          i18nKey: 'route.comp_table'
        },
        children: [
          {
            name: 'comp_table_basic',
            path: '/comp/table/basic',
            component: 'view.comp_table_basic',
            meta: {
              title: 'comp_table_basic',
              i18nKey: 'route.comp_table_basic'
            }
          },
          {
            name: 'comp_table_use-table',
            path: '/comp/table/use-table',
            component: 'view.comp_table_use-table',
            meta: {
              title: 'comp_table_use-table',
              i18nKey: 'route.comp_table_use-table'
            }
          }
        ]
      }
    ]
  },
  {
    name: 'dashboard',
    path: '/dashboard',
    component: 'layout.basic',
    meta: {
      title: 'dashboard',
      icon: 'mdi:monitor-dashboard',
      i18nKey: 'route.dashboard',
      order: 1
    },
    children: [
      {
        name: 'dashboard_analysis',
        path: '/dashboard/analysis',
        component: 'view.dashboard_analysis',
        meta: {
          title: 'dashboard_analysis',
          icon: 'mdi:monitor-dashboard',
          i18nKey: 'route.dashboard_analysis'
        }
      },
      {
        name: 'dashboard_workbench',
        path: '/dashboard/workbench',
        component: 'view.dashboard_workbench',
        meta: {
          title: 'dashboard_workbench',
          icon: 'mdi:monitor-dashboard',
          i18nKey: 'route.dashboard_workbench'
        }
      }
    ]
  },
  {
    name: 'document',
    path: '/document',
    component: 'layout.basic',
    meta: {
      title: 'document',
      icon: 'solar:document-broken',
      i18nKey: 'route.document',
      order: 2
    },
    children: [
      {
        name: 'document_vue3',
        path: '/document/vue3',
        component: 'view.document_vue3',
        meta: {
          title: 'document_vue3',
          i18nKey: 'route.document_vue3'
        }
      }
    ]
  },
  {
    name: 'func',
    path: '/func',
    component: 'layout.basic',
    meta: {
      title: 'func',
      icon: 'ion:git-compare-outline',
      i18nKey: 'route.func',
      order: 3
    },
    children: [
      {
        name: 'func_error-log',
        path: '/func/error-log',
        component: 'view.func_error-log',
        meta: {
          title: 'func_error-log',
          i18nKey: 'route.func_error-log'
        }
      },
      {
        name: 'func_sub1',
        path: '/func/sub1',
        component: 'view.func_sub1',
        meta: {
          title: 'func_sub1',
          i18nKey: 'route.func_sub1'
        }
      },
      {
        name: 'func_upload-chunk',
        path: '/func/upload-chunk',
        component: 'view.func_upload-chunk',
        meta: {
          title: 'func_upload-chunk',
          i18nKey: 'route.func_upload-chunk'
        }
      }
    ]
  },
  {
    name: 'login',
    path: '/login',
    component: 'layout.auth',
    meta: {
      title: 'login',
      i18nKey: 'route.login',
      constant: true,
      hideInMenu: true
    },
    redirect: {
      name: 'login_pwd-login'
    },
    children: [
      {
        name: 'login_bind-github',
        path: '/login/bind-github',
        component: 'view.login_bind-github',
        meta: {
          title: 'login_bind-github',
          i18nKey: 'route.login_bind-github.title'
        }
      },
      {
        name: 'login_bind-wechat',
        path: '/login/bind-wechat',
        component: 'view.login_bind-wechat',
        meta: {
          title: 'login_bind-wechat',
          i18nKey: 'route.login_bind-wechat.title'
        }
      },
      {
        name: 'login_code-login',
        path: '/login/code-login',
        component: 'view.login_code-login',
        meta: {
          title: 'login_code-login',
          i18nKey: 'route.login_code-login.title'
        }
      },
      {
        name: 'login_forget-pwd',
        path: '/login/forget-pwd',
        component: 'view.login_forget-pwd',
        meta: {
          title: 'login_forget-pwd',
          i18nKey: 'route.login_forget-pwd.title'
        }
      },
      {
        name: 'login_pwd-login',
        path: '/login/pwd-login',
        component: 'view.login_pwd-login',
        meta: {
          title: 'login_pwd-login',
          i18nKey: 'route.login_pwd-login.title'
        }
      },
      {
        name: 'login_register',
        path: '/login/register',
        component: 'view.login_register',
        meta: {
          title: 'login_register',
          i18nKey: 'route.login_register.title'
        }
      },
      {
        name: 'login_reset-pwd',
        path: '/login/reset-pwd',
        component: 'view.login_reset-pwd',
        meta: {
          title: 'login_reset-pwd',
          i18nKey: 'route.login_reset-pwd.title'
        }
      }
    ],
    props: true
  },
  {
    name: 'permission',
    path: '/permission',
    component: 'layout.basic',
    meta: {
      title: 'permission',
      icon: 'fluent-mdl2:permissions',
      i18nKey: 'route.permission',
      order: 8
    },
    children: [
      {
        name: 'permission_front',
        path: '/permission/front',
        meta: {
          title: 'permission_front',
          i18nKey: 'route.permission_front'
        },
        children: [
          {
            name: 'permission_front_auth-page-a',
            path: '/permission/front/auth-page-a',
            component: 'view.permission_front_auth-page-a',
            meta: {
              title: 'permission_front_auth-page-a',
              i18nKey: 'route.permission_front_auth-page-a',
              roles: ['super']
            }
          },
          {
            name: 'permission_front_auth-page-b',
            path: '/permission/front/auth-page-b',
            component: 'view.permission_front_auth-page-b',
            meta: {
              title: 'permission_front_auth-page-b',
              i18nKey: 'route.permission_front_auth-page-b',
              roles: ['super', 'user']
            }
          },
          {
            name: 'permission_front_btn',
            path: '/permission/front/btn',
            component: 'view.permission_front_btn',
            meta: {
              title: 'permission_front_btn',
              i18nKey: 'route.permission_front_btn'
            }
          }
        ]
      }
    ]
  },
  {
    name: 'plugin',
    path: '/plugin',
    component: 'layout.basic',
    meta: {
      title: 'plugin',
      icon: 'bi:plugin',
      i18nKey: 'route.plugin',
      order: 4
    },
    children: [
      {
        name: 'plugin_charts',
        path: '/plugin/charts',
        meta: {
          title: 'plugin_charts',
          i18nKey: 'route.plugin_charts'
        },
        children: [
          {
            name: 'plugin_charts_echarts',
            path: '/plugin/charts/echarts',
            component: 'view.plugin_charts_echarts',
            meta: {
              title: 'plugin_charts_echarts',
              i18nKey: 'route.plugin_charts_echarts'
            }
          }
        ]
      }
    ]
  },
  {
    name: 'user-center',
    path: '/user-center',
    component: 'layout.basic$view.user-center',
    meta: {
      title: 'user-center',
      icon: 'solar:user-broken',
      i18nKey: 'route.user-center',
      order: 10
    }
  }
];
