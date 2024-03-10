/**
 * @description devtools vite 插件
 */

import VueDevtools from 'vite-plugin-vue-devtools';

export const configDevtoolsPlugin = () => {
  return VueDevtools();
};
