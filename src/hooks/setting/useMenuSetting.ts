import { useAppStore } from '@/store/modules/app';
import { computed, unref } from 'vue';
import type { MenuSetting } from '~/types/config';
import {
  MenuModeEnum,
  MenuTypeEnum,
  SIDE_BAR_MINI_WIDTH,
  SIDE_BAR_SHOW_TIT_MINI_WIDTH,
  TriggerEnum,
} from '@/enums';
import { useFullContent } from '@/hooks/web/useFullContent';
import { useLayoutSetting } from '@/hooks/setting/useLayoutSetting';

export const useMenuSetting = () => {
  const appStore = useAppStore();
  const { getFullContent } = useFullContent();
  const { getLayoutMode } = useLayoutSetting();

  const getMenuType = computed(() => appStore.getMenuSetting.type);

  // 是否折叠左侧菜单
  const getCollapsed = computed(() => appStore.getMenuSetting.collapsed);

  // 获取菜单背景颜色
  const getMenuBgColor = computed(() => appStore.getMenuSetting.bgColor);

  // 获取菜单展开宽度
  const getMenuWidth = computed(() => appStore.getMenuSetting.menuWidth);

  // 获取菜单折叠宽度
  const getCollapsedMenuWidth = computed(
    () => appStore.getMenuSetting.collapsedMenuWidth,
  );

  // 获取是否可以拖拽侧边栏
  const getCanDrag = computed(() => appStore.getMenuSetting.canDrag);

  // 获取菜单触发方式位置
  const getTrigger = computed(() => appStore.getMenuSetting.trigger);

  // 获取菜单主题
  const getMenuTheme = computed(() => appStore.getMenuSetting.theme);

  // 获取是否开启手风琴模式
  const getAccordion = computed(() => appStore.getMenuSetting.accordion);

  // 获取是否显示菜单
  const getShowMenu = computed(() => appStore.getMenuSetting.show);

  const getMixSideWidth = computed(() => {
    return unref(getCollapsed)
      ? SIDE_BAR_MINI_WIDTH
      : SIDE_BAR_SHOW_TIT_MINI_WIDTH;
  });

  // 获取左侧菜单是否展示
  const getSiderVisible = computed(
    () => unref(getLayoutMode) !== MenuModeEnum.HORIZONTAL,
  );

  // region 混合菜单

  // 混合菜单是否固定
  // Is the mixed menu fixed?
  const getMixSideFixed = computed(() => appStore.getMenuSetting.mixSideFixed);

  const getMixChildMenuWidth = computed(
    () => appStore.getMenuSetting.mixChildMenuWidth,
  );

  // 混合菜单触发器位置
  // Mixed menu trigger position
  const getMixSideTrigger = computed(
    () => appStore.getMenuSetting.mixSideTrigger,
  );

  // 选中菜单后是否关闭混合菜单
  // Whether to close the mixed menu after selecting the menu
  const getCloseMixSidebarOnChange = computed(
    () => appStore.getMenuSetting.closeMixSidebarOnChange,
  );
  // endregion

  const getShowTopMenu = computed(() => {
    return unref(getLayoutMode) === MenuModeEnum.HORIZONTAL;
  });

  const getShowSider = computed(() => {
    //      unref(getSplit) ||
    return (
      unref(getShowMenu) &&
      unref(getLayoutMode) !== MenuModeEnum.HORIZONTAL &&
      !unref(getFullContent)
    );
  });

  const getIsSidebar = computed(() => {
    return unref(getMenuType) === MenuModeEnum.VERTICAL;
  });

  const getIsTopMenu = computed(() => {
    return unref(getMenuType) === MenuModeEnum.HORIZONTAL;
  });

  // 获取是否是混合菜单
  const getIsMixSidebar = computed(() => {
    return unref(getLayoutMode) === MenuModeEnum.VERTICAL_MIX;
  });

  // 获取是否是顶部混合菜单
  const getIsTopMixSidebar = computed(() => {
    return unref(getLayoutMode) === MenuModeEnum.HORIZONTAL_MIX;
  });

  // 是否是侧边栏模式
  const getIsSidebarType = computed(
    () => unref(getMenuType) === MenuTypeEnum.SIDEBAR,
  );

  // const getIsTopMenu = computed(
  //   () => unref(getMenuType) === MenuTypeEnum.TOP_MENU,
  // );

  const getShowSiderTrigger = computed(() => {
    const trigger = unref(getTrigger);

    return trigger !== TriggerEnum.NONE && trigger === TriggerEnum.FOOTER;
  });

  // 是否显示头部触发器
  // Whether to display the header trigger
  const getShowHeaderTrigger = computed(() => {
    // TODO: !getShowMenu || getMenuHidden ??????
    if (unref(getMenuType) === MenuTypeEnum.TOP_MENU) {
      return false;
    }

    return unref(getTrigger) === TriggerEnum.HEADER;
  });

  // const getMenuHidden = computed(() => appStore.getMenuSetting.hidden);

  // 获取是否折叠左侧菜单
  // TODO: 现在是写死的，后续可以根据需求修改
  const getMiniWidthNumber = computed(() => {
    // const { siderHidden } = appStore.getMenuSetting;
    // return siderHidden ? 48 : 80;

    return unref(getCollapsedMenuWidth);
  });

  const isVerticalMix = computed(
    () => unref(getLayoutMode) === MenuModeEnum.VERTICAL_MIX,
  );

  const isHorizontalMix = computed(
    () => unref(getLayoutMode) === MenuModeEnum.HORIZONTAL_MIX,
  );

  const getSiderWidth = computed(() => {
    const { menuWidth, mixMenuWidth, mixChildMenuWidth } =
      appStore.getMenuSetting;
    let w =
      unref(isVerticalMix) || unref(isHorizontalMix) ? mixMenuWidth : menuWidth;
    if (unref(isVerticalMix) && unref(getMixSideFixed)) {
      w += mixChildMenuWidth;
    }
    return w;
  });

  const getSiderCollapsedWidth = computed(() => {
    const { collapsedMenuWidth, mixCollapsedMenuWidth, mixChildMenuWidth } =
      appStore.getMenuSetting;

    let w =
      unref(isVerticalMix) || unref(isHorizontalMix)
        ? mixCollapsedMenuWidth
        : collapsedMenuWidth;

    if (unref(isVerticalMix) && unref(getMixSideFixed)) {
      w += mixChildMenuWidth;
    }

    return w;
  });

  // 获取真实宽度
  const getRealWidth = computed(() => {
    if (unref(getIsMixSidebar)) {
      return unref(getCollapsed) && !unref(getMixSideFixed)
        ? unref(getMiniWidthNumber)
        : unref(getMenuWidth);
    }
    return unref(getCollapsed)
      ? unref(getMiniWidthNumber)
      : unref(getMenuWidth);
  });

  // 设置菜单配置
  function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
    appStore.setProjectConfig({ menuSetting });
  }

  function toggleCollapsed() {
    setMenuSetting({
      collapsed: !unref(getCollapsed),
    });
  }
  return {
    getCollapsed,
    getMenuBgColor,
    getCollapsedMenuWidth,
    getMenuWidth,
    getCanDrag,
    getTrigger,
    getMenuTheme,
    getRealWidth,
    getMiniWidthNumber,
    getShowSiderTrigger,
    getShowHeaderTrigger,
    getIsSidebarType,
    getAccordion,
    getIsMixSidebar,
    // getIsTopMenu,
    getIsTopMixSidebar,
    getShowMenu,
    getShowSider,
    getShowTopMenu,
    getMixSideWidth,
    getSiderVisible,

    getMenuType,

    getMixSideFixed,
    getMixSideTrigger,
    getMixChildMenuWidth,
    getCloseMixSidebarOnChange,
    getIsSidebar,
    getIsTopMenu,

    setMenuSetting,
    toggleCollapsed,

    getSiderWidth,
    getSiderCollapsedWidth,
  };
};
