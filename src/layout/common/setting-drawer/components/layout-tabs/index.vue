<!--
 * @Description: 项目配置-布局-标签页
 * @Author: LLiuHuan
 * @Date: 2024-08-21 16:29:11
 * @LastEditTime: 2024-08-22 12:54:13
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
  import { useI18n } from '@/hooks/web/useI18n';
  import { useMultipleTabSetting } from '@/hooks/setting';
  import { HandlerEnum, SettingItem, SwitchItem, TitleItem } from '../common';

  const { getShowMultipleTab, getShowQuick, getShowRedo, getShowFold } =
    useMultipleTabSetting();

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
      <SettingItem key="11" :label="t('layout.setting.layout.tabs.title')">
        <SwitchItem :def="getShowMultipleTab" :event="HandlerEnum.SHOW_TABS" />
      </SettingItem>
      <SettingItem key="12" :label="t('layout.setting.layout.tabs.showQuick')">
        <SwitchItem
          :def="getShowQuick"
          :event="HandlerEnum.SHOW_TABS_QUICK_BTN"
        />
      </SettingItem>
      <SettingItem key="13" :label="t('layout.setting.layout.tabs.showRedo')">
        <SwitchItem
          :def="getShowRedo"
          :event="HandlerEnum.SHOW_TABS_REDO_BTN"
        />
      </SettingItem>
      <SettingItem key="14" :label="t('layout.setting.layout.tabs.showFold')">
        <SwitchItem
          :def="getShowFold"
          :event="HandlerEnum.SHOW_TABS_FOLD_BTN"
        />
      </SettingItem>
    </TransitionGroup>
  </div>
</template>

<style lang="less" scoped></style>
