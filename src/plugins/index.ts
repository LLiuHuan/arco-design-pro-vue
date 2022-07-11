import { App } from 'vue';
import { Modal } from '@arco-design/web-vue';
import { setupMarkDown } from '@/plugins/v-md-editor';
import { setupArcoIcon } from '@/plugins/arco-design-icon';
// import { setupPermission } from '@/plugins/permission';
import { setupI18n } from '@/plugins/i18n';
import setupAssets from '@/plugins/assets';
// import { setupTheme } from '@/plugins/theme';
// import { setupArco } from './plugins/arco-design';

export const setupPlugin = (app: App) => {
  // 初始化国际化
  setupI18n(app);

  // 初始化静态文件
  setupAssets();

  // 初始化arco
  // setupArco(app);
  setupArcoIcon(app);

  // 初始化Markdown编辑器
  setupMarkDown(app);
  // setupTheme();

  // 挂载ArcoModal
  // eslint-disable-next-line no-underscore-dangle
  Modal._context = app._context;
};

export const setupDirectives = (app: App) => {
  // setupPermission(app);
  console.log(app);
};
