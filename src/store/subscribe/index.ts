import subscribeThemeStore from './theme';
import subscribeLocaleStore from './locale';

/** 订阅状态 */
export function subscribeStore() {
  subscribeLocaleStore();
  subscribeThemeStore();
}
