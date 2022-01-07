const localeBase = {
  navbar: {
    docs: '文档中心',
  },
  menu: {
    lang: '中文',
    login: '登陆',
    dashboard: {
      index: '仪表台',
      workplace: '工作台',
      monitor: '实时监控',
    },
    errors: {
      index: '异常页',
      403: '403',
      404: '404',
      500: '500',
    },
    about: {
      index: '关于',
    },
    components: {
      index: '组件',
      markdown: 'Markdown',
      split: '分割面板',
    },
    system: {
      index: '系统管理',
      menu: '菜单管理',
      user: '用户管理',
      auth: '角色管理',
    },
    state: {
      index: '服务器状态',
    },
  },
  messageBox: {
    tab: {
      title: {
        message: '消息',
        notice: '通知',
        approve: '审批',
      },
    },
    allRead: '全部已读',
  },
  exception: {
    result: {
      403: {
        description: '对不起，您没有访问该资源的权限',
        back: '返回',
      },
      404: {
        description: '抱歉，页面不见了～',
        retry: '重试',
        back: '返回',
      },
      500: {
        description: '抱歉，服务器出了点问题～',
        back: '返回',
      },
    },
  },
};

export default {
  ...localeBase,
};
