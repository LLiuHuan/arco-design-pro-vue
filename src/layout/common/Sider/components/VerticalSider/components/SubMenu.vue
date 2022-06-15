<template>
  <a-sub-menu :key="menuInfo.key">
    <template #title>
      <span class="sub-menu-lable">{{ menuInfo.label }}</span>
    </template>
    <template #icon>
      <component
        :is="menuInfo.icon || 'icon-menu'"
        style="font-size: 16px; vertical-align: middle"
      />
    </template>
    <template v-for="item in menuInfo.children" :key="item.key">
      <template v-if="!item.children">
        <a-menu-item :key="item.key" @click="handleUpdateMenu(item.key, item)">
          <template #icon>
            <component :is="item.icon || 'icon-menu'" />
          </template>
          {{ item.label }}
        </a-menu-item>
      </template>
      <template v-else>
        <SubMenu :menu-info="item" :key="item.key" />
      </template>
    </template>
  </a-sub-menu>
</template>

<script lang="ts" setup>
  import { useRouterPush } from '@/composables';

  const { routerPush } = useRouterPush();
  defineProps({
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
  });

  function handleUpdateMenu(_key: string, item: any) {
    const menuItem = item as GlobalMenuOption;
    routerPush(menuItem.routePath);
  }
</script>

<style lang="less" scoped></style>
