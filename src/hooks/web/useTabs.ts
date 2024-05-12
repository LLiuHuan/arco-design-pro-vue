import { Router, useRouter } from 'vue-router';
import { App } from '~/types/app';
import { useMultipleTabWithOutStore } from '@/store/modules/multipleTab';
import { useAppStoreWithOut } from '@/store/modules/app';
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
  const appStore = useAppStoreWithOut();
  const tabStore = useMultipleTabWithOutStore();
  const router = _router || useRouter();

  const canIUseTabs = (): boolean => {
    const { show } = appStore.getMultiTabsSetting;
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
    return tabStore.getTabList.find(
      (item) => item.fullPath === route.fullPath,
    )!;
  };

  async function updateTabTitle(title: string, tab?: App.Tab) {
    if (!canIUseTabs) {
      return;
    }
    const targetTab = tab || getCurrentTab();
    await tabStore.setTabTitle(title, targetTab);
  }

  async function updateTabPath(path: string, tab?: App.Tab) {
    if (!canIUseTabs) {
      return;
    }
    const targetTab = tab || getCurrentTab();
    await tabStore.updateTabPath(path, targetTab);
  }

  const handleTabAction = async (action: TabActionEnum, tab?: App.Tab) => {
    if (!canIUseTabs) {
      return;
    }

    const currentTab = getCurrentTab();

    switch (action) {
      case TabActionEnum.REFRESH_PAGE:
        await appStore.refreshPage();
        break;

      case TabActionEnum.CLOSE_ALL:
        await tabStore.closeAllTab(router);
        break;

      case TabActionEnum.CLOSE_LEFT:
        await tabStore.closeLeftTabs(currentTab, router);
        break;

      case TabActionEnum.CLOSE_RIGHT:
        await tabStore.closeRightTabs(currentTab, router);
        break;

      case TabActionEnum.CLOSE_OTHER:
        await tabStore.closeOtherTabs(currentTab, router);
        break;

      case TabActionEnum.CLOSE_CURRENT:
      case TabActionEnum.CLOSE:
        await tabStore.closeTab(tab || currentTab, router);
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
    updatePath: (fullPath: string, tab?: App.Tab) =>
      updateTabPath(fullPath, tab),
  };
};
