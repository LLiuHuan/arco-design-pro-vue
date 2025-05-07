import type { LocaleSetting } from '~/types/config';
import { LocaleEnum } from '@/enums';

export const localeSetting: LocaleSetting = {
  showPicker: true,
  // Locale
  locale: LocaleEnum.zh_CN,
  // Default locale
  fallback: LocaleEnum.zh_CN,
  // available Locales
  availableLocales: [LocaleEnum.zh_CN, LocaleEnum.en_US],
};
