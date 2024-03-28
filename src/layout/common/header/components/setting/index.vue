<template>
  <HoverContainer tooltip-content="主题设置">
    <AButton type="text" class="!text-[var(--color-text-1)]">
      <SvgIcon icon="mingcute:settings-6-fill" size="20"></SvgIcon>
    </AButton>
  </HoverContainer>
</template>

<script lang="ts" setup>
  import { SvgIcon } from '@/components/Icon';
  import { HoverContainer } from '@/components/HoverContainer';
</script>

<style lang="less" scoped></style>
