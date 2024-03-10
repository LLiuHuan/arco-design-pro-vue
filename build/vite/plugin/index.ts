import { PluginOption } from 'vite';
import unocss from '@unocss/vite';
import VueDevtools from 'vite-plugin-vue-devtools';
import arco from './arco';
import vue from './vue';

/**
 * vite插件
 * @param viteEnv - 环境变量配置
 */
export function createVitePlugins(
  viteEnv: ImportMetaEnv,
): (PluginOption | PluginOption[])[] {
  const plugins: (PluginOption | PluginOption[])[] = [
    ...vue,
    unocss(),
    VueDevtools(),
  ];

  plugins.push(...arco);

  return plugins;
}
