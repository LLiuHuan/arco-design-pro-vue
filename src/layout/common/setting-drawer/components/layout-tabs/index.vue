<!--
 * @Description: 项目配置-布局-标签页
 * @Author: LLiuHuan
 * @Date: 2024-08-21 16:29:11
 * @LastEditTime: 2024-08-23 17:31:51
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
  import { useI18n } from '@/hooks/web/useI18n';
  import { useMultipleTabSetting } from '@/hooks/setting';
  import { HandlerEnum, SettingItem, SwitchItem, TitleItem } from '../common';

  const {
    getShowMultipleTab,
    getTabOpenCache,
    getShowQuick,
    getShowRedo,
    getShowFold,
  } = useMultipleTabSetting();

  const { t } = useI18n();
</script>

<template>
  <div class="flex flex-col py-4">
    <TitleItem>{{ t('layout.setting.layout.tabs.title') }}</TitleItem>

    <TransitionGroup
      class="flex-col-stretch"
      name="interface-function"
      tag="div"
    >
      <SettingItem key="tab-1" :label="t('layout.setting.layout.tabs.title')">
        <SwitchItem :def="getShowMultipleTab" :event="HandlerEnum.SHOW_TABS" />
      </SettingItem>
      <SettingItem
        key="tab-2"
        :label="t('layout.setting.layout.tabs.openCache')"
      >
        <SwitchItem
          :def="getTabOpenCache"
          :event="HandlerEnum.TAB_OPEN_CACHE"
        />
      </SettingItem>
      <SettingItem
        key="tab-3"
        :label="t('layout.setting.layout.tabs.showQuick')"
      >
        <SwitchItem
          :def="getShowQuick"
          :event="HandlerEnum.SHOW_TABS_QUICK_BTN"
        />
      </SettingItem>
      <SettingItem
        key="tab-4"
        :label="t('layout.setting.layout.tabs.showRedo')"
      >
        <SwitchItem
          :def="getShowRedo"
          :event="HandlerEnum.SHOW_TABS_REDO_BTN"
        />
      </SettingItem>
      <SettingItem
        key="tab-5"
        :label="t('layout.setting.layout.tabs.showFold')"
      >
        <SwitchItem
          :def="getShowFold"
          :event="HandlerEnum.SHOW_TABS_FOLD_BTN"
        />
      </SettingItem>
    </TransitionGroup>
  </div>
</template>

<style lang="less" scoped></style>
