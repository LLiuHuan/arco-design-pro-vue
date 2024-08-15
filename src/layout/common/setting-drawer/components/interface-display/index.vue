<template>
  <ADivider>{{ $t('layout.setting.interfaceDisplay.title') }}</ADivider>

  <TransitionGroup
    class="flex-col-stretch gap-12px"
    name="interface-function"
    tag="div"
  >
    <SettingItem
      key="1"
      :label="$t('layout.setting.interfaceDisplay.headerBreadcrumb')"
    >
      <SwitchItem
        :def="getHeaderShowBreadCrumb"
        :event="HandlerEnum.HEADER_BREADCRUMB"
      />
    </SettingItem>
    <SettingItem
      key="2"
      :label="$t('layout.setting.interfaceDisplay.headerBreadcrumbIcon')"
    >
      <SwitchItem
        :def="getHeaderShowBreadCrumbIcon"
        :event="HandlerEnum.HEADER_BREADCRUMB_ICON"
      />
    </SettingItem>
    <SettingItem
      key="3"
      :label="$t('layout.setting.interfaceDisplay.transitionEnable')"
    >
      <SwitchItem
        :def="getEnableTransition"
        :event="HandlerEnum.TRANSITION_ENABLE"
      />
    </SettingItem>
    <SettingItem key="4" :label="$t('layout.setting.interfaceDisplay.footer')">
      <SwitchItem :def="getShowFooter" :event="HandlerEnum.SHOW_FOOTER" />
    </SettingItem>
    <SettingItem
      key="5"
      :label="$t('layout.setting.interfaceDisplay.transitionLoading')"
    >
      <SwitchItem
        :def="getOpenPageLoading"
        :event="HandlerEnum.TRANSITION_LOADING"
      />
    </SettingItem>
    <SettingItem
      key="6"
      :label="$t('layout.setting.interfaceDisplay.transitionNGprogress')"
    >
      <SwitchItem
        :def="getOpenNProgress"
        :event="HandlerEnum.TRANSITION_NPROGRESS"
      />
    </SettingItem>
    <SettingItem
      key="7"
      :label="$t('layout.setting.interfaceDisplay.routerAnimation')"
    >
      <SelectItem
        :def="getBasicTransition"
        :disabled="!getEnableTransition"
        :event="HandlerEnum.TRANSITION_ROUTER"
        :options="routerAnimationOptions"
      ></SelectItem>
    </SettingItem>
    <SettingItem
      key="8"
      :label="$t('layout.setting.interfaceDisplay.grayMode')"
    >
      <SwitchItem :def="getGrayMode" :event="HandlerEnum.GRAY_MODE" />
    </SettingItem>
    <SettingItem
      key="9"
      :label="$t('layout.setting.interfaceDisplay.colorWeak')"
    >
      <SwitchItem :def="getWeakMode" :event="HandlerEnum.WEAK_MODE" />
    </SettingItem>
    <SettingItem
      key="10"
      :label="$t('layout.setting.interfaceDisplay.showLogo')"
    >
      <SwitchItem :def="getShowLogo" :event="HandlerEnum.SHOW_LOGO" />
    </SettingItem>
    <SettingItem key="11" :label="$t('layout.setting.interfaceDisplay.tabs')">
      <SwitchItem :def="getShowMultipleTab" :event="HandlerEnum.SHOW_TABS" />
    </SettingItem>
    <SettingItem
      key="12"
      :label="$t('layout.setting.interfaceDisplay.tabsQuickBtn')"
    >
      <SwitchItem
        :def="getShowQuick"
        :event="HandlerEnum.SHOW_TABS_QUICK_BTN"
      />
    </SettingItem>
    <SettingItem
      key="13"
      :label="$t('layout.setting.interfaceDisplay.tabsRedoBtn')"
    >
      <SwitchItem :def="getShowRedo" :event="HandlerEnum.SHOW_TABS_REDO_BTN" />
    </SettingItem>
    <SettingItem
      key="14"
      :label="$t('layout.setting.interfaceDisplay.tabsFoldBtn')"
    >
      <SwitchItem :def="getShowFold" :event="HandlerEnum.SHOW_TABS_FOLD_BTN" />
    </SettingItem>
  </TransitionGroup>
</template>

<script lang="ts" setup>
  import {
    useFooterSetting,
    useHeaderSetting,
    useMultipleTabSetting,
    useRootSetting,
    useTransitionSetting,
  } from '@/hooks/setting';
  import { HandlerEnum, SelectItem, SettingItem, SwitchItem } from '../common';
  import { getRouterAnimationOptions } from './helpers';

  const {
    getBasicTransition,
    getEnableTransition,
    getOpenPageLoading,
    getOpenNProgress,
  } = useTransitionSetting();
  const { getHeaderShowBreadCrumb, getHeaderShowBreadCrumbIcon } =
    useHeaderSetting();
  const { getShowFooter } = useFooterSetting();
  const { getWeakMode, getGrayMode, getShowLogo } = useRootSetting();
  const { getShowMultipleTab, getShowQuick, getShowRedo, getShowFold } =
    useMultipleTabSetting();

  const routerAnimationOptions = getRouterAnimationOptions();
</script>

<style lang="less" scoped></style>
