import { createApp } from 'vue';
import App from './App.vue';
import '@arco-design/web-vue/dist/arco.css';
import { setupRouter } from '@/router';
import { setupStore } from '@/store';
import { setupDirectives, setupPlugin } from '@/plugins';

const setupApp = async () => {
  const app = createApp(App);

  // 初始化插件
  setupPlugin(app);

  // 初始化自定义的vue指令
  setupDirectives(app);

  // 初始化vue状态管理：pinia
  setupStore(app);

  // 初始化路由
  await setupRouter(app);

  app.mount('#app');
};

setupApp()
  .then(() => {
    console.log('app init success');
  })
  .catch((err) => {
    console.log('app init fail', err);
  });
