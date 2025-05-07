<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2024-05-13 22:31:00
 * @LastEditTime: 2024-08-23 17:11:30
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
  import { HoverContainer } from '@/components/HoverContainer';
  import { useI18n } from '@/hooks/web/useI18n';
  import { LocaleDropdown } from '@/components/LocaleDropdown';

  const { t } = useI18n();
</script>

<template>
  <HoverContainer
    :tooltip-content="t('layout.header.switchLanguage')"
    position="left"
  >
    <LocaleDropdown />
  </HoverContainer>
</template>

<style lang="less" scoped></style>
