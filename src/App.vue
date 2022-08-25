<template>
  <a-config-provider :locale="zhCN">
    <RouterView />
  </a-config-provider>
</template>

<script lang="ts" setup>
  import { watch } from 'vue';
  import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';
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
</script>

<style lang="less">
  //@import 'styles/index.less';
</style>
