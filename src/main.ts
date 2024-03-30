import { createApp } from 'vue';
// import './style.css';
import { setupStore } from '@/store';
import { setupPlugin } from '@/plugins';
import { setupRouter } from '@/router';
import { consoleLog } from '@/utils/common';
import { initProjectSetting } from '@/settings/initProjectSetting';
import App from './App.vue';

const setupApp = async () => {
  const app = createApp(App);

  // 进行一些初始化操作，比如：路由、状态管理、插件、指令等
  // 初始化vue状态管理：pinia
  setupStore(app);
  // 初始化插件
  await setupPlugin(app);

  // Initialize internal system configuration - [初始化项目配置]
  initProjectSetting();

  await setupRouter(app);

  app.mount('#app');
};

setupApp()
  .then(() => {
    consoleLog('app init success');
  })
  .catch((err) => {
    consoleLog('app init fail', err);
  });
