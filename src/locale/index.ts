import type { App } from 'vue';
import type { I18nOptions } from 'vue-i18n';
import { createI18n } from 'vue-i18n';
import { localeSetting } from '@/settings';
import { localStg } from '@/utils/cache';
import { LOCALE_KEY } from '@/enums';
import { LocaleType } from '~/types/config';
import { setHtmlPageLang, setLoadLocalePool } from './lang/helper';

const { fallback, availableLocales, locale: local } = localeSetting;

// eslint-disable-next-line import/no-mutable-exports
export let i18n: ReturnType<typeof createI18n>;

export async function getLocaleMessages(locale: LocaleType) {
  const defaultLocal = await import(`./lang/${locale}.ts`);
  return defaultLocal.default ?? {};
}

async function createI18nOptions(): Promise<I18nOptions> {
  const locale = localStg.get(LOCALE_KEY) ?? local;
  const message = await getLocaleMessages(locale);
  console.log(message);
  setHtmlPageLang(locale);
  setLoadLocalePool((loadLocalePool) => {
    loadLocalePool.push(locale);
  });

  return {
    legacy: false,
    locale,
    fallbackLocale: fallback,
    messages: {
      [locale]: message,
    },
    availableLocales,
    sync: true, // 如果您不想从全局范围继承语言环境，则需要将 i18n 组件选项的sync 设置为 false。
    silentTranslationWarn: true, // true - warning off
    missingWarn: false,
    silentFallbackWarn: true,
  };
}

// setup i18n instance with glob - [使用glob设置i18n实例]
export async function setupI18n(app: App) {
  const options = await createI18nOptions();
  i18n = createI18n(options);
  app.use(i18n);
}
