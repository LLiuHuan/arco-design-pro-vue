export default {
  header: {
    tooltipEntryFull: '全屏',
    tooltipExitFull: '退出全屏',

    switchLanguage: '切换语言',

    themeLight: '点击切换亮色主题',
    themeDark: '点击切换暗色主题',
    themeSystem: '点击切换跟随系统',

    setting: '主题设置',

    search: '搜索',

    tooltipLock: '锁定屏幕',
    lockScreenPassword: '锁屏密码',
    lockScreen: '锁定屏幕',
    lockPlaceholder: '请输入锁屏密码',

    logOut: '退出系统',
    logOutMessage: '是否确认退出系统？',
    userCenter: '个人中心',

    tooltipNotify: '消息通知',
    msgTabMessage: '消息',
    msgTabNotice: '通知',
    msgTabBtn: '清空',
    msgTabTodo: '待办',
    msgAllRead: '全部已读',
    msgViewMore: '查看更多',
    msgNoContent: '暂无消息',
  },
  multipleTab: {
    reload: '重新加载',
    close: '关闭标签页',
    closeLeft: '关闭左侧标签页',
    closeRight: '关闭右侧标签页',
    closeOther: '关闭其它标签页',
    closeAll: '关闭全部标签页',
  },
  setting: {
    drawerTitle: '项目配置',
    drawerDesc: '自定义项目配置 & 实时预览',

    copyBtn: '拷贝',
    resetBtn: '重置',
    clearBtn: '清空缓存并返回登录页',

    copySettingMsg:
      '复制成功，请到 src/settings/projectSetting.json 中修改配置！',

    exterior: {
      title: '外观',

      schema: {
        title: '主题模式',
        light: '亮色模式',
        dark: '暗黑模式',
        system: '跟随系统',
        darkMenu: '深色侧边栏',
      },

      color: {
        title: '主题颜色',
        arcoblue: '主色',
        primary: '主色',
        green: '成功色',
        orange: '警告色',
        red: '错误色',
      },

      other: {
        title: '其他',
        grayMode: '灰色模式',
        colorWeak: '色弱模式',
      },
    },
    layout: {
      title: '布局',

      mode: {
        title: '布局模式',
        menuTypeSidebar: '侧边菜单',
        menuTypeMixSidebar: '混合侧边菜单',
        menuTypeTopMenu: '顶部菜单',
        menuTypeMixTopMenu: '混合顶部菜单',
      },

      sider: {
        title: '侧边栏',

        triggerHover: '悬停',
        triggerClick: '点击',
        menuCollapse: '折叠菜单',
        mixSidebarFixed: '固定展开菜单',
        menuAccordion: '侧边菜单手风琴模式',
        mixSidebarTrigger: '混合菜单触发方式',
        menuCollapseButton: '菜单折叠按钮',
        expandedMenuWidth: '菜单展开宽度',
        collapsedMenuWidth: '菜单折叠宽度',
        mixExpandMenuWidth: '混合菜单展开宽度',
        mixCollapsedMenuWidth: '混合菜单折叠宽度',
        mixChildMenuWidth: '混合菜单折叠子菜单',

        menuTriggerNone: '不显示',
        menuTriggerBottom: '底部',
        menuTriggerTop: '顶部',
      },

      breadcrumb: {
        title: '面包屑导航',
        headerBreadcrumb: '面包屑',
        headerBreadcrumbIcon: '面包屑图标',
      },

      header: {
        title: '页头',

        height: '页头高度',
        fixed: '固定页头和标签',
      },

      footer: {
        title: '页脚',

        height: '页脚高度',
        fixed: '固定页脚',
        show: '显示页脚',
      },

      tabs: {
        title: '标签页',

        show: '显示标签页',
        showQuick: '显示快捷按钮',
        showRedo: '显示刷新按钮',
        showFold: '显示折叠按钮',
      },

      copyright: {
        title: '版权/备案信息',

        show: '启用版权/备案',
        record: '备案号',
        recordLink: '备案链接',
        policeRecord: '公安备案号',
        policeRecordLink: '公安备案链接',
        company: '公司名称',
        companyLink: '公司链接',
      },

      other: {
        title: '其他',

        showLogo: 'Logo',

        scrollMode: {
          title: '滚动模式',
          wrapper: '外层滚动',
          content: '主体滚动',
        },
      },
    },
    universal: {
      title: '通用',
      setting: {
        title: '通用设置',
        watermark: '水印',
        watermarkText: '水印文本',
      },

      animation: {
        title: '动画',
        transitionEnable: '切换动画',
        transitionLoading: '切换loading',
        transitionNGprogress: '顶部进度条',

        routerAnimation: '路由动画',
        routerAnimationZoomFade: '渐变',
        routerAnimationZoomOut: '闪现',
        routerAnimationFadeSlide: '滑动',
        routerAnimationFade: '消退',
        routerAnimationFadeBottom: '底部消退',
        routerAnimationFadeScale: '缩放消退',
      },
    },
  },

  themeStore: {
    title: '主题商店',
    currentTheme: '当前主题',
    restoreThemeDefault: '恢复默认主题',
  },
};
