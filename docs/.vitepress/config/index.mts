/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-06-22 23:48:51
 * @LastEditTime: 2025-06-22 23:50:38
 * @LastEditors: LLiuHuan
 */
import { withPwa } from '@vite-pwa/vitepress';
import { defineConfigWithTheme } from 'vitepress';

export default withPwa(
  defineConfigWithTheme({
    locales: {
      en: {
        label: 'English',
        lang: 'en',
        link: '/en/',
      },
      root: {
        label: '简体中文',
        lang: 'zh-CN',
        link: '/',
      },
    },
  }),
);
