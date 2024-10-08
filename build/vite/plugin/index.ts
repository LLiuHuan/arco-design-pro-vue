import { PluginOption } from 'vite';

import { setupHtmlPlugin } from './appBuildTime';
import { configElegantRouterPlugin } from './elegant-router';
import { configProgressPlugin } from './progress';
import { configHtmlPlugin } from './html';
import { configArcoPlugin } from './arco';
import { configVuePlugin } from './vue';
import { configVisualizerPlugin } from './visualizer';
import { configCompressPlugin } from './compress';
import { configPWAPlugin } from './pwa';
// import { configImageminPlugin } from './imagemin';
import { configUnocssPlugin } from './unocss';
import { configSvgIconsPlugin } from './svgIcons';
import { createAppConfigPlugin } from './appConfig';

/**
 * vite插件
 * @param viteEnv - 环境变量配置
 * @param isBuild
 */
export function createVitePlugins(
  viteEnv: ImportMetaEnv,
  isBuild: boolean,
  buildTime: string,
): (PluginOption | PluginOption[])[] {
  const plugins: (PluginOption | PluginOption[])[] = [
    ...configVuePlugin(), // vue基础插件
    configElegantRouterPlugin(), // elegant-router
    configUnocssPlugin(), // unocss
    configProgressPlugin(), // 打包进度条
    configSvgIconsPlugin(viteEnv), // svg图标
  ];
  plugins.push(createAppConfigPlugin({ isBuild }));

  // 添加ArcoDesign插件
  // @arco-plugins/vite-vue
  plugins.push(configArcoPlugin());

  // 添加动态index.html插件
  // vite-plugin-html
  plugins.push(configHtmlPlugin(viteEnv, isBuild));

  // 开启打包文件大小结果分析
  if (viteEnv.VITE_VISUALIZER === 'Y') {
    // rollup-plugin-visualizer
    plugins.push(configVisualizerPlugin());
  }

  // 开启打包压缩
  if (viteEnv.VITE_COMPRESS === 'Y') {
    // vite-plugin-compression
    plugins.push(configCompressPlugin(viteEnv));
  }

  // // 开启图片压缩
  // if (viteEnv.VITE_IMAGEMIN === 'Y') {
  //   // vite-plugin-imagemin
  //   plugins.push(configImageminPlugin());
  // }

  // 开启PWA
  if (viteEnv.VITE_PWA === 'Y' || viteEnv.VITE_VERCEL === 'Y') {
    // vite-plugin-pwa
    plugins.push(configPWAPlugin(viteEnv));
  }

  plugins.push(setupHtmlPlugin(buildTime));

  return plugins;
}
