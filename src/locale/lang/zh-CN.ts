import { genLocaleMessage } from '@/views';
import { LocaleEnum } from '@/enums';
import { genMessage } from './helper';

const modules = import.meta.glob('./zh-CN/**/*.{json,ts,js}', { eager: true });

export default {
  system: {
    title: 'Arco Design Pro',
    updateTitle: '系统版本更新通知',
    updateContent: '检测到系统有新版本发布，是否立即刷新页面？',
    updateCancel: '稍后再说',
    updateConfirm: '立即刷新',
  },
  ...genMessage(modules as Recordable<Recordable>, LocaleEnum.zh_CN),
  ...genLocaleMessage(LocaleEnum.zh_CN),
};
