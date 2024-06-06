<template>
  <div ref="wrapperRef">
    <APageHeader
      v-if="getShowHeader"
      ref="headerRef"
      :show-back="showBack"
      :style="{ background: 'var(--color-bg-2)' }"
      :subtitle="subtitle"
      :title="title"
      @back="handleBack"
    >
      <template v-for="item in getHeaderSlots" #[item]="data">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </APageHeader>

    <div
      v-if="content || $slots.headerContent"
      :style="{ background: 'var(--color-bg-2)' }"
      class="pb-6 arco-page-header-wrapper"
    >
      <template v-if="content"> {{ content }}</template>
      <slot v-else name="headerContent"></slot>
    </div>

    <div
      ref="contentRef"
      :class="contentClass"
      :style="contentStyle"
      class="overflow-hidden"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { omit } from 'lodash-es';
  import { computed, CSSProperties, ref, useSlots } from 'vue';

  interface Props {
    title?: string;
    subtitle?: string;
    content?: string;
    contentClass?: string;
    contentStyle?: CSSProperties;
    showBack?: boolean;
  }

  interface Emits {
    (e: 'back'): void;
  }

  defineOptions({
    name: 'PageWrapper',
  });

  const props = withDefaults(defineProps<Props>(), {
    showBack: false,
  });
  const emit = defineEmits<Emits>();
  const slots = useSlots();

  const wrapperRef = ref<HTMLElement | null>(null);
  const headerRef = ref<HTMLElement | null>(null);
  const contentRef = ref<HTMLElement | null>(null);

  // 'breadcrumb', 'back-icon', 'title', 'subtitle', 'extra'
  const getHeaderSlots = computed(() => {
    return Object.keys(omit(slots, 'default', 'headerContent'));
  });

  // 是否显示头部
  const getShowHeader = computed(
    () =>
      props.content ||
      slots?.headerContent ||
      props.title ||
      getHeaderSlots.value.length,
  );

  // 返回按钮事件
  const handleBack = () => {
    emit('back');
  };
</script>

<style lang="less" scoped></style>
