<template>
  <div class="size-full flex-col-stretch shadow-sider">
    <AppLogo
      v-if="getIsShowLogo"
      class="text-16px font-bold"
      :class="{
        'border-b-[var(--color-border-1)] border-b border-solid border-0 ':
          theme === ThemeEnum.LIGHT,
      }"
      :theme="theme"
      :show-title="!getCollapsed"
      :style="{ height: `${getHeaderHeight}px` }"
    ></AppLogo>

    <VerticalMenu :theme="theme" :menus="getMenus"></VerticalMenu>
  </div>
</template>

<script lang="ts" setup>
  import { AppLogo } from '@/components/AppLogo';
  import { computed, unref } from 'vue';
  import {
    useHeaderSetting,
    useMenuSetting,
    useRootSetting,
  } from '@/hooks/setting';
  import { ThemeEnum } from '@/enums';
  import { useRouteStore } from '@/store/modules/route';
  import { VerticalMenu } from './components';

  const { getShowLogo } = useRootSetting();
  const { getIsSidebarType, getCollapsed } = useMenuSetting();
  const { getHeaderHeight } = useHeaderSetting();

  interface Props {
    /**
     * The theme of the current parent component - [当前父组件的主题]
     */
    theme?: ThemeEnum;
  }

  defineProps<Props>();

  const { getMenus } = useRouteStore();

  const getIsShowLogo = computed(
    () => unref(getShowLogo) && unref(getIsSidebarType),
  );
</script>

<style lang="less" scoped></style>
