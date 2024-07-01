import { useEventListener } from '@vueuse/core';
import { useMultipleTabStore } from '../modules/multipleTab';

/**
 * @description 订阅是否是移动端 store
 */
export default function subscribeTabStore() {
  const tabStore = useMultipleTabStore();

  // 当页面关闭或刷新时缓存标签
  // cache tabs when page is closed or refreshed
  useEventListener(window, 'beforeunload', () => {
    tabStore.setCacheTabs();
  });
}
