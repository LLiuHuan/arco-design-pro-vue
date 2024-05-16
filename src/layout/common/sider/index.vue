<template>
  <div class="flex-col-stretch wh-full shadow-sider bg-[var(--color-bg-2)]">
    <AppLogo
      v-if="showLogo"
      class="text-16px font-bold"
      :show-title="!getCollapsed"
      :style="{ height: `${getHeaderHeight + 1}px` }"
    />
    <LayoutVerticalMixMenu v-if="isVerticalMix">
      <AppLogo
        v-if="getShowLogo"
        class="text-16px font-bold"
        :show-title="false"
        :style="{ height: `${getHeaderHeight + 1}px` }"
      />
    </LayoutVerticalMixMenu>
    <LayoutHorizontalMixMenu v-else-if="isHorizontalMix" />
    <LayoutVerticalMenu
      v-else
      :menus="getMenus"
      :collapsed="getCollapsed"
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

  const { isVerticalMix, isHorizontalMix, getCollapsed } = useMenuSetting();
  const { getHeaderHeight } = useHeaderSetting();
  const { getShowLogo } = useRootSetting();
  const { getMenus } = useRouteStoreWithOut();

  const showLogo = computed(
    () =>
      unref(getShowLogo) && !unref(isVerticalMix) && !unref(isHorizontalMix),
  );
</script>

<style lang="less" scoped></style>
