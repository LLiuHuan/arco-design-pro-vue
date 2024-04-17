<template>
  <HoverContainer :tooltip-content="$t('layout.header.search')">
    <AButton
      type="text"
      class="!text-[var(--color-text-1)] !h-40px"
      @click="visible = true"
    >
      <SvgIcon icon="ri:search-line" size="20" />
    </AButton>
  </HoverContainer>

  <AppSearch :show="visible" @close="visible = false" />
</template>

<script lang="ts" setup>
  import { HoverContainer } from '@/components/HoverContainer';
  import { SvgIcon } from '@/components/Icon';
  import { AppSearch } from '@/components/AppSearch';
  import { ref } from 'vue';

  const visible = ref(false);
</script>

<style lang="less" scoped></style>
