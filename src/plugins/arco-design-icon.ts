import type { App } from 'vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';

export function setupArcoIcon(app: App) {
  app.use(ArcoVueIcon);
}
