import { genLocaleMessage } from '@/views';
import { LocaleEnum } from '@/enums';
import { genMessage } from './helper';

const modules = import.meta.glob('./zh-CN/**/*.{json,ts,js}', { eager: true });

export default {
  system: {
    title: 'Arco Design Pro',
  },
  ...genMessage(modules as Recordable<Recordable>, LocaleEnum.zh_CN),
  ...genLocaleMessage(LocaleEnum.zh_CN),
};
