<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2024-05-13 22:31:00
 * @LastEditTime: 2024-08-23 12:42:57
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
  import { HoverContainer } from '@/components/HoverContainer';
  import { ThemeModeBtn } from '@/components/ThemeMode';
  import { AppEnum } from '@/enums';
  import { computed, unref } from 'vue';
  import { useRootSetting } from '@/hooks/setting';
  import { useI18n } from '@/hooks/web/useI18n';

  const { getNextDarkMode } = useRootSetting();

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
    <ThemeModeBtn />
  </HoverContainer>
</template>

<style lang="less" scoped></style>
