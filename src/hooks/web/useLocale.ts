import type { LocaleType } from '~/types/config';
import { useLocaleStore } from '@/store/modules/locale';
import { getLocaleMessages, i18n } from '@/locale';
import { loadLocalePool, setHtmlPageLang } from '@/locale/lang/helper';
import { computed, unref } from 'vue';

function setI18nLanguage(locale: LocaleType) {
  const localeStore = useLocaleStore();

  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale;
  } else {
    (i18n.global.locale as any).value = locale;
  }
  localeStore.setLocaleInfo({ locale });
  setHtmlPageLang(locale);
}

export function useLocale() {
  const localeStore = useLocaleStore();
  // Get the current language - [获取当前语言]
  const getLocale = computed(() => localeStore.localeInfo.locale);
  // Get whether to display the language switch - [获取是否显示语言切换]
  const getShowLocalePicker = computed(
    () => !!localeStore.localeInfo.showPicker,
  );

  /**
   * @description Switching the language will change the locale of useI18n - [切换语言会改变useI18n的locale]
   * @description And submit to configuration modification - [并提交到配置修改]
   * @param locale
   */
  async function changeLocale(locale: LocaleType) {
    const globalI18n = i18n.global;
    const currentLocale = unref(globalI18n.locale);
    if (currentLocale === locale) {
      return locale;
    }

    if (loadLocalePool.includes(locale)) {
      setI18nLanguage(locale);
      return locale;
    }

    const message = await getLocaleMessages(locale);

    globalI18n.setLocaleMessage(locale, message);
    loadLocalePool.push(locale);

    setI18nLanguage(locale);
    return locale;
  }

  return {
    getLocale,
    getShowLocalePicker,
    changeLocale,
  };
}
