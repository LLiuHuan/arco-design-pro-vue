<!--
 * @Description: 项目设置-通用-动画
 * @Author: LLiuHuan
 * @Date: 2024-08-21 10:22:09
 * @LastEditTime: 2024-08-21 14:39:46
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
  import { useI18n } from '@/hooks/web/useI18n';
  import { useTransitionSetting } from '@/hooks/setting';
  import {
    HandlerEnum,
    TitleItem,
    SettingItem,
    SwitchItem,
    SelectItem,
  } from '../common';
  import { getRouterAnimationOptions } from './helpers';

  const { t } = useI18n();

  const {
    getBasicTransition,
    getEnableTransition,
    getOpenPageLoading,
    getOpenNProgress,
  } = useTransitionSetting();

  const routerAnimationOptions = getRouterAnimationOptions();
</script>

<template>
  <div class="flex flex-col py-4">
    <TitleItem>{{ t('layout.setting.universal.animation.title') }}</TitleItem>

    <TransitionGroup
      class="flex-col-stretch"
      name="interface-function"
      tag="div"
    >
      <SettingItem
        key="3"
        :label="t('layout.setting.universal.animation.transitionEnable')"
      >
        <SwitchItem
          :def="getEnableTransition"
          :event="HandlerEnum.TRANSITION_ENABLE"
        />
      </SettingItem>
      <SettingItem
        key="5"
        :label="t('layout.setting.universal.animation.transitionLoading')"
      >
        <SwitchItem
          :def="getOpenPageLoading"
          :event="HandlerEnum.TRANSITION_LOADING"
        />
      </SettingItem>
      <SettingItem
        key="6"
        :label="t('layout.setting.universal.animation.transitionNGprogress')"
      >
        <SwitchItem
          :def="getOpenNProgress"
          :event="HandlerEnum.TRANSITION_NPROGRESS"
        />
      </SettingItem>
      <SettingItem
        key="7"
        :label="t('layout.setting.universal.animation.routerAnimation')"
      >
        <SelectItem
          :def="getBasicTransition"
          :disabled="!getEnableTransition"
          :event="HandlerEnum.TRANSITION_ROUTER"
          :options="routerAnimationOptions"
        />
      </SettingItem>
    </TransitionGroup>
  </div>
</template>

<style lang="less" scoped></style>
