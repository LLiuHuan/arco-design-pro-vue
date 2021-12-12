<template>
  <a-config-provider :locale="zhCN">
    <RouterView />
  </a-config-provider>
</template>

<script lang="ts">
  // import enUs from '@arco-design/web-vue/es/locale/lang/en-us';
  import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';
  import { defineComponent, ref } from 'vue';
  import { useStore } from 'vuex';
  import { GettersType as SettingGetters } from '@/store/modules/settings/getters';
  import { GettersType as UserGetters } from '@/store/modules/user/getters';
  export default defineComponent({
    name: 'App',
    setup() {
      const store = useStore();
      const loading = ref<Boolean>(store.getters[SettingGetters.GET_LOADING]);
      const theme = store.getters[UserGetters.GET_MODE] || 'dark';
      // 设置为暗黑主题
      document.body.setAttribute('arco-theme', theme === 'dark' ? 'dark' : 'light');

      document.body.style.setProperty(
        `--arcoblue-6`,
        store.getters[UserGetters.GET_BASE_COLOR] ?? '5, 160, 69'
      );

      return {
        zhCN,
        loading,
      };
    },
  });
</script>

<style lang="less">
  @import 'styles/index.less';
</style>
