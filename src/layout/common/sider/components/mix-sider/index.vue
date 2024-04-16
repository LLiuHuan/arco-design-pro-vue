<template>
  <div :style="getDomStyle" class="transition-base" style="overflow: hidden" />
  <div
    class="z-99 fixed-tl h-full transition-base flex-col bg-[var(--color-bg-2)]"
    :style="getWrapStyle"
  >
    <div class="flex-1 flex-col-stretch h-full arco-layout-sider-light">
      <LayoutMixMenu
        v-model:is-fixed="isFixed"
        :theme="theme"
        :menus="getMenus"
        hover
      >
        <template #logo>
          <AppLogo
            class="transition-base bg-[var(--color-bg-2)] text-16px font-bold border-b-solid border-b-1 border-b-[var(--color-fill-2)]"
            :theme="theme"
            :show-title="false"
            :style="{ height: `${getHeaderHeight + 1}px` }"
          />
        </template>

        <template #trigger>
          <LayoutTrigger
            class="transition-base bg-[var(--color-bg-2)] border-t-1 border-t-solid border-t-[var(--color-fill-2)]"
            :style="{ height: `${getFooterHeight}px` }"
          />
        </template>
      </LayoutMixMenu>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, CSSProperties, ref, unref } from 'vue';
  import {
    useFooterSetting,
    useHeaderSetting,
    useMenuSetting,
  } from '@/hooks/setting';
  import {
    AppEnum,
    SIDE_BAR_MINI_WIDTH,
    SIDE_BAR_SHOW_TIT_MINI_WIDTH,
  } from '@/enums';
  import { LayoutMixMenu, LayoutTrigger } from '@/layout/common';
  import { AppLogo } from '@/components/AppLogo';
  import { useRouteStore } from '@/store/modules/route';

  interface Props {
    /**
     * The theme of the current parent component - [当前父组件的主题]
     */
    theme?: AppEnum;
  }

  defineProps<Props>();

  const { getCollapsed, getRealWidth } = useMenuSetting();
  const { getHeaderHeight } = useHeaderSetting();
  const { getFooterHeight } = useFooterSetting();
  const { getMenus } = useRouteStore();

  const isFixed = ref(false);

  const getMixSideWidth = computed(() => {
    return unref(getCollapsed)
      ? SIDE_BAR_MINI_WIDTH
      : SIDE_BAR_SHOW_TIT_MINI_WIDTH;
  });

  function getWrapCommonStyle(width: string): CSSProperties {
    return {
      width,
      maxWidth: width,
      minWidth: width,
      flex: `0 0 ${width}`,
    };
  }

  const getDomStyle = computed((): CSSProperties => {
    const fixedWidth = unref(isFixed) ? unref(getRealWidth) : 0;
    const width = `${unref(getMixSideWidth) + fixedWidth}px`;
    return getWrapCommonStyle(width);
  });

  const getWrapStyle = computed((): CSSProperties => {
    const width = `${unref(getMixSideWidth)}px`;
    return getWrapCommonStyle(width);
  });
</script>

<style lang="less" scoped>
  :deep(.arco-scrollbar-track-direction-vertical) {
    width: 10px;
  }
  :deep(.arco-scrollbar-thumb-bar) {
    width: 6px;
  }
</style>
