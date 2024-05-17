<template>
  <ADrawer
    :drawer-style="{ padding: 0 }"
    :title="$t('layout.setting.drawerTitle')"
    :visible="getSettingDrawerState"
    :width="getIsMobile ? '90%' : '320px'"
    class="overflow-hidden setting-drawer"
    unmount-on-close
    @cancel="handleCancel"
    @ok="handleOk"
  >
    <template #footer>
      <ASpace :size="16" class="w-full" direction="vertical">
        <AButton class="w-full" type="primary" @click="copySettings">
          <template #icon>
            <icon-copy />
          </template>
          {{ $t('layout.setting.copyBtn') }}
        </AButton>
        <AButton
          class="w-full"
          status="warning"
          type="primary"
          @click="handleResetSetting"
        >
          <template #icon>
            <icon-refresh />
          </template>
          {{ $t('layout.setting.resetBtn') }}
        </AButton>
      </ASpace>
    </template>
    <AScrollbar class="overflow-auto h-full" outer-class="h-full">
      <ThemeSchema />
      <LayoutMode />
      <ThemeColor />
      <InterfaceFunction />
      <InterfaceDisplay />
    </AScrollbar>
  </ADrawer>
</template>

<script lang="ts" setup>
  import { useRootSetting } from '@/hooks/setting';
  import { useI18n } from '@/hooks/web/useI18n';
  import { defaultSetting } from '@/settings';
  import { unref } from 'vue';
  import { copyText } from '@/utils/common/copy';
  import {
    InterfaceDisplay,
    InterfaceFunction,
    LayoutMode,
    ThemeColor,
    ThemeSchema,
  } from './components';

  defineOptions({
    name: 'LayoutSettingDrawer',
  });

  const {
    getSettingDrawerState,
    setSettingDrawerState,
    getRootSetting,
    setRootSetting,
    getIsMobile,
  } = useRootSetting();
  const { t } = useI18n();

  const handleOk = () => {
    setSettingDrawerState(false);
  };

  const handleCancel = () => {
    setSettingDrawerState(false);
  };

  const copySettings = async () => {
    const text = JSON.stringify(unref(getRootSetting), null, 2);
    await copyText(text, t('layout.setting.copySettingMsg'));
  };

  const handleResetSetting = () => {
    try {
      setRootSetting(defaultSetting);
    } catch (error: any) {
      console.error(error);
    }
  };
</script>

<style lang="less" scoped>
  :deep(.arco-drawer-body) {
    padding: 0;
  }
</style>
