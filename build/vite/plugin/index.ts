import { PluginOption } from 'vite';
import unocss from '@unocss/vite';
import VueDevtools from 'vite-plugin-vue-devtools';
import progress from 'vite-plugin-progress';
import arco from './arco';
import vue from './vue';
import visualizer from './visualizer';

/**
 * vite插件
 * @param viteEnv - 环境变量配置
 */
export function createVitePlugins(
  viteEnv: ImportMetaEnv,
): (PluginOption | PluginOption[])[] {
  const plugins: (PluginOption | PluginOption[])[] = [
    ...vue, // vue基础插件
    unocss(), // unocss
    VueDevtools(), // 在开发环境下使用vue-devtools
    progress(), // 打包进度条
  ];

  plugins.push(...arco);

  // 开启打包文件大小结果分析
  if (viteEnv.VITE_VISUALIZER === 'Y') {
    plugins.push(visualizer as PluginOption);
  }

  return plugins;
}
