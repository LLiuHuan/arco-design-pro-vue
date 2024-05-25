<template>
  <div
    :class="[
      span
        ? 'before:(top-4px left-0 w-3px h-16px mr-4px absolute bg-[rgba(var(--primary-6))])'
        : '',
      normal ? '!text-14px' : '',
    ]"
    class="basic-title flex relative pl-7px text-16px font-medium leading-24px cursor-pointer select-none"
  >
    <slot></slot>
    <BasicHelp v-if="helpMessage" :content="helpMessage" class="ml-10px" />
  </div>
</template>

<script lang="ts" setup>
  import BasicHelp from './BasicHelp.vue';

  interface Props {
    /**
     * @description 帮助文本列表或字符串
     * @description Help text list or string
     * @default: ''
     */
    helpMessage?: string | string[];
    /**
     * @description 色块是否位于标题左侧
     * @description Whether the color block on the left side of the title
     * @default: false
     */
    span?: boolean;
    /**
     * @description 是否默认文本，即不加粗
     * @description Whether to default the text, that is, not bold
     * @default: false
     */
    normal?: boolean;
  }

  defineProps<Props>();
</script>

<style lang="less" scoped>
  .basic-title::before {
    content: '';
  }
</style>
