<template>
  <ADivider>{{ $t('layout.setting.interfaceDisplay.title') }}</ADivider>

  <TransitionGroup
    tag="div"
    name="interface-function"
    class="flex-col-stretch gap-12px"
  >
    <SettingItem
      key="1"
      :label="$t('layout.setting.interfaceDisplay.transitionEnable')"
    >
      <SwitchItem
        :def="getEnableTransition"
        :event="HandlerEnum.TRANSITION_ENABLE"
      />
    </SettingItem>
    <SettingItem
      key="2"
      :label="$t('layout.setting.interfaceDisplay.routerAnimation')"
    >
      <SelectItem
        :def="getBasicTransition"
        :event="HandlerEnum.TRANSITION_ROUTER"
        :options="routerAnimationOptions"
        :disabled="!getEnableTransition"
      ></SelectItem>
    </SettingItem>
  </TransitionGroup>
</template>

<script lang="ts" setup>
  import { useTransitionSetting } from '@/hooks/setting';
  import { HandlerEnum, SelectItem, SettingItem, SwitchItem } from '../common';
  import { getRouterAnimationOptions } from './helpers';

  const { getBasicTransition, getEnableTransition } = useTransitionSetting();

  const routerAnimationOptions = getRouterAnimationOptions();
</script>

<style lang="less" scoped></style>
