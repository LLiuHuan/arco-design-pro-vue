/**
 * 动态 index.html 插件
 * 主要是把标题这些写到index.html里面
 */

import type { PluginOption } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

export const configHtmlPlugin = (viteEnv: ImportMetaEnv, isBuild: boolean): PluginOption[] => {
  return createHtmlPlugin({
    minify: isBuild,
    inject: {
      data: {
        appName: viteEnv.VITE_GLOB_APP_TITLE,
      },
    },
  });
};
