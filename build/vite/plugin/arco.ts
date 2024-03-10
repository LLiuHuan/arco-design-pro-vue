/**
 * @description arco-design vite 插件
 */
import { vitePluginForArco } from '@arco-plugins/vite-vue';

export const configArcoPlugin = () => {
  return vitePluginForArco({
    style: 'css',
  });
};
