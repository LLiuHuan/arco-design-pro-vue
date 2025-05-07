<!--
 * @Description: 项目配置-布局-底部
 * @Author: LLiuHuan
 * @Date: 2024-08-21 15:43:41
 * @LastEditTime: 2024-08-21 16:39:07
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
  import { useI18n } from '@/hooks/web/useI18n';
  import { useFooterSetting, useLayoutSetting } from '@/hooks/setting';
  import { computed, unref } from 'vue';
  import {
    HandlerEnum,
    SettingItem,
    InputNumberItem,
    SwitchItem,
    TitleItem,
  } from '../common';

  const { t } = useI18n();

  const { getFooterHeight, getFooterFixed, getShowFooter } = useFooterSetting();
  const { getLayoutScrollMode } = useLayoutSetting();

  const isWrapperScrollMode = computed(
    () => unref(getLayoutScrollMode) === 'wrapper',
  );
</script>

<template>
  <div class="flex flex-col py-4">
    <TitleItem>{{ t('layout.setting.layout.footer.title') }}</TitleItem>

    <TransitionGroup
      class="flex-col-stretch"
      name="interface-function"
      tag="div"
    >
      <SettingItem key="4" :label="t('layout.setting.layout.footer.show')">
        <SwitchItem :def="getShowFooter" :event="HandlerEnum.SHOW_FOOTER" />
      </SettingItem>
      <SettingItem
        v-if="isWrapperScrollMode"
        key="10"
        :label="t('layout.setting.layout.footer.fixed')"
      >
        <SwitchItem :def="getFooterFixed" :event="HandlerEnum.FOOTER_FIXED" />
      </SettingItem>
      <SettingItem key="8" :label="t('layout.setting.layout.footer.height')">
        <InputNumberItem
          :def="getFooterHeight"
          :event="HandlerEnum.FOOTER_HEIGHT"
          :max="100"
          :min="30"
        />
      </SettingItem>
    </TransitionGroup>
  </div>
</template>

<style lang="less" scoped></style>
