import { Router, useRouter } from 'vue-router';
import { useMultipleTabStore } from '@/store/modules/multipleTab';
import { useAppStore } from '@/store/modules/app';
import { unref } from 'vue';

enum TabActionEnum {
  REFRESH_PAGE,
  CLOSE_CURRENT,
  CLOSE_LEFT,
  CLOSE_RIGHT,
  CLOSE_OTHER,
  CLOSE_ALL,
  SCALE,
  CLOSE,
}

export const useTabs = (_router?: Router) => {
  const appStore = useAppStore();
  const tabStore = useMultipleTabStore();
  const router = _router || useRouter();

  const canIUseTabs = (): boolean => {
    const { show } = appStore.setting.multiTabsSetting;
    if (!show) {
      throw new Error(
        'The multi-tab page is currently not open, please open it in the settings！',
      );
    }
    return show;
  };

  const { currentRoute } = router;

  const getCurrentTab = () => {
    const route = unref(currentRoute);
    return tabStore.tabs.find((item) => item.fullPath === route.fullPath)!;
  };

  async function updateTabTitle(title: string, tab?: App.Tab) {
    if (!canIUseTabs) {
      return;
    }
    const targetTab = tab || getCurrentTab();
    tabStore.setTabLabel(title, targetTab.id);
  }

  const handleTabAction = async (action: TabActionEnum, tab?: App.Tab) => {
    if (!canIUseTabs) {
      return;
    }

    const currentTab = tab || getCurrentTab();

    switch (action) {
      case TabActionEnum.REFRESH_PAGE:
        await appStore.refreshPage();
        break;

      case TabActionEnum.CLOSE_ALL:
        await tabStore.clearTabs();
        break;

      case TabActionEnum.CLOSE_LEFT:
        await tabStore.clearLeftTabs(currentTab.id);
        break;

      case TabActionEnum.CLOSE_RIGHT:
        await tabStore.clearRightTabs(currentTab.id);
        break;

      case TabActionEnum.CLOSE_OTHER:
        await tabStore.clearTabs([currentTab.id]);
        break;

      case TabActionEnum.CLOSE_CURRENT:
      case TabActionEnum.CLOSE:
        await tabStore.removeTab(currentTab.id);
        break;
      default:
        break;
    }
  };

  return {
    refreshPage: () => handleTabAction(TabActionEnum.REFRESH_PAGE),
    closeAll: () => handleTabAction(TabActionEnum.CLOSE_ALL),
    closeLeft: () => handleTabAction(TabActionEnum.CLOSE_LEFT),
    closeRight: () => handleTabAction(TabActionEnum.CLOSE_RIGHT),
    closeOther: () => handleTabAction(TabActionEnum.CLOSE_OTHER),
    closeCurrent: () => handleTabAction(TabActionEnum.CLOSE_CURRENT),
    close: (tab?: App.Tab) => handleTabAction(TabActionEnum.CLOSE, tab),
    setTitle: (title: string, tab?: App.Tab) => updateTabTitle(title, tab),
  };
};
