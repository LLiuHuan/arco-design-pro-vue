<template>
  <ADrawer
    :width="360"
    :visible="getSettingDrawerState"
    :title="$t('layout.setting.drawerTitle')"
    unmount-on-close
    class="overflow-y-auto overflow-x-hidden"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <template #footer>
      <ASpace :size="16" direction="vertical" class="w-full">
        <AButton class="w-full" type="primary" @click="copySettings">
          <template #icon>
            <icon-copy />
          </template>
          {{ $t('layout.setting.copyBtn') }}
        </AButton>
        <AButton
          class="w-full"
          type="primary"
          status="warning"
          @click="handleResetSetting"
        >
          <template #icon>
            <icon-refresh />
          </template>
          {{ $t('layout.setting.resetBtn') }}
        </AButton>
      </ASpace>
    </template>
    <div class="overflow-hidden">
      <ThemeSchema />
      <LayoutMode />
      <ThemeColor />
      <InterfaceFunction />
      <InterfaceDisplay />
    </div>
  </ADrawer>
</template>

<script lang="ts" setup>
  import { useRootSetting } from '@/hooks/setting';
  import { useClipboard } from '@vueuse/core';
  import { Message } from '@arco-design/web-vue';
  import { useI18n } from '@/hooks/web/useI18n';
  import { appSetting } from '@/settings';
  import { unref } from 'vue';
  import {
    ThemeSchema,
    ThemeColor,
    InterfaceFunction,
    InterfaceDisplay,
    LayoutMode,
  } from './components';

  defineOptions({
    name: 'LayoutSettingDrawer',
  });

  const {
    getSettingDrawerState,
    setSettingDrawerState,
    getRootSetting,
    setRootSetting,
  } = useRootSetting();
  const { copy } = useClipboard();
  const { t } = useI18n();

  const handleOk = () => {
    setSettingDrawerState(false);
  };

  const handleCancel = () => {
    setSettingDrawerState(false);
  };

  const copySettings = async () => {
    const text = JSON.stringify(unref(getRootSetting), null, 2);
    await copy(text);
    Message.success(t('layout.setting.copySettingMsg'));
  };

  const handleResetSetting = () => {
    try {
      setRootSetting(appSetting);
    } catch (error: any) {
      console.error(error);
    }
  };
</script>

<style lang="less" scoped></style>
