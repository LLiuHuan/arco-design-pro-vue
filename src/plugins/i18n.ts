//注册i8n实例并引入语言文件
import { createI18n } from 'vue-i18n';
import { App } from 'vue';
import zh_CN from '@/locale/zh-CN';
import en_US from '@/locale/en-US';

const localeData = {
  legacy: false, // composition API
  locale: 'zh-CN',
  globalInjection: true,
  messages: {
    'zh-CN': zh_CN,
    'en-US': en_US,
  },
};

// setup i18n instance with glob
export function setupI18n(app: App) {
  const i18n = createI18n(localeData);
  app.use(i18n);
}
