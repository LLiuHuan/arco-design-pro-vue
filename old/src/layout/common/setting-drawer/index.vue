<script lang="ts" setup>
  import { useRootSetting } from '@/hooks/setting';
  import { useI18n } from '@/hooks/web/useI18n';
  import { defaultSetting } from '@/settings';
  import { unref } from 'vue';
  import { copyText } from '@/utils/common/copy';
  import {
    LayoutMode,
    LayoutSider,
    LayoutBreadcrumb,
    LayoutHeader,
    LayoutFooter,
    LayoutTabs,
    LayoutOther,
    LayoutCopyright,
    ThemeColor,
    ThemeOther,
    ThemeSchema,
    Universal,
    UniversalAnimation,
  } from './components';

  defineOptions({
    name: 'LayoutSettingDrawer',
  });

  const {
    getSettingDrawerState,
    getRootSetting,
    getIsMobile,
    setSettingDrawerState,
    setRootSetting,
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

<template>
  <ADrawer
    :drawer-style="{ padding: 0 }"
    :title="t('layout.setting.drawerTitle')"
    :visible="getSettingDrawerState"
    :width="getIsMobile ? '90%' : '380px'"
    class="overflow-hidden setting-drawer"
    unmount-on-close
    @cancel="handleCancel"
    @ok="handleOk"
  >
    <template #title>
      <div class="flex flex-col">
        <div>{{ t('layout.setting.drawerTitle') }}</div>
        <div class="text-[var(--color-text-3)] text-xs">
          {{ t('layout.setting.drawerDesc') }}
        </div>
      </div>
    </template>
    <template #footer>
      <ASpace :size="16" class="w-full" direction="vertical">
        <AButton class="w-full" type="primary" @click="copySettings">
          <template #icon>
            <icon-copy />
          </template>
          {{ t('layout.setting.copyBtn') }}
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
          {{ t('layout.setting.resetBtn') }}
        </AButton>
      </ASpace>
    </template>
    <AScrollbar class="overflow-auto h-full" outer-class="h-full">
      <a-tabs animation class="w-full justify-center">
        <a-tab-pane key="exterior" :title="t('layout.setting.exterior.title')">
          <a-space direction="vertical" fill>
            <ThemeSchema />
            <ThemeColor />
            <ThemeOther />
          </a-space>
        </a-tab-pane>
        <a-tab-pane key="layout" :title="t('layout.setting.layout.title')">
          <a-space direction="vertical" fill>
            <LayoutMode />
            <LayoutSider />
            <LayoutHeader />
            <LayoutBreadcrumb />
            <LayoutTabs />
            <LayoutOther />
            <LayoutFooter />
            <LayoutCopyright />
            <!-- <InterfaceFunction /> -->
            <!-- <InterfaceDisplay /> -->
          </a-space>
        </a-tab-pane>
        <a-tab-pane
          key="universal"
          :title="t('layout.setting.universal.title')"
        >
          <a-space direction="vertical" fill>
            <Universal />
            <UniversalAnimation />
          </a-space>
        </a-tab-pane>
      </a-tabs>
    </AScrollbar>
  </ADrawer>
</template>

<style lang="less" scoped>
  :deep(.arco-drawer-body) {
    padding: 0;
  }
</style>
