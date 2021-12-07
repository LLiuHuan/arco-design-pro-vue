<template>
  <a-config-provider :locale="zhCN">
    <RouterView />
  </a-config-provider>
</template>

<script lang="ts">
  // import enUs from '@arco-design/web-vue/es/locale/lang/en-us';
  import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';
  import { defineComponent } from 'vue';
  import { storage } from '@/utils/storage';
  export default defineComponent({
    name: 'App',
    setup() {
      const theme = storage.get('theme') || 'dark';
      // 设置为暗黑主题
      document.body.setAttribute('arco-theme', theme === 'dark' ? 'dark' : 'light');

      const localeName = localStorage.getItem('arco-lang') || 'zh-CN';

      if (!localStorage.getItem('arco-lang')) {
        localStorage.setItem('arco-lang', localeName);
      }

      document.body.style.setProperty(
        `--arcoblue-6`,
        localStorage.getItem('color') ?? '5, 160, 69'
      );

      return {
        zhCN,
      };
    },
  });
</script>

<style lang="less">
  @import 'styles/index.less';
</style>
