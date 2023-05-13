<template>
  <a-config-provider :locale="locale">
    <RouterView />
  </a-config-provider>
</template>

<script lang="ts" setup>
  import { computed, watch } from 'vue';
  import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';
  import enUS from '@arco-design/web-vue/es/locale/lang/en-us';
  import { useThemeStore } from '@/store';

  const theme = useThemeStore();

  // created
  document.body.setAttribute('arco-theme', theme.naiveTheme);

  watch(
    () => theme.naiveTheme,
    (newTheme) => {
      document.body.setAttribute('arco-theme', newTheme ?? '');
    }
  );

  const locale = computed(() => {
    switch (theme.language) {
      case 'zh-CN':
        return zhCN;
      case 'en-US':
        return enUS;
      default:
        return zhCN;
    }
  });
</script>

<style lang="less">
  //@import 'styles/index.less';
</style>
