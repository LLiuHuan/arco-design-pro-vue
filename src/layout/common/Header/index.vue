<template>
  <a-layout-header
    :class="theme.fixedHeaderAndTab ? 'layout-header-fixed' : 'layout-header'"
    :style="{
      height: theme.header.height + 'px',
      paddingLeft: siderVisible ? headerLeft + 'px' : 0,
      zIndex: theme.layout.mode === 'horizontal-mix' ? '6' : '4',
    }"
  >
    <dark-mode-container class="header flex-y-center h-full" :inverted="theme.header.inverted">
      <Logo
        v-if="props.showLogo"
        :show-title="true"
        :png-logo="LogoPng"
        class="h-full"
        :style="{ width: theme.sider.width + 'px' }"
      />
      <div v-if="!props.showHeaderMenu" class="flex-1-hidden flex-y-center h-full">
        <MenuCollapse v-if="props.showMenuCollapse" />
        <Breadcrumb v-if="theme.header.crumb.visible" />
      </div>
      <div
        v-else
        class="flex-y-center h-full flex-1"
        :style="{ justifyContent: theme.menu.horizontalPosition }"
      >
        <!--        <HeaderMenu />-->
        <Menu :menus="routeStore.menus" :mode="'horizontal'" />
      </div>
      <div class="flex justify-end h-full pr-30px ribbon">
        <Github />
        <ThemeModel />
        <Locale />
        <Fullscreen />
        <Setting />
        <User class="user" />
      </div>
    </dark-mode-container>
  </a-layout-header>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useAppStore, useRouteStore, useThemeStore } from '@/store';
  import { useBasicLayout } from '@/composables';
  import { Logo, Menu } from '@/layout/common';
  import LogoPng from '@/assets/logo.png';
  import {
    Breadcrumb,
    MenuCollapse,
    Github,
    ThemeModel,
    Locale,
    Fullscreen,
    User,
    Setting,
  } from './components';

  interface Props {
    /** 显示logo */
    showLogo: GlobalHeaderProps['showLogo'];
    /** 显示头部菜单 */
    showHeaderMenu: GlobalHeaderProps['showHeaderMenu'];
    /** 显示菜单折叠按钮 */
    showMenuCollapse: GlobalHeaderProps['showMenuCollapse'];
  }

  const props = defineProps<Props>();

  const theme = useThemeStore();
  const app = useAppStore();
  const routeStore = useRouteStore();

  const { siderVisible } = useBasicLayout();

  const headerLeft = computed((): number => {
    if (!theme.fixedHeaderAndTab) return 0;
    if (theme.layout.mode.includes('horizontal-mix')) return 0;
    const { siderWidth, siderCollapsedWidth } = useBasicLayout();
    return app.siderCollapse ? siderCollapsedWidth.value : siderWidth.value;
  });
</script>

<style lang="less" scoped>
  .arco-layout-header {
    position: fixed;
    z-index: 1001;
    flex-shrink: 0;
    box-sizing: border-box;
    transition-property: padding-left;
    border-bottom: 1px solid var(--color-border);
  }

  .layout-header-fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    transition: width 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
    transform: translateX(0px);
  }

  .layout-header {
    position: static;
    transition: width 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
    transform: translateX(0px);
    width: 100%;
  }
</style>
