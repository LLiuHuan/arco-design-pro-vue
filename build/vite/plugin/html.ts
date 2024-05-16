/**
 * @description 动态 index.html 插件
 * 主要是把标题这些写到index.html里面
 */

import type { PluginOption } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';

export const configHtmlPlugin = (
  viteEnv: ImportMetaEnv,
  isBuild: boolean,
): PluginOption[] => {
  const { VITE_GLOB_APP_TITLE } = viteEnv;

  return createHtmlPlugin({
    minify: isBuild,
    inject: {
      // Inject data into ejs template - [将数据注入ejs模板]
      data: {
        appName: VITE_GLOB_APP_TITLE,
      },
    },
  });
};
