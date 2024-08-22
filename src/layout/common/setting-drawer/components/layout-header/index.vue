<!--
 * @Description: 项目配置-布局-头部
 * @Author: LLiuHuan
 * @Date: 2024-08-20 00:34:20
 * @LastEditTime: 2024-08-21 15:41:01
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
  import { useI18n } from '@/hooks/web/useI18n';
  import {
    useHeaderSetting,
    useLayoutSetting,
    useRootSetting,
  } from '@/hooks/setting';
  import { computed, unref } from 'vue';
  import {
    HandlerEnum,
    SettingItem,
    InputNumberItem,
    SwitchItem,
    TitleItem,
  } from '../common';

  const { t } = useI18n();

  const { getHeaderHeight } = useHeaderSetting();
  const { getLayoutScrollMode } = useLayoutSetting();
  const { getFixedHeaderAndTab } = useRootSetting();

  const isWrapperScrollMode = computed(
    () => unref(getLayoutScrollMode) === 'wrapper',
  );
</script>

<template>
  <div class="flex flex-col py-4">
    <TitleItem>{{ t('layout.setting.layout.header.title') }}</TitleItem>

    <TransitionGroup
      class="flex-col-stretch"
      name="interface-function"
      tag="div"
    >
      <SettingItem key="6" :label="t('layout.setting.layout.header.height')">
        <InputNumberItem
          :def="getHeaderHeight"
          :event="HandlerEnum.HEADER_HEIGHT"
          :min="48"
        />
      </SettingItem>
      <SettingItem
        v-if="isWrapperScrollMode"
        key="9"
        :label="t('layout.setting.layout.header.fixed')"
      >
        <SwitchItem
          :def="getFixedHeaderAndTab"
          :event="HandlerEnum.HEADER_FIXED"
        />
      </SettingItem>
    </TransitionGroup>
  </div>
</template>

<style lang="less" scoped></style>
