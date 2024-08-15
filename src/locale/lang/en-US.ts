import { genLocaleMessage } from '@/views';
import { LocaleEnum } from '@/enums';
import { genMessage } from './helper';

const modules = import.meta.glob('./en-US/**/*.{json,ts,js}', { eager: true });

export default {
  system: {
    title: 'Arco Design Pro',
  },
  ...genMessage(modules as Recordable<Recordable>, LocaleEnum.en_US),
  ...genLocaleMessage(LocaleEnum.en_US),
};
