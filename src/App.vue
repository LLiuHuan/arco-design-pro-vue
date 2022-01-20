<template>
  <a-config-provider :locale="zhCN">
    <RouterView />
  </a-config-provider>
</template>

<script lang="ts">
  // import enUs from '@arco-design/web-vue/es/locale/lang/en-us';
  import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';
  import { defineComponent } from 'vue';
  import { useSettingsStore } from '@/store/modules/settings';
  import { useUserStore } from '@/store/modules/users';
  export default defineComponent({
    name: 'App',
    setup() {
      const settingStore = useSettingsStore();
      const userStore = useUserStore();
      const theme = settingStore.getTheme || 'dark';
      // 设置为暗黑主题
      document.body.setAttribute('arco-theme', theme === 'dark' ? 'dark' : 'light');
      document.body.style.setProperty(`--arcoblue-6`, userStore.getBaseColor ?? '5, 160, 69');

      return {
        zhCN,
      };
    },
  });
</script>

<style lang="less">
  @import 'styles/index.less';
</style>
