import type { App } from 'vue';
import setupAssets from '@/plugins/assets';
import { setupI18n } from '@/locale';

export const setupPlugin = async (app: App) => {
  // 初始化静态文件
  setupAssets();

  // 初始化国际化
  await setupI18n(app);
};
