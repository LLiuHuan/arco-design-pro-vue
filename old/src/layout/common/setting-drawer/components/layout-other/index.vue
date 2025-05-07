<!--
 * @Description: 项目配置-布局-其他
 * @Author: LLiuHuan
 * @Date: 2024-08-21 16:37:22
 * @LastEditTime: 2024-08-22 12:52:59
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
  import { useLayoutSetting, useRootSetting } from '@/hooks/setting';
  import { useI18n } from '@/hooks/web/useI18n';
  import {
    HandlerEnum,
    SettingItem,
    SwitchItem,
    SelectItem,
    TitleItem,
  } from '../common';
  import { getScrollModeOptions } from './helpers';

  const { getLayoutScrollMode } = useLayoutSetting();
  const { getShowLogo } = useRootSetting();

  const scrollModeOptions = getScrollModeOptions();

  const { t } = useI18n();
</script>

<template>
  <div class="flex flex-col py-4">
    <TitleItem>{{ t('layout.setting.layout.other.title') }}</TitleItem>

    <TransitionGroup
      class="flex-col-stretch"
      name="interface-function"
      tag="div"
    >
      <SettingItem key="10" :label="t('layout.setting.layout.other.showLogo')">
        <SwitchItem :def="getShowLogo" :event="HandlerEnum.SHOW_LOGO" />
      </SettingItem>

      <SettingItem
        key="12"
        :label="t('layout.setting.layout.other.scrollMode.title')"
      >
        <SelectItem
          :def="getLayoutScrollMode"
          :event="HandlerEnum.LAYOUT_SCROLL_MODE"
          :options="scrollModeOptions"
        />
      </SettingItem>
    </TransitionGroup>
  </div>
</template>

<style lang="less" scoped></style>
