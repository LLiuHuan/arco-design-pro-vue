<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2026-02-19 01:29:54
 * @LastEditTime: 2026-02-19 01:37:58
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import { computed } from 'vue';

import { antdLocale } from '#/locales';
import { useAntdDesignTokens } from '@qin/hooks';
import { preferences, usePreferences } from '@qin/preferences';
import { App, ConfigProvider, theme } from 'antdv-next';

defineOptions({ name: 'App' });

const { isDark } = usePreferences();
const { tokens } = useAntdDesignTokens();

const tokenTheme = computed(() => {
  const algorithm = isDark.value
    ? [theme.darkAlgorithm]
    : [theme.defaultAlgorithm];

  // antd 紧凑模式算法
  if (preferences.app.compact) {
    algorithm.push(theme.compactAlgorithm);
  }

  return {
    algorithm,
    token: tokens,
  };
});
</script>

<template>
  <ConfigProvider :locale="antdLocale" :theme="tokenTheme">
    <App>
      <RouterView />
    </App>
  </ConfigProvider>
</template>
