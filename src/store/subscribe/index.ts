import subscribeLocaleStore from './locale';
import subscribeMobileStore from './mobile';
import subscribeThemeStore from './theme';
import subscribeTabStore from './multipleTab';

/** 订阅状态 */
export function subscribeStore() {
  subscribeThemeStore();
  subscribeLocaleStore();
  subscribeMobileStore();
  subscribeTabStore();
}
