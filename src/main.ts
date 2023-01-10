import { createApp } from 'vue';
import { setupDirectives, setupPlugin } from '@/plugins';
import { setupRouter } from '@/router';
import { setupStore } from '@/store';
import App from './App.vue';
import '@arco-design/web-vue/dist/arco.css';
import AppLoading from './components/common/AppLoading.vue';

const setupApp = async () => {
  const app = createApp(App);

  // app loading
  const appLoading = createApp(AppLoading);

  appLoading.mount('#appLoading');

  // 初始化插件
  setupPlugin(app);

  // 初始化自定义的vue指令
  setupDirectives(app);

  // 初始化vue状态管理：pinia
  setupStore(app);

  // 初始化路由
  await setupRouter(app);

  // 延迟挂载app 为了可以多看会加载动画
  setTimeout(() => {
    app.mount('#app');
  }, 2000);
};

setupApp()
  .then(() => {
    console.log('app init success');
  })
  .catch((err) => {
    console.log('app init fail', err);
  });
