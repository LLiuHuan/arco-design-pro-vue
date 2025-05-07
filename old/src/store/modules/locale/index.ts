import { defineStore } from 'pinia';
import type { LocaleSetting } from '~/types/config';
import { LOCALE_KEY, StoreEnum } from '@/enums';
import { localeSetting } from '@/settings';
import { localStg } from '@/utils/cache';
import { effectScope, onScopeDispose, ref, watch } from 'vue';
import { setDayjsLocale } from '@/locale/dayjs';
import { useRouteStore } from '../route';
import { useMultipleTabStore } from '../multipleTab';

export const useLocaleStore = defineStore(StoreEnum.Locale, () => {
  const tabStore = useMultipleTabStore();
  const routeStore = useRouteStore();
  const scope = effectScope();

  const localeInfo = ref(localeSetting);

  function setLocaleInfo(info: Partial<LocaleSetting>) {
    localeInfo.value = { ...localeInfo.value, ...info };
    localStg.set(LOCALE_KEY, localeInfo.value.locale);
  }

  /**
   * @description 初始化
   * @description Init
   */
  function init() {
    setLocaleInfo({
      locale: localStg.get(LOCALE_KEY) ?? localeSetting.locale,
    });
  }

  scope.run(() => {
    // watch locale
    watch(localeInfo, () => {
      // update global menus by locale
      routeStore.updateGlobalMenusByLocale();

      // update tabs by locale
      tabStore.updateTabsByLocale();

      // set dayjs locale
      setDayjsLocale(localeInfo.value.locale);
    });
  });

  onScopeDispose(() => {
    scope.stop();
  });

  init();

  return {
    localeInfo,

    setLocaleInfo,
  };
});
