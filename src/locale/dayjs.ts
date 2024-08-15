import { locale } from 'dayjs';
import { LocaleType } from '~/types/config';
import { localStg } from '@/utils/cache';
import { LOCALE_KEY, LocaleEnum } from '@/enums';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';

export const setDayjsLocale = (lang: LocaleType) => {
  const localMap = {
    [LocaleEnum.zh_CN]: 'zh-cn',
    [LocaleEnum.en_US]: 'en',
  } satisfies Record<LocaleType, string>;

  const l = lang || localStg.get(LOCALE_KEY) || 'zh-CN';
  locale(localMap[l]);
};
