import { genLocaleMessage } from '@/views';
import { LocaleEnum } from '@/enums';
import { genMessage } from './helper';

export default {
  system: {
    title: 'Arco Design Pro',
  },
  ...genMessage(LocaleEnum.en_US),
  ...genLocaleMessage(LocaleEnum.en_US),
};
