const document: AuthRoute.Route = {
  name: 'document',
  path: '/document',
  component: 'basic',
  children: [
    {
      name: 'document_vue3',
      path: '/document/vue3',
      component: 'self',
      meta: {
        title: 'Vue3文档',
        ignoreAuth: true,
        icon: 'logos:vue',
        i18nTitle: 'routes.document.vue3',
      },
    },
    {
      name: 'document_github',
      path: '/document/github',
      meta: {
        title: 'Github（外链）',
        ignoreAuth: true,
        icon: 'mdi:github',
        i18nTitle: 'routes.document.github',
        href: 'https://github.com/LLiuHuan/arco-design-pro-vue',
      },
    },
  ],
  meta: {
    title: '文档',
    icon: 'solar:document-broken',
    order: 2,
    i18nTitle: 'routes.document.title',
  },
};

export default document;
