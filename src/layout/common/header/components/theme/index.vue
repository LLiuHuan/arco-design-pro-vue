<template>
  <HoverContainer tooltip-content="主题设置">
    <AButton
      type="text"
      class="!text-[var(--color-text-1)]"
      @click="toggleDarkMode"
    >
      <DarkModeSwitch auto></DarkModeSwitch>
    </AButton>
  </HoverContainer>
</template>

<script lang="ts" setup>
  import { HoverContainer } from '@/components/HoverContainer';
  import { DarkModeSwitch } from '@/components/DarkModeSwitch';
  import { useAppStore } from '@/store/modules/app';

  const { toggleDarkMode } = useAppStore();
</script>

<style lang="less" scoped></style>
