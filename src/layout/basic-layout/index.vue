<template>
  <AdminLayout
    v-model:sider-collapse="siderCollapse"
    :mode="layoutMode"
    :scroll-el-id="LAYOUT_SCROLL_EL_ID"
    :scroll-mode="getLayoutScrollMode"
    :full-content="getFullContent"
    :fixed-top="getFixedHeaderAndTab"
    :header-height="getHeaderHeight"
    :tab-visible="getShowMultipleTab"
    :tab-height="getTabHeight"
    :content-class="getContentXScrollable ? 'overflow-x-hidden' : ''"
    :sider-visible="getSiderVisible"
    :sider-width="getSiderWidth"
    :sider-collapsed-width="getSiderCollapsedWidth"
    :footer-visible="getShowFooter"
    :footer-height="getFooterHeight"
    :fixed-footer="false"
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
  </AdminLayout>
</template>

<script lang="ts" setup>
  import {
    useFooterSetting,
    useHeaderSetting,
    useMenuSetting,
    useMultipleTabSetting,
    useRootSetting,
  } from '@/hooks/setting';
  import { AdminLayout, LAYOUT_SCROLL_EL_ID } from '@adp/materials';
  import type { LayoutMode } from '@adp/materials';
  import { MenuModeEnum } from '@/enums';
  import { App } from '~/types/app';
  import { computed, unref } from 'vue';
  import { useLayoutSetting } from '@/hooks/setting/useLayoutSetting';
  import { useFullContent } from '@/hooks/web/useFullContent';
  import {
    LayoutContent,
    LayoutFooter,
    LayoutSider,
    SettingDrawer,
    LayoutHeader,
    LayoutTabs,
    LayoutFeature,
  } from '../common';
  import { setupMixMenuContext } from '../context';

  const {
    getSiderWidth,
    getSiderCollapsedWidth,
    getCollapsed,
    getSiderVisible,
    setMenuSetting,
  } = useMenuSetting();
  const { getHeaderHeight } = useHeaderSetting();
  const { getShowMultipleTab, getTabHeight } = useMultipleTabSetting();
  const { getShowFooter, getFooterHeight, getFooterFixed } = useFooterSetting();
  const { getLayoutMode, getLayoutScrollMode } = useLayoutSetting();
  const { getFullContent } = useFullContent();
  const { getFixedHeaderAndTab, getContentXScrollable } = useRootSetting();

  const layoutMode = computed(() => {
    const vertical: LayoutMode = 'vertical';
    const horizontal: LayoutMode = 'horizontal';
    console.log(unref(getLayoutMode));
    return unref(getLayoutMode).includes(vertical) ? vertical : horizontal;
  });

  const headerPropsConfig: Record<MenuModeEnum, App.Header> = {
    [MenuModeEnum.VERTICAL]: {
      showLogo: false,
      showMenu: false,
      showMenuToggle: true,
    },
    [MenuModeEnum.VERTICAL_MIX]: {
      showLogo: false,
      showMenu: false,
      showMenuToggle: false,
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

  const headerProps = computed(() => headerPropsConfig[unref(getLayoutMode)]);
  const siderCollapse = computed({
    get: () => unref(getCollapsed),
    set: (val) => {
      setMenuSetting({ collapsed: val });
    },
  });

  setupMixMenuContext();
</script>

<style lang="less" scoped></style>
