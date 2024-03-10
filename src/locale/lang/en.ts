// import arcoLocale from '@arco-design/web-vue/es/locale/lang/en-us';
import { genMessage } from '../helper';

const modules = import.meta.glob('./en/**/*.{json,ts,js}', { eager: true });
export default {
  message: {
    ...genMessage(modules as Recordable<Recordable>, 'en'),
    // arcoLocale,
  },
  dateLocale: null,
  dateLocaleName: 'en',
};
