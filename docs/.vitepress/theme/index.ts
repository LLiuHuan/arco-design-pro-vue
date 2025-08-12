/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-06-20 23:35:14
 * @LastEditTime: 2025-08-12 15:20:33
 * @LastEditors: LLiuHuan
 */
import type { Theme } from 'vitepress';

// https://vitepress.dev/guide/custom-theme
import { h } from 'vue';

import DefaultTheme from 'vitepress/theme';

// import SiteLayout from './components/site-layout.vue';
import './styles';

// import 'virtual:group-icons.css';
import '@nolebase/vitepress-plugin-git-changelog/client/style.css';

export default {
  extends: DefaultTheme,
  // layout: SiteLayout,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  // enhanceApp({ app, router, siteData }) {
  //   // ...
  // },
} satisfies Theme;
