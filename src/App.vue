<template>
  <a-config-provider :locale="zhCN">
    <RouterView />
  </a-config-provider>
</template>

<script lang="ts">
  import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'App',
    setup() {
      return {
        zhCN,
      };
    },
  });
</script>

<style lang="less">
  @import 'styles/index.less';
</style>
