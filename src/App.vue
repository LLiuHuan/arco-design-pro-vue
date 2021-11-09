<template>
  <a-config-provider :locale="zhCN">
    <RouterView />
  </a-config-provider>
</template>

<script lang="ts">
  // import enUs from '@arco-design/web-vue/es/locale/lang/en-us';
  import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'App',
    setup() {
      // 设置为暗黑主题
      document.body.setAttribute('arco-theme', 'dark');

      return {
        zhCN,
      };
    },
  });
</script>

<style lang="less">
  @import 'styles/index.less';
</style>
