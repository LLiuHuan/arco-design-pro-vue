/**
 * Vite 插件
 */

import { PluginOption } from 'vite';
import vue from './vue';
import { configHtmlPlugin } from './html';
import unplugin from './unplugin';
import { configUnocssPlugin } from './unocss';
import { configVisualizerPlugin } from './visualizer';
import { configCompressPlugin } from './compress';
import { configMockPlugin } from './mock';
import { configImageminPlugin } from './imagemin';

// import prismjs from './prismjs';

/**
 * vite插件
 * @param viteEnv - 环境变量配置
 * @param srcPath - src路径
 * @param isBuild
 */
export function createVitePlugins(
  viteEnv: ImportMetaEnv,
  srcPath: string,
  isBuild: boolean
): (PluginOption | PluginOption[])[] {
  const {
    VITE_USE_MOCK,
    VITE_BUILD_COMPRESS,
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE,
    VITE_USE_IMAGEMIN,
    VITE_VISUALIZER,
  } = viteEnv;

  const plugins: (PluginOption | PluginOption[])[] = [
    ...vue,
    ...unplugin(srcPath),
    // prismjs,
  ];

  // vite-plugin-unocss
  plugins.push(configUnocssPlugin());

  // vite-plugin-html
  plugins.push(configHtmlPlugin(viteEnv, isBuild));

  // rollup-plugin-visualizer
  plugins.push(configVisualizerPlugin(VITE_VISUALIZER));

  // vite-plugin-mock
  VITE_USE_MOCK && plugins.push(configMockPlugin(isBuild));

  if (isBuild) {
    // vite-plugin-imagemin
    VITE_USE_IMAGEMIN && plugins.push(configImageminPlugin());
    // rollup-plugin-gzip
    plugins.push(configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE));
  }

  return plugins;
}
