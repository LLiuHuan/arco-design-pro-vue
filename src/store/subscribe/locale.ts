import { effectScope, onScopeDispose, watch } from 'vue';
import { setDayjsLocale } from '@/locale/dayjs';
import { useRouteStore } from '@/store/modules/route';
import { useAppStore } from '@/store/modules/app';
import { useMultipleTabStore } from '../modules/multipleTab';
import { useLocaleStore } from '../modules/locale';

/** 订阅locale store */
export default function subscribeLocaleStore() {
  const locale = useLocaleStore();
  const appStore = useAppStore();
  const tabStore = useMultipleTabStore();
  const routeStore = useRouteStore();

  const scope = effectScope();
  scope.run(() => {
    watch(
      () => locale.localInfo.locale,
      () => {
        appStore.updateDocumentTitleByLocale();
        routeStore.updateGlobalMenusByLocale();
        tabStore.updateTabsByLocale();
        setDayjsLocale(locale.localInfo.locale);
      },
      { immediate: true },
    );
  });

  onScopeDispose(() => {
    scope.stop();
  });
}
