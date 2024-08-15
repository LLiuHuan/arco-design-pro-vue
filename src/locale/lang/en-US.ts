import { genLocaleMessage } from '@/views';
import { LocaleEnum } from '@/enums';
import { genMessage } from './helper';

const modules = import.meta.glob('./en-US/**/*.{json,ts,js}', { eager: true });

export default {
  system: {
    title: 'Arco Design Pro',
    updateTitle: 'System Version Update Notification',
    updateContent:
      'A new version of the system has been detected. Do you want to refresh the page now?',
    updateCancel: 'Later',
    updateConfirm: 'Refresh now',
  },
  ...genMessage(modules as Recordable<Recordable>, LocaleEnum.en_US),
  ...genLocaleMessage(LocaleEnum.en_US),
};
