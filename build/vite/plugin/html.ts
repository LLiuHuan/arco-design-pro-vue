/**
 * @description 动态 index.html 插件
 * 主要是把标题这些写到index.html里面
 */

import type { PluginOption } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import { GLOB_CONFIG_FILE_NAME } from '../../constant';
import pkg from '../../../package.json';

export const configHtmlPlugin = (viteEnv: ImportMetaEnv): PluginOption[] => {
  const { VITE_BASE_URL, VITE_GLOB_APP_TITLE } = viteEnv;

  const path = VITE_BASE_URL.endsWith('/')
    ? VITE_BASE_URL
    : `${VITE_BASE_URL}/`;

  const getAppConfigSrc = () => {
    return `${path || '/'}${GLOB_CONFIG_FILE_NAME}?v=${pkg.version}-${new Date().getTime()}`;
  };

  return createHtmlPlugin({
    minify: true,
    inject: {
      // Inject data into ejs template - [将数据注入ejs模板]
      data: {
        appName: VITE_GLOB_APP_TITLE,
      },
      // Embed the generated app.config.js file - [嵌入生成的app.config.js文件]
      tags: [
        {
          tag: 'script',
          attrs: {
            src: getAppConfigSrc(),
          },
        },
      ],
    },
  });
};
