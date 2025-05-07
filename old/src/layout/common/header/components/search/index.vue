<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2024-05-13 22:31:00
 * @LastEditTime: 2024-08-22 16:57:11
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
  import { HoverContainer } from '@/components/HoverContainer';
  import { SvgIcon } from '@/components/Icon';
  import { AppSearch } from '@/components/AppSearch';
  import { ref } from 'vue';
  import { useI18n } from '@/hooks/web/useI18n';

  const { t } = useI18n();

  const visible = ref(false);
</script>

<template>
  <HoverContainer :tooltip-content="t('layout.header.search')">
    <AButton
      type="text"
      class="!text-[var(--color-text-1)] !h-40px"
      @click="visible = true"
    >
      <SvgIcon icon="ri:search-line" size="18" />
    </AButton>
  </HoverContainer>

  <AppSearch :show="visible" @close="visible = false" />
</template>

<style lang="less" scoped></style>
