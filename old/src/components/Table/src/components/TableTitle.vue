<template>
  <BasicTitle
    v-if="title"
    :help-message="titleHelpMessage"
    :normal="normal"
    :span="span"
    class="flex items-center justify-between"
  >
    {{ title }}
  </BasicTitle>
</template>

<script lang="ts" setup>
  import { BasicTitle } from '@/components/Basic';

  interface Props {
    title?: string;
    titleHelpMessage?: string | string[];
    span?: boolean;
    normal?: boolean;
  }

  defineProps<Props>();
</script>

<style lang="less" scoped></style>
