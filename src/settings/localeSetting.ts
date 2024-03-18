import type { LocaleSetting, LocaleType } from '~/types/config';
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';

export const LOCALE: { [key: string]: LocaleType } = {
  ZH_CN: 'zh-CN',
  EN_US: 'en-US',
};

export const localeSetting: LocaleSetting = {
  showPicker: true,
  // Locale
  locale: LOCALE.ZH_CN,
  // Default locale
  fallback: LOCALE.ZH_CN,
  // available Locales
  availableLocales: [LOCALE.ZH_CN, LOCALE.EN_US],

  arcoLocale: zhCN,
};
