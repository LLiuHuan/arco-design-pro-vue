/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-08 09:45:22
 * @LastEditTime: 2025-05-22 15:47:18
 * @LastEditors: LLiuHuan
 */
import { createApp } from 'vue';

import '@arco/styles';
import '@arco/styles/ele';

import { ElLoading } from 'element-plus';

import App from './App.vue';
import { router } from './router';

async function bootstrap() {
  // console.log('namespace', namespace);
  const app = createApp(App);

  // 注册Element Plus提供的v-loading指令
  app.directive('loading', ElLoading.directive);

  // 配置路由及路由守卫
  app.use(router);

  app.mount('#app');
}

export { bootstrap };
