// import arcoLocale from '@arco-design/web-vue/es/locale/lang/zh-cn';
import { genMessage } from '../helper';

const modules = import.meta.glob('./zh-CN/**/*.{json,ts,js}', { eager: true });

export default {
  message: {
    ...genMessage(modules as Recordable<Recordable>, 'zh-CN'),
    // arcoLocale,
  },
};
