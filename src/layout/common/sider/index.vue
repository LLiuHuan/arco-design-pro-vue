<template>
  <div class="flex-col-stretch wh-full shadow-sider bg-[var(--color-bg-2)]">
    <AppLogo
      v-if="showLogo"
      class="transition-base text-16px font-bold"
      :show-title="!getCollapsed"
      :style="{ height: `${getHeaderHeight + 1}px` }"
    />
    <LayoutVerticalMixMenu v-if="getIsMixSidebar">
      <AppLogo
        class="transition-base text-16px font-bold"
        :show-title="false"
        :style="{ height: `${getHeaderHeight + 1}px` }"
      />
    </LayoutVerticalMixMenu>
    <LayoutHorizontalMixMenu v-else-if="getIsTopMixSidebar" />
    <LayoutVerticalMenu
      v-else
      :menus="getMenus"
      :collapsed="getCollapsed"
    ></LayoutVerticalMenu>
  </div>
</template>

<script lang="ts" setup>
  import { useHeaderSetting, useMenuSetting } from '@/hooks/setting';
  import { AppLogo } from '@/components/AppLogo';
  import { computed, unref } from 'vue';
  import { useRouteStoreWithOut } from '@/store/modules/route';
  import {
    LayoutHorizontalMixMenu,
    LayoutVerticalMixMenu,
    LayoutVerticalMenu,
  } from '../menu';

  const { getIsMixSidebar, getIsTopMixSidebar, getCollapsed } =
    useMenuSetting();
  const { getHeaderHeight } = useHeaderSetting();
  const { getMenus } = useRouteStoreWithOut();

  const showLogo = computed(
    () => !unref(getIsMixSidebar) && !unref(getIsTopMixSidebar),
  );
</script>

<style lang="less" scoped></style>
