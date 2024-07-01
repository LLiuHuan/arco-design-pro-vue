<template>
  <div
    :style="{ background: getIsMenuDark ? 'var(--color-menu-dark-bg)' : '' }"
    class="flex-col-stretch wh-full shadow-sider bg-[var(--color-bg-2)]"
  >
    <AppLogo
      v-if="showLogo"
      :show-title="!getCollapsed"
      :style="{ height: `${getHeaderHeight + 1}px` }"
      class="text-16px font-bold"
    />
    <LayoutVerticalMixMenu v-if="isVerticalMix">
      <AppLogo
        v-if="getShowLogo"
        :show-title="false"
        :style="{ height: `${getHeaderHeight + 1}px` }"
        class="text-16px font-bold"
      />
    </LayoutVerticalMixMenu>
    <LayoutHorizontalMixMenu v-else-if="isHorizontalMix" />
    <LayoutVerticalMenu
      v-else
      :collapsed="getCollapsed"
      :menus="routeStoreWithOut.getMenus"
      :theme="getMenuTheme"
    ></LayoutVerticalMenu>
  </div>
</template>

<script lang="ts" setup>
  import {
    useHeaderSetting,
    useMenuSetting,
    useRootSetting,
  } from '@/hooks/setting';
  import { AppLogo } from '@/components/AppLogo';
  import { computed, unref } from 'vue';
  import { useRouteStoreWithOut } from '@/store/modules/route';
  import {
    LayoutHorizontalMixMenu,
    LayoutVerticalMenu,
    LayoutVerticalMixMenu,
  } from '../menu';

  const {
    isVerticalMix,
    isHorizontalMix,
    getCollapsed,
    getIsMenuDark,
    getMenuTheme,
  } = useMenuSetting();
  const { getHeaderHeight } = useHeaderSetting();
  const { getShowLogo } = useRootSetting();
  const routeStoreWithOut = useRouteStoreWithOut();

  const showLogo = computed(
    () =>
      unref(getShowLogo) && !unref(isVerticalMix) && !unref(isHorizontalMix),
  );
</script>

<style lang="less" scoped></style>
