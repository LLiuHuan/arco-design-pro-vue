import { createApp } from 'vue';
import './style.css';
import { setupStore } from '@/store';
import { setupPlugin } from '@/plugins';
import App from './App.vue';

const setupApp = async () => {
  const app = createApp(App);

  // 进行一些初始化操作，比如：路由、状态管理、插件、指令等

  // 初始化插件
  setupPlugin(app);

  // 初始化vue状态管理：pinia
  setupStore(app);

  app.mount('#app');
};

setupApp()
  .then(() => {
    console.log('app init success');
  })
  .catch((err) => {
    console.log('app init fail', err);
  });
