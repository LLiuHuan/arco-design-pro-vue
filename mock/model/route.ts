export const routeModel: Record<Auth.RoleType, AuthRoute.Route[]> = {
  super: [
    {
      name: 'dashboard',
      path: '/dashboard',
      component: 'basic',
      children: [
        {
          name: 'dashboard_analysis',
          path: '/dashboard/analysis',
          component: 'self',
          meta: {
            title: '分析页',
            requiresAuth: true,
            affix: true,
            // icon: 'icon-park-outline:analysis',
          },
        },
        {
          name: 'dashboard_workbench',
          path: '/dashboard/workbench',
          component: 'self',
          meta: {
            title: '工作台',
            requiresAuth: true,
            // icon: 'icon-park-outline:workbench',
          },
        },
      ],
      meta: {
        title: '仪表盘',
        icon: 'ant-design:dashboard-outlined',
        order: 1,
      },
    },
    {
      name: 'document',
      path: '/document',
      component: 'basic',
      children: [
        {
          name: 'document_vue',
          path: '/document/vue',
          component: 'self',
          meta: {
            title: 'vue文档',
            requiresAuth: true,
            // icon: 'mdi:vuejs',
          },
        },
        {
          name: 'document_vue-new',
          path: '/document/vue-new',
          component: 'self',
          meta: {
            title: 'vue文档(新版)',
            requiresAuth: true,
            // icon: 'mdi:vuejs',
          },
        },
        {
          name: 'document_vite',
          path: '/document/vite',
          component: 'self',
          meta: {
            title: 'vite文档',
            requiresAuth: true,
            // icon: 'simple-icons:vite',
          },
        },
        {
          name: 'document_baidu',
          path: '/document/baidu',
          meta: {
            title: '百度(外链)',
            requiresAuth: true,
            // icon: 'mdi:file-link-outline',
            href: 'https://www.baidu.com/',
          },
        },
      ],
      meta: {
        title: '文档',
        icon: 'icon-file',
        order: 2,
      },
    },
    {
      name: 'component',
      path: '/component',
      component: 'basic',
      children: [
        {
          name: 'component_button',
          path: '/component/button',
          component: 'self',
          meta: {
            title: '按钮',
            requiresAuth: true,
            // icon: 'ic:baseline-radio-button-checked',
          },
        },
        {
          name: 'component_card',
          path: '/component/card',
          component: 'self',
          meta: {
            title: '卡片',
            requiresAuth: true,
            // icon: 'mdi:card-outline',
          },
        },
        {
          name: 'component_table',
          path: '/component/table',
          component: 'self',
          meta: {
            title: '表格',
            requiresAuth: true,
            // icon: 'mdi:table-large',
          },
        },
        {
          name: 'component_form',
          path: '/component/form',
          component: 'self',
          meta: {
            title: '表单',
            requiresAuth: true,
            // icon: 'mdi:table-large',
          },
        },
      ],
      meta: {
        title: '组件示例',
        icon: 'icon-experiment',
        order: 3,
      },
    },
    {
      name: 'plugin',
      path: '/plugin',
      component: 'basic',
      children: [
        {
          name: 'plugin_charts',
          path: '/plugin/charts',
          component: 'multi',
          children: [
            {
              name: 'plugin_charts_echarts',
              path: '/plugin/charts/echarts',
              component: 'self',
              meta: {
                title: 'ECharts',
                requiresAuth: true,
                // icon: 'simple-icons:apacheecharts',
              },
            },
            {
              name: 'plugin_charts_d3',
              path: '/plugin/charts/d3',
              component: 'self',
              meta: {
                title: 'D3',
                requiresAuth: true,
                // icon: 'simple-icons:d3dotjs',
              },
            },
          ],
          meta: {
            title: '图表',
            // icon: 'material-symbols:bar-chart-rounded',
          },
        },
        {
          name: 'plugin_map',
          path: '/plugin/map',
          component: 'self',
          meta: {
            title: '地图',
            requiresAuth: true,
            // icon: 'mdi:map',
          },
        },
        {
          name: 'plugin_video',
          path: '/plugin/video',
          component: 'self',
          meta: {
            title: '视频',
            requiresAuth: true,
            // icon: 'mdi:video',
          },
        },
        {
          name: 'plugin_editor',
          path: '/plugin/editor',
          component: 'multi',
          children: [
            {
              name: 'plugin_editor_quill',
              path: '/plugin/editor/quill',
              component: 'self',
              meta: {
                title: '富文本编辑器',
                requiresAuth: true,
                // icon: 'mdi:file-document-edit-outline',
              },
            },
            {
              name: 'plugin_editor_markdown',
              path: '/plugin/editor/markdown',
              component: 'self',
              meta: {
                title: 'markdown编辑器',
                requiresAuth: true,
                // icon: 'ri:markdown-line',
              },
            },
          ],
          meta: {
            title: '编辑器',
            // icon: 'icon-park-outline:editor',
          },
        },
        {
          name: 'plugin_swiper',
          path: '/plugin/swiper',
          component: 'self',
          meta: {
            title: 'Swiper插件',
            requiresAuth: true,
            // icon: 'simple-icons:swiper',
          },
        },
        {
          name: 'plugin_copy',
          path: '/plugin/copy',
          component: 'self',
          meta: {
            title: '剪贴板',
            requiresAuth: true,
            // icon: 'mdi:clipboard-outline',
          },
        },
        {
          name: 'plugin_icon',
          path: '/plugin/icon',
          component: 'self',
          meta: {
            title: '图标',
            requiresAuth: true,
            // customIcon: 'custom-icon',
          },
        },
        {
          name: 'plugin_print',
          path: '/plugin/print',
          component: 'self',
          meta: {
            title: '打印',
            requiresAuth: true,
            // icon: 'ic:baseline-local-printshop',
          },
        },
      ],
      meta: {
        title: '插件示例',
        icon: 'bi:plugin',
        order: 4,
      },
    },
    {
      name: 'function',
      path: '/function',
      component: 'basic',
      children: [
        {
          name: 'function_tab',
          path: '/function/tab',
          component: 'self',
          meta: {
            title: 'Tab',
            requiresAuth: true,
            // icon: 'ic:round-tab',
          },
        },
        {
          name: 'function_tab-detail',
          path: '/function/tab-detail',
          component: 'self',
          meta: {
            title: 'Tab Detail',
            requiresAuth: true,
            hide: true,
            activeMenu: 'function_tab',
            // icon: 'ic:round-tab',
          },
        },
        {
          name: 'function_tab-multi-detail',
          path: '/function/tab-multi-detail',
          component: 'self',
          meta: {
            title: 'Tab Multi Detail',
            requiresAuth: true,
            hide: true,
            multiTab: true,
            activeMenu: 'function_tab',
            // icon: 'ic:round-tab',
          },
        },
      ],
      meta: {
        title: '功能',
        icon: 'icon-apps',
        order: 6,
      },
    },
    {
      name: 'exception',
      path: '/exception',
      component: 'basic',
      children: [
        {
          name: 'exception_403',
          path: '/exception/403',
          component: 'self',
          meta: {
            title: '异常页403',
            requiresAuth: true,
            // icon: 'ic:baseline-block',
          },
        },
        {
          name: 'exception_404',
          path: '/exception/404',
          component: 'self',
          meta: {
            title: '异常页404',
            requiresAuth: true,
            // icon: 'ic:baseline-web-asset-off',
          },
        },
        {
          name: 'exception_500',
          path: '/exception/500',
          component: 'self',
          meta: {
            title: '异常页500',
            requiresAuth: true,
            // icon: 'ic:baseline-wifi-off',
          },
        },
      ],
      meta: {
        title: '异常页',
        icon: 'icon-bug',
        order: 6,
      },
    },
    {
      name: 'about',
      path: '/about',
      component: 'self',
      meta: {
        title: '关于',
        requiresAuth: true,
        singleLayout: 'basic',
        icon: 'fluent:book-information-24-regular',
        // customIcon: 'copy',
        order: 8,
      },
    },
  ],
  admin: [
    {
      name: 'dashboard',
      path: '/dashboard',
      component: 'basic',
      children: [
        {
          name: 'dashboard_analysis',
          path: '/dashboard/analysis',
          component: 'self',
          meta: {
            title: '分析页',
            requiresAuth: true,
            // icon: 'icon-park-outline:analysis',
          },
        },
        {
          name: 'dashboard_workbench',
          path: '/dashboard/workbench',
          component: 'self',
          meta: {
            title: '工作台',
            requiresAuth: true,
            // icon: 'icon-park-outline:workbench',
          },
        },
      ],
      meta: {
        title: '仪表盘',
        // icon: 'carbon:dashboard',
        order: 1,
      },
    },
    {
      name: 'document',
      path: '/document',
      component: 'basic',
      children: [
        {
          name: 'document_vue',
          path: '/document/vue',
          component: 'self',
          meta: {
            title: 'vue文档',
            requiresAuth: true,
            // icon: 'mdi:vuejs',
          },
        },
        {
          name: 'document_vue-new',
          path: '/document/vue-new',
          component: 'self',
          meta: {
            title: 'vue文档(新版)',
            requiresAuth: true,
            // icon: 'mdi:vuejs',
          },
        },
        {
          name: 'document_vite',
          path: '/document/vite',
          component: 'self',
          meta: {
            title: 'vite文档',
            requiresAuth: true,
            // icon: 'simple-icons:vite',
          },
        },
        {
          name: 'document_baidu',
          path: '/document/baidu',
          meta: {
            title: '百度(外链)',
            requiresAuth: true,
            // icon: 'mdi:file-link-outline',
            href: 'https://www.baidu.com/',
          },
        },
      ],
      meta: {
        title: '文档',
        // icon: 'carbon:document',
        order: 2,
      },
    },
    {
      name: 'component',
      path: '/component',
      component: 'basic',
      children: [
        {
          name: 'component_button',
          path: '/component/button',
          component: 'self',
          meta: {
            title: '按钮',
            requiresAuth: true,
            // icon: 'ic:baseline-radio-button-checked',
          },
        },
        {
          name: 'component_card',
          path: '/component/card',
          component: 'self',
          meta: {
            title: '卡片',
            requiresAuth: true,
            // icon: 'mdi:card-outline',
          },
        },
        {
          name: 'component_table',
          path: '/component/table',
          component: 'self',
          meta: {
            title: '表格',
            requiresAuth: true,
            // icon: 'mdi:table-large',
          },
        },
      ],
      meta: {
        title: '组件示例',
        // icon: 'fluent:app-store-24-regular',
        order: 3,
      },
    },
    {
      name: 'exception',
      path: '/exception',
      component: 'basic',
      children: [
        {
          name: 'exception_403',
          path: '/exception/403',
          component: 'self',
          meta: {
            title: '异常页403',
            requiresAuth: true,
            // icon: 'ic:baseline-block',
          },
        },
        {
          name: 'exception_404',
          path: '/exception/404',
          component: 'self',
          meta: {
            title: '异常页404',
            requiresAuth: true,
            // icon: 'ic:baseline-web-asset-off',
          },
        },
        {
          name: 'exception_500',
          path: '/exception/500',
          component: 'self',
          meta: {
            title: '异常页500',
            requiresAuth: true,
            // icon: 'ic:baseline-wifi-off',
          },
        },
      ],
      meta: {
        title: '异常页',
        // icon: 'ant-design:exception-outlined',
        order: 6,
      },
    },
    {
      name: 'about',
      path: '/about',
      component: 'self',
      meta: {
        title: '关于',
        requiresAuth: true,
        singleLayout: 'basic',
        // icon: 'fluent:book-information-24-regular',
        order: 8,
      },
    },
  ],
  user: [
    {
      name: 'dashboard',
      path: '/dashboard',
      component: 'basic',
      children: [
        {
          name: 'dashboard_analysis',
          path: '/dashboard/analysis',
          component: 'self',
          meta: {
            title: '分析页',
            requiresAuth: true,
            // icon: 'icon-park-outline:analysis',
          },
        },
      ],
      meta: {
        title: '仪表盘',
        // icon: 'carbon:dashboard',
        order: 1,
      },
    },
    {
      name: 'auth-demo',
      path: '/auth-demo',
      component: 'basic',
      children: [
        {
          name: 'auth-demo_permission',
          path: '/auth-demo/permission',
          component: 'self',
          meta: {
            title: '权限切换',
            requiresAuth: true,
            // icon: 'ic:round-construction',
          },
        },
      ],
      meta: {
        title: '权限示例',
        // icon: 'ic:baseline-security',
        order: 5,
      },
    },
    {
      name: 'multi-menu',
      path: '/multi-menu',
      component: 'basic',
      children: [
        {
          name: 'multi-menu_first',
          path: '/multi-menu/first',
          component: 'multi',
          children: [
            {
              name: 'multi-menu_first_second',
              path: '/multi-menu/first/second',
              component: 'self',
              meta: {
                title: '二级菜单',
                requiresAuth: true,
                // icon: 'ic:outline-menu',
              },
            },
            {
              name: 'multi-menu_first_second-new',
              path: '/multi-menu/first/second-new',
              component: 'multi',
              children: [
                {
                  name: 'multi-menu_first_second-new_third',
                  path: '/multi-menu/first/second-new/third',
                  component: 'self',
                  meta: {
                    title: '三级菜单',
                    requiresAuth: true,
                    // icon: 'ic:outline-menu',
                  },
                },
              ],
              meta: {
                title: '二级菜单(有子菜单)',
                // icon: 'ic:outline-menu',
              },
            },
          ],
          meta: {
            title: '一级菜单',
            // icon: 'ic:outline-menu',
          },
        },
      ],
      meta: {
        title: '多级菜单',
        // icon: 'carbon:menu',
        order: 7,
      },
    },
    {
      name: 'about',
      path: '/about',
      component: 'self',
      meta: {
        title: '关于',
        requiresAuth: true,
        singleLayout: 'basic',
        // icon: 'fluent:book-information-24-regular',
        order: 8,
      },
    },
  ],
};
