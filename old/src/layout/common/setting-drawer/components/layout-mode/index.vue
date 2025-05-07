<!--
 * @Description: 项目配置-布局-布局模式
 * @Author: LLiuHuan
 * @Date: 2024-05-13 22:31:00
 * @LastEditTime: 2024-10-17 11:37:27
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
  import { computed, unref } from 'vue';
  import {
    useLayoutSetting,
    useMenuSetting,
    useRootSetting,
  } from '@/hooks/setting';
  import { useI18n } from '@/hooks/web/useI18n';
  import {
    HandlerEnum,
    LayoutModeCard,
    SettingItem,
    SwitchItem,
    TitleItem,
  } from '../common';

  const { getLayoutMode, getLayoutReverse, setLayoutSetting } =
    useLayoutSetting();
  const { isHorizontalMix } = useMenuSetting();
  const { getIsMobile } = useRootSetting();
  const { t } = useI18n();

  const menuMode = computed({
    get: () => unref(getLayoutMode),
    set: (mode) => {
      setLayoutSetting({ mode: unref(mode) });
    },
  });
</script>

<template>
  <div class="flex flex-col py-4">
    <TitleItem>{{ t('layout.setting.layout.mode.title') }}</TitleItem>

    <LayoutModeCard
      :def="menuMode"
      :disabled="getIsMobile"
      :event="HandlerEnum.LAYOUT_MODE"
    >
      <template #vertical>
        <div class="layout-sider h-full w-18px"></div>
        <div class="vertical-wrapper">
          <div class="layout-header"></div>
          <div class="layout-main"></div>
        </div>
      </template>
      <template #vertical-mix>
        <div class="layout-sider h-full w-8px"></div>
        <div class="layout-sider h-full w-16px"></div>
        <div class="vertical-wrapper">
          <div class="layout-header"></div>
          <div class="layout-main"></div>
        </div>
      </template>
      <template #horizontal>
        <div class="layout-header"></div>
        <div class="horizontal-wrapper">
          <div class="layout-main"></div>
        </div>
      </template>
      <template #horizontal-mix>
        <div class="layout-header"></div>
        <div class="horizontal-wrapper">
          <div class="layout-sider w-18px"></div>
          <div class="layout-main"></div>
        </div>
      </template>
    </LayoutModeCard>

    <TransitionGroup
      class="flex-col-stretch mt-4"
      name="interface-function"
      tag="div"
    >
      <SettingItem
        v-if="isHorizontalMix"
        key="1"
        :label="t('layout.setting.layout.mode.layoutReverse')"
      >
        <SwitchItem :def="getLayoutReverse" :event="HandlerEnum.MENU_REVERSE" />
      </SettingItem>
    </TransitionGroup>
  </div>
</template>

<style scoped>
  .layout-header {
    --uno: h-16px 'bg-[rgba(var(--primary-5))]' rd-4px;
  }

  .layout-sider {
    --uno: 'bg-[rgba(var(--primary-4))]' rd-4px;
  }

  .layout-main {
    --uno: flex-1 'bg-[rgba(var(--primary-3))]' rd-4px;
  }

  .vertical-wrapper {
    --uno: flex-1 flex-col gap-6px;
  }

  .horizontal-wrapper {
    --uno: flex-1 flex gap-6px;
  }
</style>
