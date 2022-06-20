<template>
  <a-divider orientation="center">界面显示</a-divider>
  <a-space direction="vertical" fill>
    <setting-menu label="面包屑">
      <a-switch :model-value="theme.header.crumb.visible" @change="theme.setHeaderCrumbVisible" />
    </setting-menu>
    <setting-menu label="面包屑图标">
      <a-switch
        :model-value="theme.header.crumb.showIcon"
        @change="theme.setHeaderCrumbIconVisible"
      />
    </setting-menu>
    <setting-menu label="多页签">
      <a-switch :model-value="theme.tab.visible" @change="theme.setTabVisible" />
    </setting-menu>
    <setting-menu label="页面切换动画">
      <a-switch :model-value="theme.page.animate" @change="theme.setPageIsAnimate" />
    </setting-menu>
    <setting-menu label="页面切换动画类型">
      <a-select
        class="max-w-120px"
        size="small"
        :options="theme.page.animateModeList"
        @change="theme.setPageAnimateMode"
        :model-value="theme.page.animateMode"
      />
    </setting-menu>
  </a-space>
</template>

<script lang="ts" setup>
  import { useThemeStore } from '@/store';
  import SettingMenu from '../SettingMenu/index.vue';

  const theme = useThemeStore();
</script>
<style scoped></style>
