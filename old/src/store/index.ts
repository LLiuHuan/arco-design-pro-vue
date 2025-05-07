import type { App } from 'vue';
import { createPinia } from 'pinia';
import { resetSetupStore } from './plugin';
// import { registerPiniaPersistPlugin } from './plugin/persist';

const store = createPinia();

/** setup vue store plugin: pinia. - [安装vue状态管理插件：pinia] */
export function setupStore(app: App<Element>) {
  // registerPiniaPersistPlugin(store);

  store.use(resetSetupStore);

  app.use(store);
}

export { store };
