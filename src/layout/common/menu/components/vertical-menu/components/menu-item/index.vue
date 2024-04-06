<template>
  <AMenuItem :key="item.routeName" @click="handleMenuClick(item)">
    <template v-if="item.icon" #icon>
      <component :is="item.icon" />
    </template>

    {{ item.meta.i18nTitle ? $t(item.meta.i18nTitle) : item.meta.title }}
  </AMenuItem>
</template>

<script lang="ts" setup>
  import type { App } from '~/types/app';
  import { useRouterPush } from '@/hooks/component';

  interface Props {
    item: App.Menu;
  }

  defineProps<Props>();

  const { routerPush } = useRouterPush();

  const handleMenuClick = (item: App.Menu) => {
    console.log('menu click', item);
    routerPush(item.routePath);
  };
</script>

<style lang="less" scoped></style>
