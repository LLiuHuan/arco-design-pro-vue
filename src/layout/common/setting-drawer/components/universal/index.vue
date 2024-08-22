<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2024-08-20 17:04:10
 * @LastEditTime: 2024-08-22 12:36:25
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
  import { useI18n } from '@/hooks/web/useI18n';
  import { useRootSetting } from '@/hooks/setting';
  import {
    HandlerEnum,
    TitleItem,
    SettingItem,
    SwitchItem,
    InputItem,
  } from '../common';

  defineOptions({
    name: 'Universal',
  });

  const { getShowWatermark, getWatermarkText } = useRootSetting();

  const { t } = useI18n();
</script>

<template>
  <div class="flex flex-col py-4">
    <TitleItem>{{ t('layout.setting.universal.setting.title') }}</TitleItem>

    <TransitionGroup
      class="flex-col-stretch"
      name="interface-function"
      tag="div"
    >
      <SettingItem
        key="universal-1"
        :label="t('layout.setting.universal.setting.watermark')"
      >
        <SwitchItem :def="getShowWatermark" :event="HandlerEnum.WATERMARK" />
      </SettingItem>
      <SettingItem
        key="universal-2"
        :label="t('layout.setting.universal.setting.watermarkText')"
      >
        <InputItem
          :def="getWatermarkText"
          :event="HandlerEnum.WATERMARK_TEXT"
        />
      </SettingItem>
    </TransitionGroup>
  </div>
</template>

<style lang="less" scoped></style>
