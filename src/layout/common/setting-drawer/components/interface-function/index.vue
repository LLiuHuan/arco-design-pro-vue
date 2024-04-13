<template>
  <ADivider>{{ $t('layout.setting.interfaceFunction.title') }}</ADivider>

  <TransitionGroup
    tag="div"
    name="interface-function"
    class="flex-col-stretch gap-12px"
  >
    <SettingItem
      key="1"
      :label="$t('layout.setting.interfaceFunction.menuCollapse')"
    >
      <SwitchItem
        :def="getCollapsed"
        :event="HandlerEnum.MENU_COLLAPSE"
      ></SwitchItem>
    </SettingItem>
    <SettingItem
      key="2"
      :label="$t('layout.setting.interfaceFunction.menuCollapseButton')"
    >
      <SelectItem
        :def="getTrigger"
        :event="HandlerEnum.MENU_COLLAPSE_BTN"
        :options="triggerOptions"
      ></SelectItem>
    </SettingItem>
    <SettingItem
      key="3"
      :label="$t('layout.setting.interfaceFunction.menuAccordion')"
    >
      <SwitchItem
        :def="getAccordion"
        :event="HandlerEnum.MENU_ACCORDION"
      ></SwitchItem>
    </SettingItem>
    <SettingItem
      key="4"
      :label="$t('layout.setting.interfaceFunction.headerHeight')"
    >
      <InputNumberItem
        :def="getHeaderHeight"
        :event="HandlerEnum.HEADER_HEIGHT"
        :min="48"
      ></InputNumberItem>
    </SettingItem>
  </TransitionGroup>
</template>

<script lang="ts" setup>
  import { unref } from 'vue';
  import { useHeaderSetting, useMenuSetting } from '@/hooks/setting';
  import { getMenuTriggerOptions } from './helpers';
  import {
    HandlerEnum,
    SelectItem,
    SettingItem,
    SwitchItem,
    InputNumberItem,
  } from '../common';

  defineOptions({
    name: 'InterfaceFunction',
  });

  const { getCollapsed, getTrigger, getAccordion } = useMenuSetting();
  const { getHeaderHeight } = useHeaderSetting();

  const triggerOptions = getMenuTriggerOptions(unref(false));
</script>

<style lang="less" scoped></style>
