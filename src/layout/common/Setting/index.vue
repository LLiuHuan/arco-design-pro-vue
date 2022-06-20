<template>
  <a-drawer
    :width="350"
    :visible="app.settingDrawerVisible"
    :cancel-text="$t('settings.close')"
    :ok-text="$t('settings.copySettings')"
    @ok="copySettings"
    @cancel="cancel"
    unmountOnClose
  >
    <template #title> {{ $t('settings.title') }} </template>
    <DarkMode />
    <LayoutMode />
    <PageFunc />
    <PageView />
    <a-alert class="mt-10px">{{ $t('settings.alertContent') }}</a-alert>
  </a-drawer>
</template>

<script lang="ts" setup>
  import { Message } from '@arco-design/web-vue';
  import { useClipboard } from '@vueuse/core';
  import { useI18n } from 'vue-i18n';
  import { useAppStore, useThemeStore } from '@/store';
  import { DarkMode, LayoutMode, PageFunc, PageView } from './components';

  const app = useAppStore();
  const theme = useThemeStore();
  const { t } = useI18n();
  const { copy } = useClipboard();

  const cancel = () => {
    app.closeSettingDrawer();
  };

  const copySettings = async () => {
    const text = JSON.stringify(theme.$state, null, 2);
    await copy(text);
    Message.success(t('settings.copySettings.message'));
  };
</script>

<style lang="less" scoped></style>
