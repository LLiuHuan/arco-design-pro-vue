<template>
  <HoverContainer :tooltip-content="$t('layout.header.setting')">
    <AButton
      type="text"
      class="!text-[var(--color-text-1)] !h-40px"
      @click="setSettingDrawerState(true)"
    >
      <SettingBtn :position="SettingButtonPositionEnum.HEADER" />
    </AButton>
  </HoverContainer>
</template>

<script lang="ts" setup>
  import { HoverContainer } from '@/components/HoverContainer';
  import SettingBtn from '@/layout/common/setting-btn/index.vue';
  import { SettingButtonPositionEnum } from '@/enums';
  import { useRootSetting } from '@/hooks/setting';

  const { setSettingDrawerState } = useRootSetting();
</script>

<style lang="less" scoped></style>
