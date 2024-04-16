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
      v-if="getIsMixSidebar"
      key="2"
      :label="$t('layout.setting.interfaceFunction.mixSidebarFixed')"
    >
      <SwitchItem
        :def="getMixSideFixed"
        :event="HandlerEnum.MENU_FIXED_MIX_SIDEBAR"
      ></SwitchItem>
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
      v-if="getIsMixSidebar"
      key="4"
      :label="$t('layout.setting.interfaceFunction.mixSidebarTrigger')"
    >
      <SelectItem
        :options="mixSidebarTriggerOptions"
        :event="HandlerEnum.MENU_TRIGGER_MIX_SIDEBAR"
        :def="getMixSideTrigger"
      />
    </SettingItem>
    <SettingItem
      key="5"
      :label="$t('layout.setting.interfaceFunction.menuCollapseButton')"
    >
      <SelectItem
        :def="getTrigger"
        :event="HandlerEnum.MENU_COLLAPSE_BTN"
        :options="triggerOptions"
      ></SelectItem>
    </SettingItem>
    <SettingItem
      key="6"
      :label="$t('layout.setting.interfaceFunction.headerHeight')"
    >
      <InputNumberItem
        :def="getHeaderHeight"
        :event="HandlerEnum.HEADER_HEIGHT"
        :min="48"
      ></InputNumberItem>
    </SettingItem>
    <SettingItem
      key="7"
      :label="$t('layout.setting.interfaceFunction.expandedMenuWidth')"
    >
      <InputNumberItem
        :def="getMenuWidth"
        :event="HandlerEnum.MENU_EXPANDED_MENU_WIDTH"
        :min="100"
        :max="600"
        :step="10"
      ></InputNumberItem>
    </SettingItem>
    <!--    <SettingItem-->
    <!--      key="8"-->
    <!--      :label="$t('layout.setting.interfaceFunction.collapsedMenuWidth')"-->
    <!--    >-->
    <!--      <InputNumberItem-->
    <!--        :def="getCollapsedMenuWidth"-->
    <!--        :event="HandlerEnum.MENU_COLLAPSED_MENU_WIDTH"-->
    <!--        :min="48"-->
    <!--        :max="200"-->
    <!--        :step="1"-->
    <!--      ></InputNumberItem>-->
    <!--    </SettingItem>-->
  </TransitionGroup>
</template>

<script lang="ts" setup>
  import { unref } from 'vue';
  import { useHeaderSetting, useMenuSetting } from '@/hooks/setting';
  import { MixSidebarTriggerEnum } from '@/enums';
  import { useI18n } from '@/hooks/web/useI18n';
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

  const {
    getCollapsed,
    getTrigger,
    getAccordion,
    getMixSideFixed,
    getIsMixSidebar,
    getMixSideTrigger,
    getMenuWidth,
    getCollapsedMenuWidth,
  } = useMenuSetting();
  const { getHeaderHeight } = useHeaderSetting();

  const triggerOptions = getMenuTriggerOptions(unref(false));

  const { t } = useI18n();

  const mixSidebarTriggerOptions = [
    {
      value: MixSidebarTriggerEnum.HOVER,
      label: t('layout.setting.interfaceFunction.triggerHover'),
    },
    {
      value: MixSidebarTriggerEnum.CLICK,
      label: t('layout.setting.interfaceFunction.triggerClick'),
    },
  ];
</script>

<style lang="less" scoped></style>
