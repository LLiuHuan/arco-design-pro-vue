import { Recordable } from '~/types/global';
import { genMessage } from '../helper';

const modules = import.meta.glob('./zh-CN/**/*.{json,ts,js}', { eager: true });

export default {
  message: {
    system: {
      title: 'Arco Design Pro',
    },
    ...genMessage(modules as Recordable<Recordable>, 'zh-CN'),
  },
};
