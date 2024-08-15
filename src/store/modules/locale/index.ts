import { defineStore } from 'pinia';
import type { LocaleSetting } from '~/types/config';
import { LOCALE_KEY, StoreEnum } from '@/enums';
import { localeSetting } from '@/settings';
import { localStg } from '@/utils/cache';
import { effectScope, onScopeDispose, ref, watch } from 'vue';
import { setDayjsLocale } from '@/locale/dayjs';
import { router } from '@/router';
import { useTitle } from '@vueuse/core';
import { useI18n } from '@/hooks/web/useI18n';
import { useRouteStore } from '../route';
import { useMultipleTabStore } from '../multipleTab';

export const useLocaleStore = defineStore(StoreEnum.Locale, () => {
  const tabStore = useMultipleTabStore();
  const routeStore = useRouteStore();
  const scope = effectScope();
  const { t } = useI18n();

  const localeInfo = ref(localeSetting);

  function setLocaleInfo(info: Partial<LocaleSetting>) {
    localeInfo.value = { ...localeInfo.value, ...info };
    localStg.set(LOCALE_KEY, localeInfo.value.locale);
  }

  /**
   * @description 更新标题
   * @description Update document title by locale
   */
  function updateDocumentTitleByLocale() {
    const { i18nKey, title } = router.currentRoute.value.meta;

    const documentTitle = i18nKey ? t(i18nKey) : title;

    useTitle(documentTitle);
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
      // update document title by locale
      updateDocumentTitleByLocale();

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
