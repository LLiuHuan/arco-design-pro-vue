<template>
  <div class="size-full flex-col-stretch shadow-sider">
    <AppLogo
      v-if="getIsShowLogo"
      class="text-16px font-bold border-b-solid border-b-1 border-b-[var(--color-fill-2)]"
      :theme="theme"
      :show-title="!getCollapsed"
      :style="{ height: `${getHeaderHeight + 1}px` }"
    />
    <LayoutMenu :theme="theme" :menus="getMenus"></LayoutMenu>
  </div>
</template>

<script lang="ts" setup>
  import { computed, unref } from 'vue';
  import { AppLogo } from '@/components/AppLogo';
  import { LayoutMenu } from '@/layout/common';
  import {
    useHeaderSetting,
    useMenuSetting,
    useRootSetting,
  } from '@/hooks/setting';
  import { AppEnum } from '@/enums';
  import { useRouteStore } from '@/store/modules/route';

  interface Props {
    /**
     * The theme of the current parent component - [当前父组件的主题]
     */
    theme?: AppEnum;
  }

  defineProps<Props>();

  const { getShowLogo } = useRootSetting();
  const { getIsSidebarType, getCollapsed } = useMenuSetting();
  const { getHeaderHeight } = useHeaderSetting();
  const { getMenus } = useRouteStore();

  const getIsShowLogo = computed(
    () => unref(getShowLogo) && unref(getIsSidebarType),
  );
</script>

<style lang="less" scoped></style>
