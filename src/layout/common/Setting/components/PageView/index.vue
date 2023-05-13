<template>
  <a-divider orientation="center">{{ $t('settings.interface.display') }}</a-divider>
  <a-space direction="vertical" fill>
    <setting-menu :label="$t('settings.interface.display.crumbs')">
      <a-switch :model-value="theme.header.crumb.visible" @change="theme.setHeaderCrumbVisible" />
    </setting-menu>
    <setting-menu :label="$t('settings.interface.display.crumbs.icon')">
      <a-switch
        :model-value="theme.header.crumb.showIcon"
        @change="theme.setHeaderCrumbIconVisible"
      />
    </setting-menu>
    <setting-menu :label="$t('settings.interface.display.multiple.tabs')">
      <a-switch :model-value="theme.tab.visible" @change="theme.setTabVisible" />
    </setting-menu>
    <setting-menu :label="$t('settings.interface.display.page.switching')">
      <a-switch :model-value="theme.page.animate" @change="theme.setPageIsAnimate" />
    </setting-menu>
    <setting-menu :label="$t('settings.interface.display.page.switching.type')">
      <a-select
        class="max-w-120px"
        size="small"
        :options="animateModeList"
        @change="theme.setPageAnimateMode"
        :model-value="theme.page.animateMode"
      />
    </setting-menu>
  </a-space>
</template>

<script lang="ts" setup>
  import { useThemeStore } from '@/store';
  import { computed } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { pageAnimateModeList } from '@/settings';
  import SettingMenu from '../SettingMenu/index.vue';

  const { t } = useI18n();
  const animateModeList = computed(() => {
    return [...pageAnimateModeList].map(({ label, value }) => {
      return { label: t(label), value: value };
    });
  });

  const theme = useThemeStore();
</script>
<style scoped></style>
