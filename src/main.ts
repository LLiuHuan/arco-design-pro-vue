/*
 * @Description:liuhuan
 * @Author: LLiuHuan
 * @Date: 2024-05-13 22:31:00
 * @LastEditTime: 2024-07-19 10:48:16
 * @LastEditors: LLiuHuan
 */
import { createApp } from 'vue';
// import './style.css';
import { setupStore } from '@/store';
import { setupPlugin } from '@/plugins';
import { setupRouter } from '@/router';
import { initProjectSetting } from '@/settings/initProjectSetting';
import { setupGlobDirectives } from '@/directives';
import { AppLoading } from '@/components/AppLoading';
import { setupErrorHandle } from '@/logics/error-handle';
import { consoleLog } from '@/utils/common';
import { setupRouterGuard } from '@/router/guard';
import App from './App.vue';

const setupApp = async () => {
  const app = createApp(App);
  const appLoading = createApp(AppLoading);
  appLoading.mount('#appLoading');

  // 进行一些初始化操作，比如：路由、状态管理、插件、指令等
  // 初始化vue状态管理：pinia
  setupStore(app);

  // 初始化插件
  await setupPlugin(app);

  // Initialize internal system configuration - [初始化项目配置]
  initProjectSetting();

  const router = await setupRouter(app);

  await setupRouterGuard(router);

  // 注册全局指令
  setupGlobDirectives(app);

  // 配置全局错误处理
  setupErrorHandle(app);

  // 延迟挂载app 为了可以多看会加载动画
  // setTimeout(() => {
  app.mount('#app');
  // }, 500);
};

setupApp()
  .then(() => {
    consoleLog('app init success');
  })
  .catch((err) => {
    consoleLog('app init fail', err);
  });
