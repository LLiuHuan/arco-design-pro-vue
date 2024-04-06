<template>
  <HoverContainer :tooltip-content="$t(tooltipContent)">
    <AButton
      type="text"
      class="!text-[var(--color-text-1)] !h-40px"
      @click="toggleDarkMode"
    >
      <DarkModeSwitch auto></DarkModeSwitch>
    </AButton>
  </HoverContainer>
</template>

<script lang="ts" setup>
  import { HoverContainer } from '@/components/HoverContainer';
  import { DarkModeSwitch } from '@/components/DarkModeSwitch';
  import { AppEnum } from '@/enums';
  import { computed, unref } from 'vue';
  import { useRootSetting } from '@/hooks/setting';

  const { toggleDarkMode, getNextDarkMode } = useRootSetting();

  const tooltips = {
    [AppEnum.LIGHT]: 'layout.header.themeLight',
    [AppEnum.DARK]: 'layout.header.themeDark',
    [AppEnum.AUTO]: 'layout.header.themeSystem',
  };

  const tooltipContent = computed(() => tooltips[unref(getNextDarkMode)]);
</script>

<style lang="less" scoped></style>
