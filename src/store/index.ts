import type { App } from 'vue';
import { createPinia } from 'pinia';
// import { registerPiniaPersistPlugin } from './plugin/persist';

/** setup vue store plugin: pinia. - [安装vue状态管理插件：pinia] */
export function setupStore(app: App<Element>) {
  const store = createPinia();
  // registerPiniaPersistPlugin(store);
  app.use(store);
}

// export { store };

// 将所有的modules导出
export * from './modules';
export * from './subscribe';
