import { genMessage } from '../helper';

const modules = import.meta.glob('./en-US/**/*.{json,ts,js}', { eager: true });

export default {
  message: {
    system: {
      title: 'Arco Design Pro',
    },
    ...genMessage(modules as Recordable<Recordable>, 'en-US'),
  },
};
