import { useAppStore } from '@/store/modules/app';
import { computed, unref } from 'vue';
import type { MenuSetting } from '~/types/config';
import { MenuModeEnum } from '@/enums';
import { useLayoutSetting } from '@/hooks/setting/useLayoutSetting';

export const useMenuSetting = () => {
  const appStore = useAppStore();
  const { getLayoutMode } = useLayoutSetting();

  /**
   * @description 是否折叠左侧菜单
   * @description Whether to collapse the left menu
   */
  const getCollapsed = computed(() => appStore.getMenuSetting.collapsed);

  /**
   * @description 获取菜单背景颜色
   * @description Get menu background color
   */
  const getMenuBgColor = computed(() => appStore.getMenuSetting.bgColor);

  /**
   * @description 获取是否可以拖拽侧边栏
   * @description Get whether the sidebar can be dragged
   */
  const getCanDrag = computed(() => appStore.getMenuSetting.canDrag);

  /**
   * @description 获取菜单触发方式位置
   */
  const getTrigger = computed(() => appStore.getMenuSetting.trigger);

  /**
   * @description 获取菜单主题
   * @description Get menu theme
   */
  const getMenuTheme = computed(() => appStore.getMenuSetting.theme);

  /**
   * @description 获取手风琴模式
   * @description Get accordion mode
   */
  const getAccordion = computed(() => appStore.getMenuSetting.accordion);

  // region 混合菜单

  /**
   * @description 混合菜单是否固定
   * @description Is the mixed menu fixed?
   */
  const getMixSideFixed = computed(() => appStore.getMenuSetting.mixSideFixed);

  /**
   * @description 混合菜单触发器位置
   * @description Mixed menu trigger position
   */
  const getMixSideTrigger = computed(
    () => appStore.getMenuSetting.mixSideTrigger,
  );

  /**
   * @description 选中菜单后是否关闭混合菜单
   * @description Whether to close the mixed menu after selecting the menu
   */
  const getCloseMixSidebarOnChange = computed(
    () => appStore.getMenuSetting.closeMixSidebarOnChange,
  );
  // endregion

  // 获取左侧菜单是否展示
  const isSiderVisible = computed(
    () => unref(getLayoutMode) !== MenuModeEnum.HORIZONTAL,
  );

  /**
   * @description 获取是否是垂直混合模式
   * @description Get whether it is vertical mixed mode
   */
  const isVerticalMix = computed(
    () => unref(getLayoutMode) === MenuModeEnum.VERTICAL_MIX,
  );

  /**
   * @description 获取是否是水平混合模式
   * @description Get whether it is horizontal mixed mode
   */
  const isHorizontalMix = computed(
    () => unref(getLayoutMode) === MenuModeEnum.HORIZONTAL_MIX,
  );

  const isMixMenu = computed(
    () => unref(isVerticalMix) || unref(isHorizontalMix),
  );

  const isNotMixMenu = computed(() => !unref(isMixMenu));

  /**
   * @description 获取菜单宽度 展开时的宽度
   * @description Get menu width width when expanded
   */
  const getMenuWidth = computed(() => appStore.getMenuSetting.menuWidth);

  /**
   * @description 获取折叠菜单宽度
   * @description Get collapsed menu width
   */
  const getCollapsedMenuWidth = computed(
    () => appStore.getMenuSetting.collapsedMenuWidth,
  );

  /**
   * @description 获取混合菜单宽度
   * @description Get mixed menu width
   */
  const getMixMenuWidth = computed(() => appStore.getMenuSetting.mixMenuWidth);

  /**
   * @description 获取混合折叠菜单宽度
   * @description Get mixed collapsed menu width
   */
  const getMixCollapsedMenuWidth = computed(
    () => appStore.getMenuSetting.mixCollapsedMenuWidth,
  );

  /**
   * @description 获取混合子菜单宽度
   * @description Get mixed child menu width
   */
  const getMixChildMenuWidth = computed(
    () => appStore.getMenuSetting.mixChildMenuWidth,
  );

  /**
   * @description 获取菜单宽度，根据是否混合模式来判断
   * @description Get menu width
   */
  const getSiderWidth = computed(() => {
    let w =
      unref(isVerticalMix) || unref(isHorizontalMix)
        ? unref(getMixMenuWidth)
        : unref(getMenuWidth);
    if (unref(isVerticalMix) && unref(getMixSideFixed)) {
      w += unref(getMixChildMenuWidth);
    }
    return w;
  });

  /**
   * @description 获取折叠菜单宽度
   * @description Get collapsed menu width
   */
  const getSiderCollapsedWidth = computed(() => {
    let w =
      unref(isVerticalMix) || unref(isHorizontalMix)
        ? unref(getMixCollapsedMenuWidth)
        : unref(getCollapsedMenuWidth);

    if (unref(isVerticalMix) && unref(getMixSideFixed)) {
      w += unref(getMixChildMenuWidth);
    }

    return w;
  });

  /**
   * @description 设置菜单配置
   * @description Set menu configuration
   * @param menuSetting Partial<MenuSetting> 菜单配置
   */
  function setMenuSetting(menuSetting: Partial<MenuSetting>): void {
    appStore.setProjectConfig({ menuSetting });
  }

  /**
   * @description 切换左侧菜单是否折叠
   * @description Toggle whether the left menu is collapsed
   */
  function toggleCollapsed() {
    setMenuSetting({
      collapsed: !unref(getCollapsed),
    });
  }
  return {
    getCollapsed,
    getMenuBgColor,
    getCanDrag,
    getTrigger,
    getMenuTheme,
    getAccordion,
    isSiderVisible,
    isVerticalMix,
    isHorizontalMix,
    isMixMenu,
    isNotMixMenu,

    getMenuWidth,
    getCollapsedMenuWidth,
    getMixMenuWidth,
    getMixCollapsedMenuWidth,
    getMixChildMenuWidth,

    getMixSideFixed,
    getMixSideTrigger,
    getCloseMixSidebarOnChange,

    setMenuSetting,
    toggleCollapsed,

    getSiderWidth,
    getSiderCollapsedWidth,
  };
};
