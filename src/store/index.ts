import type { App } from 'vue';
import { createPinia } from 'pinia';

export function setupStore(app: App<Element>) {
  const store = createPinia();
  app.use(store);
}

export * from './modules';
// export * from './subscribe';
