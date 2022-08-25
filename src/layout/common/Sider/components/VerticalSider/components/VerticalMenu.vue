<template>
  <div class="flex-1-hidden">
    <a-menu
      class="flex-1-hidden"
      :mode="mode"
      :style="{ width: '100%', height: '100%' }"
      :collapsed="app.siderCollapse"
      :collapsed-width="theme.sider.collapsedWidth"
      v-model:selectedKeys="defaultPath"
      v-model:openKeys="defaultExpandKeys"
      auto-scroll-into-view
    >
      <template v-for="item of routeStore.menus" :key="item.key">
        <template v-if="!item.children">
          <a-menu-item :key="item.key" @click="handleUpdateMenu(item.key, item)">
            <template #icon>
              <component :is="item.icon || 'icon-menu'" />
            </template>
            {{ item.label }}
          </a-menu-item>
        </template>
        <template v-else>
          <SubMenu :key="item.key" :menu-info="item" />
        </template>
      </template>
    </a-menu>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { useAppStore, useRouteStore, useThemeStore } from '@/store';
  import { useBasicLayout, useRouterPush } from '@/composables';
  import SubMenu from './SubMenu.vue';

  const route = useRoute();
  const app = useAppStore();
  const theme = useThemeStore();
  const routeStore = useRouteStore();
  const { routerPush } = useRouterPush();
  const defaultPath = ref([] as Array<string>);
  const defaultExpandKeys = ref([] as Array<string>);

  function handleUpdateMenu(_key: string, item: any) {
    const menuItem = item as GlobalMenuOption;
    routerPush(menuItem.routePath);
  }

  const { mode } = useBasicLayout();

  watch(
    () => route.name,
    () => {
      const { matched } = route;
      defaultPath.value = matched.map((item) =>
        item.name !== undefined ? item.name.toString() : ''
      );
      // TODO: 需要处理一下

      defaultExpandKeys.value = defaultPath.value;
    },
    { immediate: true }
  );
</script>

<style lang="less" scoped>
  .flex-1-hidden ::-webkit-scrollbar {
    width: 0 !important;
    height: 0;
  }
</style>
