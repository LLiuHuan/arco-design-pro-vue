const localeBase = {
  navbar: {
    docs: 'Docs',
  },
  menu: {
    lang: '英文',
    login: 'login',
    dashboard: {
      index: 'Dashboard',
      workplace: 'Workplace',
      monitor: 'Real-time Monitor',
    },
    errors: {
      index: 'Errors',
      403: '403',
      404: '404',
      500: '500',
    },
    about: {
      index: 'About',
    },
    components: {
      index: 'Plugins',
      markdown: 'Markdown',
      split: 'Split',
    },
    system: {
      index: 'System',
      menu: 'Menu',
      user: 'User',
      auth: 'Authority',
      api: 'Api',
    },
    state: {
      index: 'SystemState',
    },
  },
  messageBox: {
    tab: {
      title: {
        message: 'Message',
        notice: 'Notice',
        approve: 'Approve',
      },
    },
    allRead: 'All Read',
  },
  exception: {
    result: {
      403: {
        description: 'Access to this resource on the server is denied',
        back: 'Back',
      },
      404: {
        description: 'Whoops, this page is gone.',
        retry: 'Retry',
        back: 'Back',
      },
      500: {
        description: 'Internal server error',
        back: 'Back',
      },
    },
  },
};

export default {
  ...localeBase,
};
