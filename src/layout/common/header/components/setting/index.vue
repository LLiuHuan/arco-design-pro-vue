<template>
  <HoverContainer tooltip-content="主题设置">
    <AButton type="text" class="!text-[var(--color-text-1)] !h-40px">
      <SettingBtn :position="SettingButtonPositionEnum.HEADER" />
    </AButton>
  </HoverContainer>
</template>

<script lang="ts" setup>
  import { HoverContainer } from '@/components/HoverContainer';
  import SettingBtn from '@/layout/common/setting-btn/index.vue';
  import { SettingButtonPositionEnum } from '@/enums';
</script>

<style lang="less" scoped></style>
