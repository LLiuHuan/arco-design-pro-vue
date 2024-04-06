import { defineStore } from 'pinia';
import type { LocaleSetting, LocaleType } from '~/types/config';
import { LOCALE_KEY } from '@/enums';
import { localeSetting } from '@/settings';
import { localStg } from '@/utils/cache';
import { store } from '@/store';
import { router } from '@/router';
import { useTitle } from '@vueuse/core';
import { useI18n } from '@/hooks/web';

/**
 * @description Locale store - [多语言 store]
 */
const lsLocaleSetting = (localStg.get(LOCALE_KEY) ||
  localeSetting) as LocaleSetting;

interface LocaleState {
  localInfo: LocaleSetting;
}

export const useLocaleStore = defineStore({
  id: 'store-locale',
  state: (): LocaleState => ({
    localInfo: lsLocaleSetting,
  }),
  getters: {
    /**
     * @description Get whether to display the language selection drop-down - [获取是否显示语言选择器]
     * @param state
     */
    getShowPicker(state): boolean {
      return !!state.localInfo?.showPicker;
    },
    /**
     * @description Get the current language - [获取当前语言]
     * @param state
     */
    getLocale(state): LocaleType {
      return state.localInfo?.locale ?? 'zh-CN';
    },
  },
  actions: {
    /**
     * @description Set up multilingual information and cache - [设置多语言信息和缓存]
     * @param info multilingual info
     */
    setLocaleInfo(info: Partial<LocaleSetting>) {
      this.localInfo = { ...this.localInfo, ...info };
      localStg.set(LOCALE_KEY, this.localInfo);
    },
    updateTitleByLocale() {
      const { i18nTitle, title } = router.currentRoute.value.meta;
      const { t } = useI18n();
      const documentTitle = i18nTitle ? t(i18nTitle) : title;
      useTitle(documentTitle);
    },
    /**
     * @description Initialize multilingual information and load the existing configuration from the local cache - [初始化多语言信息并加载本地缓存中的现有配置]
     */
    initLocale() {
      this.setLocaleInfo({
        ...localeSetting,
        ...this.localInfo,
      });
    },
  },
});

// // Need to be used outside the setup - [需要在设置之外使用]
export function useLocaleStoreWithOut() {
  return useLocaleStore(store);
}
