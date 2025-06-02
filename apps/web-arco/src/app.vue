<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-28 11:47:26
 * @LastEditTime: 2025-05-28 12:02:01
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import { computed, watch } from 'vue';

import { preferences } from '@arco/preferences';

import { ConfigProvider } from '@arco-design/web-vue';
import enUS from '@arco-design/web-vue/es/locale/lang/en-us';
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';

defineOptions({ name: 'App' });

// const { commonTokens } = useNaiveDesignTokens();

const tokenLocale = computed(() =>
  preferences.app.locale === 'zh-CN' ? zhCN : enUS,
);

watch(
  () => preferences.theme.mode,
  (mode) => {
    if (mode === 'dark') {
      document.body.setAttribute('arco-theme', 'dark');
    } else {
      document.body.removeAttribute('arco-theme');
    }
  },
);
</script>

<template>
  <ConfigProvider :locale="tokenLocale" class="h-full">
    <RouterView />
  </ConfigProvider>
</template>
