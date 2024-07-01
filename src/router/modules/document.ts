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
        icon: 'logos:vue',
        i18nKey: 'routes.document.vue3',
      },
    },
    {
      name: 'document_github',
      path: '/document/github',
      meta: {
        title: 'Github（外链）',
        icon: 'mdi:github',
        i18nKey: 'routes.document.github',
        href: 'https://github.com/LLiuHuan/arco-design-pro-vue',
      },
    },
  ],
  meta: {
    title: '文档',
    icon: 'solar:document-broken',
    order: 2,
    i18nKey: 'routes.document.title',
  },
};

export default document;
