import type { App } from 'vue';

import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';

export function setupArco(app: App) {
  app.use(ArcoVue);
  app.use(ArcoVueIcon);
}
