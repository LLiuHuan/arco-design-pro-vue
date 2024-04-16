<template>
  <div
    ref="sideRef"
    class="fixed top-0 w-250px h-full transition-base bg-[var(--color-menu-light-bg)]"
    :style="{
      width: unref(getOpenMenu) ? `${getMenuWidth}px` : 0,
      left: `${getMixSideWidth}px`,
    }"
  >
    <div
      class="flex justify-between items-center transition-base border-b-solid border-b-1 border-b-[var(--color-fill-2)] border-r-solid border-r-1 border-r-[var(--color-fill-2)]"
      :style="{
        height: `${getHeaderHeight + 1}px`,
        fontSize: getOpenMenu ? '18px' : 0,
        width: unref(getOpenMenu) ? `${getMenuWidth + 1}px` : 0,
      }"
    >
      <span class="text-[rgba(var(--arcoblue-6))] font-bold">
        {{ VITE_GLOB_APP_TITLE }}</span
      >
      <div class="pr-8px" @click="handleFixedMenu">
        <SvgIcon
          v-if="getMixSideFixed"
          class="cursor-pointer !text-[#00000073] hover:!text-[#000000d9]"
          icon="ri:pushpin-2-fill"
        />
        <SvgIcon
          v-else
          class="cursor-pointer !text-[#00000073] hover:!text-[#000000d9]"
          icon="ri:pushpin-2-line"
        />
      </div>
    </div>
    <LayoutMenu
      style="box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.08); height: 100%"
      :theme="theme"
      :menus="menus"
      :collapsed="false"
    />
  </div>
</template>

<script lang="ts" setup>
  import {
    useGlobSetting,
    useHeaderSetting,
    useMenuSetting,
  } from '@/hooks/setting';
  import { App } from '~/types/app';
  import { SvgIcon } from '@/components/Icon';
  import { computed, unref } from 'vue';
  import {
    AppEnum,
    SIDE_BAR_MINI_WIDTH,
    SIDE_BAR_SHOW_TIT_MINI_WIDTH,
  } from '@/enums';
  import LayoutMenu from '../../menu/index.vue';

  interface Props {
    /** 菜单抽屉可见性 */
    visible: boolean;
    /** 子菜单数据 */
    menus: App.Menu[];

    theme?: AppEnum;

    fixed?: boolean;
  }

  const props = defineProps<Props>();

  const { VITE_GLOB_APP_TITLE } = useGlobSetting();
  const { getMixSideFixed, getCollapsed, getMenuWidth, setMenuSetting } =
    useMenuSetting();
  const { getHeaderHeight } = useHeaderSetting();

  const getOpenMenu = computed(() => {
    return props.fixed || props.visible;
  });

  const getMixSideWidth = computed(() => {
    return unref(getCollapsed)
      ? SIDE_BAR_MINI_WIDTH
      : SIDE_BAR_SHOW_TIT_MINI_WIDTH;
  });

  function handleFixedMenu() {
    setMenuSetting({
      mixSideFixed: !unref(props.fixed),
    });
  }
</script>

<style lang="less" scoped></style>
