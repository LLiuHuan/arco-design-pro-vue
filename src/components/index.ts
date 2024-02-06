import { App } from 'vue';

import { ExceptionBase } from './Exception';

/**
 * @description Register global components - [注册全局组件]
 * @param app
 */
export function registerGlobComp(app: App) {
  // app.component('ExceptionBase', ExceptionBase);
  // app.component('BasicMenu', BasicMenu);
  app.use(ExceptionBase);
}
