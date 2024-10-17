<script lang="ts" setup>
  import {
    useFooterSetting,
    useHeaderSetting,
    useMenuSetting,
    useMultipleTabSetting,
    useRootSetting,
  } from '@/hooks/setting';
  import type { LayoutMode } from '@adp/materials';
  import { AdminLayout, LAYOUT_SCROLL_EL_ID } from '@adp/materials';
  import { MenuModeEnum } from '@/enums';
  import { computed, unref } from 'vue';
  import { useLayoutSetting } from '@/hooks/setting/useLayoutSetting';
  import { useFullContent } from '@/hooks/web/useFullContent';
  import {
    LayoutContent,
    LayoutFeature,
    LayoutFooter,
    LayoutHeader,
    LayoutSider,
    LayoutTabs,
    SettingDrawer,
  } from '../common';
  // eslint-disable-next-line import/no-cycle

  defineOptions({
    name: 'BasicLayout',
  });

  const {
    getSiderWidth,
    getSiderCollapsedWidth,
    getCollapsed,
    isSiderVisible,
    setMenuSetting,
  } = useMenuSetting();
  const { getHeaderHeight } = useHeaderSetting();
  const { getShowMultipleTab, getTabHeight, getFoldAutoCollapse } =
    useMultipleTabSetting();
  const { getShowFooter, getFooterHeight, getFooterFixed } = useFooterSetting();
  const { getLayoutMode, getLayoutScrollMode } = useLayoutSetting();
  const { getFullContent } = useFullContent();
  const {
    getFixedHeaderAndTab,
    getContentXScrollable,
    getIsMobile,
    getShowLogo,
  } = useRootSetting();

  const layoutMode = computed(
    (): LayoutMode =>
      unref(getLayoutMode).includes(MenuModeEnum.VERTICAL)
        ? MenuModeEnum.VERTICAL
        : MenuModeEnum.HORIZONTAL,
  );

  const headerPropsConfig: Record<MenuModeEnum, App.Header> = {
    [MenuModeEnum.VERTICAL]: {
      showLogo: false,
      showMenu: false,
      showMenuToggle: true,
    },
    [MenuModeEnum.VERTICAL_MIX]: {
      showLogo: false,
      showMenu: false,
      showMenuToggle: true,
    },
    [MenuModeEnum.HORIZONTAL]: {
      showLogo: true,
      showMenu: true,
      showMenuToggle: false,
    },
    [MenuModeEnum.HORIZONTAL_MIX]: {
      showLogo: true,
      showMenu: true,
      showMenuToggle: false,
    },
  };

  // 头部配置
  // Header configuration
  const headerProps = computed(() => headerPropsConfig[unref(getLayoutMode)]);

  // 侧边栏折叠
  // Sidebar collapse
  const siderCollapse = computed({
    get: () => unref(getCollapsed),
    set: (val) => {
      setMenuSetting({ collapsed: val });
    },
  });
</script>

<template>
  <AdminLayout
    v-model:sider-collapse="siderCollapse"
    :content-class="getContentXScrollable ? 'overflow-x-hidden' : ''"
    :fixed-footer="getFooterFixed"
    :fixed-top="getFixedHeaderAndTab"
    :footer-height="getFooterHeight"
    :footer-visible="getShowFooter"
    :full-content="getFullContent"
    :header-height="getHeaderHeight"
    :is-mobile="getIsMobile"
    :mode="layoutMode"
    :scroll-el-id="LAYOUT_SCROLL_EL_ID"
    :scroll-mode="getLayoutScrollMode"
    :sider-collapsed-width="getSiderCollapsedWidth"
    :sider-visible="isSiderVisible"
    :sider-width="getSiderWidth"
    :tab-auto-collapse="getFoldAutoCollapse"
    :tab-height="getTabHeight"
    :tab-visible="getShowMultipleTab"
  >
    <template #header>
      <LayoutHeader
        :show-logo="headerProps.showLogo && getShowLogo"
        v-bind="headerProps"
      />
    </template>
    <template #tab>
      <LayoutTabs />
    </template>
    <template #sider>
      <LayoutSider />
    </template>
    <LayoutContent />
    <SettingDrawer />
    <LayoutFeature />
    <template #footer>
      <LayoutFooter />
    </template>
    <template #backTop>
      <ABackTop :target-container="`#${LAYOUT_SCROLL_EL_ID}`" />
    </template>
  </AdminLayout>
</template>

<style lang="less">
  @import '@/styles/scrollbar.less';

  #__SCROLL_EL_ID__ {
    .scrollbar(8px, #e1e1e1);
  }

  .dark #__SCROLL_EL_ID__ {
    .scrollbar(8px, #555);
  }
</style>
