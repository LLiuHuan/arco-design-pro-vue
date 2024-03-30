<template>
  <HoverContainer tooltip-content="主题设置">
    <AButton
      type="text"
      class="!text-[var(--color-text-1)]"
      @click="setSettingDrawerState(true)"
    >
      <SvgIcon icon="mingcute:settings-6-fill" size="20"></SvgIcon>
    </AButton>
  </HoverContainer>
</template>

<script lang="ts" setup>
  import { SvgIcon } from '@/components/Icon';
  import { HoverContainer } from '@/components/HoverContainer';
  import { useRootSetting } from '@/hooks/setting';

  const { setSettingDrawerState } = useRootSetting();
</script>

<style lang="less" scoped></style>
