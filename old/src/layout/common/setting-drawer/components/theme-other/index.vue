<!--
 * @Description: 项目配置-外观-其他
 * @Author: LLiuHuan
 * @Date: 2024-08-19 23:30:46
 * @LastEditTime: 2024-08-21 16:40:18
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
  import { useRootSetting } from '@/hooks/setting';
  import { useI18n } from '@/hooks/web/useI18n';
  import { HandlerEnum, SettingItem, SwitchItem, TitleItem } from '../common';

  const { getWeakMode, getGrayMode } = useRootSetting();

  const { t } = useI18n();
</script>

<template>
  <div class="flex flex-col py-4">
    <TitleItem>{{ t('layout.setting.exterior.other.title') }}</TitleItem>

    <SettingItem key="8" :label="t('layout.setting.exterior.other.grayMode')">
      <SwitchItem :def="getGrayMode" :event="HandlerEnum.GRAY_MODE" />
    </SettingItem>
    <SettingItem key="9" :label="t('layout.setting.exterior.other.colorWeak')">
      <SwitchItem :def="getWeakMode" :event="HandlerEnum.WEAK_MODE" />
    </SettingItem>
  </div>
</template>

<style lang="less" scoped></style>
