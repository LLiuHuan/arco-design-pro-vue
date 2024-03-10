/**
 * @description 打包进度条 vite 插件
 */

import progress from 'vite-plugin-progress';

export const configProgressPlugin = () => {
  return progress();
};
