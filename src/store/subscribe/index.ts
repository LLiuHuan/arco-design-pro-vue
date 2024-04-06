import subscribeLocaleStore from '@/store/subscribe/locale';
import subscribeThemeStore from './theme';

/** 订阅状态 */
export function subscribeStore() {
  subscribeThemeStore();
  subscribeLocaleStore();
}
