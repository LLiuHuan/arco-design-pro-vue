<template>
  <div class="size-full flex-col-stretch shadow-sider">
    <AppLogo
      v-if="getIsShowLogo"
      class="text-16px font-bold border-b border-solid border-0"
      :class="[
        theme && theme === AppEnum.LIGHT && !getIsDarkMode
          ? 'border-b-[rgba(242,243,245,1)]'
          : 'border-b-[rgba(46,46,48,1)]',
      ]"
      :theme="theme"
      :show-title="!getCollapsed"
      :style="{ height: `${getHeaderHeight + 1}px` }"
    />
    <VerticalMenu
      :theme="theme"
      :menus="getMenus"
      @menu-click="handleMenuClick"
    />
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
  import { AppEnum } from '@/enums';
  import { useRouteStore } from '@/store/modules/route';
  import { useGo } from '@/hooks/web/usePage';
  import { routeName } from '@/utils/router';
  import { VerticalMenu } from './components';

  const { getShowLogo } = useRootSetting();
  const { getIsSidebarType, getCollapsed } = useMenuSetting();
  const { getHeaderHeight } = useHeaderSetting();
  const { goKey } = useGo();

  interface Props {
    /**
     * The theme of the current parent component - [当前父组件的主题]
     */
    theme?: AppEnum;
  }

  defineProps<Props>();

  const { getMenus } = useRouteStore();
  const { getIsDarkMode } = useRootSetting();

  const getIsShowLogo = computed(
    () => unref(getShowLogo) && unref(getIsSidebarType),
  );

  const handleMenuClick = (key: any) => {
    console.log('menu click', key);
    const routeSplitMark = '_';
    const params: Record<string, string> = {};
    key
      .split(routeSplitMark)
      .filter((v: string) => v.startsWith(':'))
      .forEach((v: string) => {
        params[v.replaceAll(':', '')] = v;
      });
    goKey(routeName(key), { params });
  };
</script>

<style lang="less" scoped></style>
