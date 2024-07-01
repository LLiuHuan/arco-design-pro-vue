<template>
  <div
    :id="tab.fullPath"
    class="bg-[var(--color-fill-2)] flex-center px-10px py-4px mx-3px rounded-1 cursor-pointer layout-tab-scroll-item h-30px"
  >
    <span
      :class="{
        'text-[rgba(var(--primary-6))]': activate,
      }"
    >
      {{ tab.label }}
    </span>
    <div v-if="closable" class="flex-center py-2px" @click.stop="handleClose">
      <SvgIcon class="ml-6px" icon="mingcute:close-fill" size="12" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { SvgIcon } from '@/components/Icon';

  interface Props {
    tab: App.Tab;
    activate?: boolean;
    closable?: boolean;
  }

  const props = defineProps<Props>();
  const emit = defineEmits(['close']);

  const handleClose = () => {
    emit('close', props.tab);
  };
</script>

<style lang="less" scoped></style>
