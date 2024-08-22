<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2024-05-13 22:31:00
 * @LastEditTime: 2024-08-22 13:47:48
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
  import { HoverContainer } from '@/components/HoverContainer';
  import SettingBtn from '@/layout/common/setting-btn/index.vue';
  import { SettingButtonPositionEnum } from '@/enums';
  import { useRootSetting } from '@/hooks/setting';
  import { useI18n } from '@/hooks/web/useI18n';

  const { setSettingDrawerState } = useRootSetting();
  const { t } = useI18n();
</script>

<template>
  <HoverContainer :tooltip-content="t('layout.header.setting')">
    <AButton
      type="text"
      class="!text-[var(--color-text-1)] !h-40px"
      @click="setSettingDrawerState(true)"
    >
      <SettingBtn :position="SettingButtonPositionEnum.HEADER" />
    </AButton>
  </HoverContainer>
</template>

<style lang="less" scoped></style>
