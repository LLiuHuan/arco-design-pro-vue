<template>
  <div class="page-wrapper relative">
    <APageHeader
      v-if="getShowHeader"
      :show-back="false"
      :title="title"
      :subtitle="subtitle"
      style="background: var(--color-bg-2)"
    >
      <template #extra>
        <slot name="headerExtra"></slot>
      </template>
    </APageHeader>

    <div :style="contentStyle" class="m-16px">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { CSSProperties, computed } from 'vue';

  interface Props {
    title?: string;
    subtitle?: string;
    contentStyle?: CSSProperties;
  }

  defineOptions({
    name: 'PageWrapper',
  });

  const props = defineProps<Props>();

  const getShowHeader = computed(() => {
    return props.title || props.subtitle;
  });
</script>

<style lang="less" scoped></style>
