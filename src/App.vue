<template>
  <a-config-provider :locale="enUs">
    <RouterView />
  </a-config-provider>
</template>

<script lang="ts">
  import enUs from '@arco-design/web-vue/es/locale/lang/en-us';
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'App',
    setup() {
      // 设置为暗黑主题
      document.body.setAttribute('arco-theme', 'dark');

      return {
        enUs,
      };
    },
  });
</script>

<style lang="less">
  @import 'styles/index.less';
</style>
