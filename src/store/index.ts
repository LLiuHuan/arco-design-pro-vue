import type { App } from 'vue';
import { createPinia } from 'pinia';
// 持久化存储
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

export function setupStore(app: App<Element>) {
  const store = createPinia();
  store.use(piniaPluginPersistedstate);
  app.use(store);
}

export * from './modules';
// export * from './subscribe';
