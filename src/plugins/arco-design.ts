import type { App } from 'vue';
import ArcoVue from '@arco-design/web-vue';

export function setupArco(app: App) {
  app.use(ArcoVue);
}
