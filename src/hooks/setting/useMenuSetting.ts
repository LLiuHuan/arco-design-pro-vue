import { useAppStore } from '@/store/modules/app';
import { computed, unref } from 'vue';
import type { MenuSetting } from '~/types/config';
import { MenuModeEnum, MenuTypeEnum, TriggerEnum } from '@/enums';
import { useFullContent } from '@/hooks/web/useFullContent';

export const useMenuSetting = () => {
  const appStore = useAppStore();
  const { getFullContent } = useFullContent();

  const getMenuType = computed(() => appStore.getMenuSetting.type);

  const getMenuMode = computed(() => appStore.getMenuSetting.mode);

  // 是否折叠左侧菜单
  const getCollapsed = computed(() => appStore.getMenuSetting.collapsed);

  // 获取菜单背景颜色
  const getMenuBgColor = computed(() => appStore.getMenuSetting.bgColor);

  // 获取菜单宽度
  const getMenuWidth = computed(() => appStore.getMenuSetting.menuWidth);

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

  // region 混合菜单

  const getMixSideFixed = computed(() => appStore.getMenuSetting.mixSideFixed);

  const getMixSideTrigger = computed(
    () => appStore.getMenuSetting.mixSideTrigger,
  );

  const getCloseMixSidebarOnChange = computed(
    () => appStore.getMenuSetting.closeMixSidebarOnChange,
  );
  // endregion

  const getShowSider = computed(() => {
    //      unref(getSplit) ||
    return (
      unref(getShowMenu) &&
      unref(getMenuMode) !== MenuModeEnum.HORIZONTAL &&
      !unref(getFullContent)
    );
  });

  // 获取是否是混合菜单
  const getIsMixSidebar = computed(() => {
    return unref(getMenuType) === MenuTypeEnum.MIX_SIDEBAR;
  });

  // 是否是侧边栏模式
  const getIsSidebarType = computed(
    () => unref(getMenuType) === MenuTypeEnum.SIDEBAR,
  );

  const getIsTopMenu = computed(
    () => unref(getMenuType) === MenuTypeEnum.TOP_MENU,
  );

  const getShowSiderTrigger = computed(() => {
    const trigger = unref(getTrigger);

    return trigger !== TriggerEnum.NONE && trigger === TriggerEnum.FOOTER;
  });

  const getShowHeaderTrigger = computed(() => {
    if (unref(getMenuType) === MenuTypeEnum.TOP_MENU) {
      return false;
    }

    return unref(getTrigger) === TriggerEnum.HEADER;
  });

  // const getMenuHidden = computed(() => appStore.getMenuSetting.hidden);

  // 获取是否折叠左侧菜单
  // TODO: 现在是写死的，后续可以根据需求修改
  const getMiniWidthNumber = computed(() => {
    return 48;
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
    getIsTopMenu,
    getShowMenu,
    getShowSider,

    getMenuMode,
    getMenuType,

    getMixSideFixed,
    getMixSideTrigger,
    getCloseMixSidebarOnChange,

    setMenuSetting,
    toggleCollapsed,
  };
};
