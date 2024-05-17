import { locale } from 'dayjs';
import { LocaleType } from '~/types/config';
import { localStg } from '@/utils/cache';
import { LOCALE_KEY } from '@/enums';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';

export const setDayjsLocale = (lang: LocaleType) => {
  const localMap = {
    'zh-CN': 'zh-cn',
    'en-US': 'en',
  } satisfies Record<LocaleType, string>;

  const l = lang || localStg.get(LOCALE_KEY)?.locale || 'zh-CN';
  locale(localMap[l]);
};
