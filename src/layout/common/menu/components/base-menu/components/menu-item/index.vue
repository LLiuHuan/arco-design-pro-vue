<template>
  <AMenuItem :key="item.routeName">
    <template v-if="item.icon" #icon>
      <component :is="item.icon" />
    </template>
    {{ item.meta.i18nTitle ? $t(item.meta.i18nTitle) : item.meta.title }}
  </AMenuItem>
</template>

<script lang="ts" setup>
  import type { App } from '~/types/app';

  interface Props {
    item: App.Menu;

    class?: string;
  }

  defineProps<Props>();
</script>

<style lang="less" scoped></style>
