<template>
  <ADivider>{{ $t('layout.setting.interfaceDisplay.title') }}</ADivider>

  <TransitionGroup
    tag="div"
    name="interface-function"
    class="flex-col-stretch gap-12px"
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
        :event="HandlerEnum.TRANSITION_ROUTER"
        :options="routerAnimationOptions"
        :disabled="!getEnableTransition"
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
  </TransitionGroup>
</template>

<script lang="ts" setup>
  import {
    useFooterSetting,
    useHeaderSetting,
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
  const { getWeakMode, getGrayMode } = useRootSetting();

  const routerAnimationOptions = getRouterAnimationOptions();
</script>

<style lang="less" scoped></style>
