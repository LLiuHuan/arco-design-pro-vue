<template>
  <div class="flex-1-hidden">
    <a-menu
      class="flex-1-hidden"
      :mode="mode"
      :style="{ width: '100%', height: '100%' }"
      v-model:selectedKeys="defaultPath"
      v-model:openKeys="defaultPath"
      auto-scroll-into-view
    >
      <template v-for="item of menus" :key="item.key">
        <template v-if="!item.children">
          <a-menu-item :key="item.key" @click="handleUpdateMenu(item.key, item)">
            <template #icon>
              <component :is="item.icon" />
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
  import { computed, ref, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { useRouteStore } from '@/store';
  import { useRouterPush } from '@/composables';
  import { getActiveKeyPathsOfMenus } from '@/utils';
  import SubMenu from './SubMenu.vue';

  const route = useRoute();
  const routeStore = useRouteStore();
  const { routerPush } = useRouterPush();
  const defaultPath = ref([] as Array<string>);
  const activeKey = computed(
    () => (route.meta?.activeMenu ? route.meta.activeMenu : route.name) as string
  );

  function handleUpdateMenu(_key: string, item: any) {
    const menuItem = item as GlobalMenuOption;
    routerPush(menuItem.routePath);
  }

  type LayoutMode = 'vertical' | 'horizontal';

  interface Props {
    /** mode */
    mode?: LayoutMode;
    /** 菜单数据 */
    menus?: GlobalMenuOption[];
    /** 是否折叠 */
    siderCollapse?: boolean;
  }
  withDefaults(defineProps<Props>(), {
    mode: 'vertical',
    siderCollapse: false,
  });

  watch(
    () => route.name,
    () => {
      // const { matched } = route;
      // defaultPath.value = matched.map((item) =>
      //   item.name !== undefined ? item.name.toString() : ''
      // );
      // TODO: 需要处理一下
      defaultPath.value = getActiveKeyPathsOfMenus(activeKey.value, routeStore.menus);
    },
    { immediate: true }
  );
</script>

<style lang="less" scoped>
  .flex-1-hidden ::-webkit-scrollbar {
    width: 0 !important;
    height: 0;
  }

  :deep(.arco-menu-horizontal .arco-menu-inner) {
    overflow: hidden;
    padding: 9px 10px 8px 10px;
  }

  :deep(.arco-menu-selected-label) {
    bottom: -8px;
    height: 2px;
  }
</style>