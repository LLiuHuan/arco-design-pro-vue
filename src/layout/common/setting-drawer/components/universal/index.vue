<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2024-08-20 17:04:10
 * @LastEditTime: 2024-10-18 12:47:37
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
    InputNumberItem,
  } from '../common';

  defineOptions({
    name: 'Universal',
  });

  const { getShowWatermark, getWatermarkText, getBorderRadius } =
    useRootSetting();

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
      <SettingItem
        key="universal-3"
        :label="t('layout.setting.universal.setting.borderRadius')"
      >
        <InputNumberItem
          :def="getBorderRadius"
          :event="HandlerEnum.BORDER_RADIUS"
          :min="0"
        />
      </SettingItem>
    </TransitionGroup>
  </div>
</template>

<style lang="less" scoped></style>
