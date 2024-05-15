<template>
  <AWatermark
    class="wh-full"
    :content="getShowWatermark ? getWatermarkText.split(/[,，]/) : ''"
    :z-index="110"
  >
    <AdminLayout
      v-model:sider-collapse="siderCollapse"
      :mode="layoutMode"
      :scroll-el-id="LAYOUT_SCROLL_EL_ID"
      :scroll-mode="getLayoutScrollMode"
      :is-mobile="getIsMobile"
      :full-content="getFullContent"
      :fixed-top="getFixedHeaderAndTab"
      :header-height="getHeaderHeight"
      :tab-visible="getShowMultipleTab"
      :tab-height="getTabHeight"
      :tab-auto-collapse="getFoldAutoCollapse"
      :content-class="getContentXScrollable ? 'overflow-x-hidden' : ''"
      :sider-visible="isSiderVisible"
      :sider-width="getSiderWidth"
      :sider-collapsed-width="getSiderCollapsedWidth"
      :footer-visible="getShowFooter"
      :footer-height="getFooterHeight"
      :fixed-footer="getFooterFixed"
      :right-footer="true"
    >
      <template #header>
        <LayoutHeader v-bind="headerProps" />
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
  </AWatermark>
</template>

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
  import { App } from '~/types/app';
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
  import { setupMixMenuContext } from '../context';

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
    getShowWatermark,
    getWatermarkText,
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

  setupMixMenuContext();
</script>

<style lang="less">
  @import '@/styles/scrollbar.less';

  #__SCROLL_EL_ID__ {
    .scrollbar(8px, #e1e1e1);
  }

  .dark #__SCROLL_EL_ID__ {
    .scrollbar(8px, #555);
  }
</style>
