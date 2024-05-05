<template>
  <div class="h-full flex-y-center bg-[--color-bg-2] w-full shadow-header">
    <!--  left start  -->
    <AppLogo
      v-if="showLogo"
      class="h-full text-16px font-bold pl-20px pr-10px justify-start"
      :style="{ width: `${getMenuWidth}px` }"
    />
    <LayoutVerticalMenu
      v-if="showMenu"
      :menus="headerMenus"
      :mode="MenuModeEnum.HORIZONTAL"
      class="px-12px"
    />
    <div v-else class="h-full flex-y-center flex-1-hidden">
      <LayoutTrigger v-if="showMenuToggle" :sider="false"></LayoutTrigger>
      <Breadcrumb
        v-if="!getIsMobile && getShowContent && getShowBread"
        class="pl-5px"
      />
    </div>
    <!--  left end  -->

    <!--  right start  -->
    <div class="flex-center h-40px">
      <Search />
      <ThemeBtn />
      <LanguageBtn />
      <FullScreenBtn v-if="!getIsMobile" />
      <SettingBtn />
      <UserAvatar />
    </div>
    <!--  right end  -->
  </div>
</template>

<script lang="ts" setup>
  import {
    useHeaderSetting,
    useMenuSetting,
    useRootSetting,
  } from '@/hooks/setting';
  import { useRouteStoreWithOut } from '@/store/modules/route';
  import { MenuModeEnum } from '@/enums';
  import { AppLogo } from '@/components/AppLogo';
  import { App } from '~/types/app';
  import { computed, unref } from 'vue';
  import { useLayoutSetting } from '@/hooks/setting/useLayoutSetting';
  import { useMixMenuContext } from '@/layout/context';
  import LayoutTrigger from '../trigger/index.vue';
  import {
    Breadcrumb,
    FullScreenBtn,
    LanguageBtn,
    Search,
    SettingBtn,
    ThemeBtn,
    UserAvatar,
  } from './components';
  import { LayoutVerticalMenu } from '../menu';

  interface Props {
    /** Whether to show the logo */
    showLogo?: App.Header['showLogo'];
    /** Whether to show the menu toggle */
    showMenuToggle?: App.Header['showMenuToggle'];
    /** Whether to show the menu */
    showMenu?: App.Header['showMenu'];
  }

  defineProps<Props>();

  const { getIsMobile } = useRootSetting();
  const { getMenuWidth } = useMenuSetting();
  const { getShowBread, getShowContent } = useHeaderSetting();
  const { getLayoutMode } = useLayoutSetting();
  const { getMenus } = useRouteStoreWithOut();
  const { menus } = useMixMenuContext();

  const headerMenus = computed(() => {
    if (unref(getLayoutMode) === MenuModeEnum.HORIZONTAL) {
      return getMenus;
    }

    if (unref(getLayoutMode) === MenuModeEnum.HORIZONTAL_MIX) {
      return unref(menus);
    }

    return [];
  });
</script>

<style lang="less" scoped></style>
