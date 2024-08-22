<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2024-05-13 22:31:00
 * @LastEditTime: 2024-08-22 14:12:37
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
  import { HoverContainer } from '@/components/HoverContainer';
  import { DarkModeSwitch } from '@/components/DarkModeSwitch';
  import { AppEnum } from '@/enums';
  import { computed, unref } from 'vue';
  import { useRootSetting } from '@/hooks/setting';
  import { useI18n } from '@/hooks/web/useI18n';

  const { toggleDarkMode, getNextDarkMode } = useRootSetting();

  const { t } = useI18n();

  const tooltips: any = {
    [AppEnum.LIGHT]: 'layout.header.themeLight',
    [AppEnum.DARK]: 'layout.header.themeDark',
    [AppEnum.AUTO]: 'layout.header.themeSystem',
  };

  const tooltipContent = computed(() => tooltips[unref(getNextDarkMode)]);
</script>

<template>
  <HoverContainer :tooltip-content="t(tooltipContent)">
    <AButton
      class="!text-[var(--color-text-1)] !h-40px"
      type="text"
      @click="toggleDarkMode"
    >
      <DarkModeSwitch auto />
    </AButton>
  </HoverContainer>
</template>

<style lang="less" scoped></style>
