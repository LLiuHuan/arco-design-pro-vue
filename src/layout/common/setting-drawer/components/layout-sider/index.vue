<!--
 * @Description: 项目配置-布局-侧边栏
 * @Author: LLiuHuan
 * @Date: 2024-08-19 23:44:00
 * @LastEditTime: 2024-08-21 16:46:01
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
  import { useMenuSetting } from '@/hooks/setting';
  import { useI18n } from '@/hooks/web/useI18n';
  import { MixSidebarTriggerEnum } from '@/enums';
  import { unref } from 'vue';
  import {
    HandlerEnum,
    InputNumberItem,
    SelectItem,
    SettingItem,
    SwitchItem,
    TitleItem,
  } from '../common';
  import { getMenuTriggerOptions } from './helpers';

  const {
    getCollapsed,
    getTrigger,
    getAccordion,
    getMixSideFixed,
    isVerticalMix,
    isVertical,
    getMixSideTrigger,
    getMenuWidth,
    getCollapsedMenuWidth,
    getMixMenuWidth,
    getMixCollapsedMenuWidth,
    getMixChildMenuWidth,
    isMixMenu,
    isNotMixMenu,
  } = useMenuSetting();

  const triggerOptions = getMenuTriggerOptions(unref(false));

  const { t } = useI18n();

  const mixSidebarTriggerOptions = [
    {
      value: MixSidebarTriggerEnum.HOVER,
      label: t('layout.setting.layout.sider.triggerHover'),
    },
    {
      value: MixSidebarTriggerEnum.CLICK,
      label: t('layout.setting.layout.sider.triggerClick'),
    },
  ];
</script>

<template>
  <div class="flex flex-col py-4">
    <TitleItem>{{ t('layout.setting.layout.sider.title') }}</TitleItem>

    <TransitionGroup
      class="flex-col-stretch"
      name="interface-function"
      tag="div"
    >
      <SettingItem
        key="1"
        :label="t('layout.setting.layout.sider.menuCollapse')"
      >
        <SwitchItem :def="getCollapsed" :event="HandlerEnum.MENU_COLLAPSE" />
      </SettingItem>
      <SettingItem
        v-if="isVerticalMix"
        key="2"
        :label="t('layout.setting.layout.sider.mixSidebarFixed')"
      >
        <SwitchItem
          :def="getMixSideFixed"
          :event="HandlerEnum.MENU_FIXED_MIX_SIDEBAR"
        />
      </SettingItem>
      <SettingItem
        key="3"
        :label="t('layout.setting.layout.sider.menuAccordion')"
      >
        <SwitchItem :def="getAccordion" :event="HandlerEnum.MENU_ACCORDION" />
      </SettingItem>
      <SettingItem
        v-if="isVerticalMix"
        key="4"
        :label="t('layout.setting.layout.sider.mixSidebarTrigger')"
      >
        <SelectItem
          :def="getMixSideTrigger"
          :event="HandlerEnum.MENU_TRIGGER_MIX_SIDEBAR"
          :options="mixSidebarTriggerOptions"
        />
      </SettingItem>
      <SettingItem
        v-if="isVerticalMix || isVertical"
        key="5"
        :label="t('layout.setting.layout.sider.menuCollapseButton')"
      >
        <SelectItem
          :def="getTrigger"
          :event="HandlerEnum.MENU_COLLAPSE_BTN"
          :options="triggerOptions"
        />
      </SettingItem>
      <SettingItem
        v-if="isNotMixMenu"
        key="7"
        :label="t('layout.setting.layout.sider.expandedMenuWidth')"
      >
        <InputNumberItem
          :def="getMenuWidth"
          :event="HandlerEnum.MENU_EXPANDED_MENU_WIDTH"
          :max="600"
          :min="100"
          :step="10"
        />
      </SettingItem>
      <SettingItem
        v-if="isNotMixMenu"
        key="13"
        :label="t('layout.setting.layout.sider.collapsedMenuWidth')"
      >
        <InputNumberItem
          :def="getCollapsedMenuWidth"
          :event="HandlerEnum.MENU_COLLAPSED_MENU_WIDTH"
          :max="200"
          :min="48"
          :step="1"
        />
      </SettingItem>
      <SettingItem
        v-if="isMixMenu"
        key="14"
        :label="t('layout.setting.layout.sider.mixExpandMenuWidth')"
      >
        <InputNumberItem
          :def="getMixMenuWidth"
          :event="HandlerEnum.MIX_MENU_EXPANDED_MENU_WIDTH"
          :max="200"
          :min="80"
        />
      </SettingItem>
      <SettingItem
        v-if="isMixMenu"
        key="15"
        :label="t('layout.setting.layout.sider.mixCollapsedMenuWidth')"
      >
        <InputNumberItem
          :def="getMixCollapsedMenuWidth"
          :event="HandlerEnum.MIX_MENU_COLLAPSED_MENU_WIDTH"
          :max="200"
          :min="48"
        />
      </SettingItem>
      <SettingItem
        v-if="isMixMenu"
        key="16"
        :label="t('layout.setting.layout.sider.mixChildMenuWidth')"
      >
        <InputNumberItem
          :def="getMixChildMenuWidth"
          :event="HandlerEnum.MIX_MENU_CHILD_MENU_WIDTH"
          :min="200"
        />
      </SettingItem>
    </TransitionGroup>
  </div>
</template>

<style lang="less" scoped></style>
