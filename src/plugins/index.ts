import type { App } from 'vue';
import setupAssets from '@/plugins/assets';

export const setupPlugin = (app: App) => {
  // 初始化静态文件
  setupAssets();
  console.log(app);
};
