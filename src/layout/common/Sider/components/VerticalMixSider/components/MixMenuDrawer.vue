<template>
  <div
    class="relative h-full transition-width duration-300 ease-in-out"
    :style="{ width: app.mixSiderFixed ? theme.sider.mixChildMenuWidth + 'px' : '0px' }"
  >
    <dark-mode-container
      class="drawer-shadow absolute-lt flex-col-stretch h-full nowrap-hidden"
      :style="{ width: showDrawer ? theme.sider.mixChildMenuWidth + 'px' : '0px' }"
    >
      <header
        class="header-height flex-y-center justify-between"
        :style="{ height: theme.header.height + 'px' }"
      >
        <h2 class="text-primary pl-8px text-16px font-bold">{{ title }}</h2>
        <div class="px-8px text-16px text-gray-600 cursor-pointer" @click="app.toggleMixSiderFixed">
          <icon-mdi-pin-off v-if="app.mixSiderFixed" />
          <icon-mdi-pin v-else />
        </div>
      </header>
      <div class="flex-1-hidden">
        <Menu :menus="menus" />
      </div>
    </dark-mode-container>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { useAppStore, useThemeStore } from '@/store';
  import { useAppInfo } from '@/composables';
  import { getActiveKeyPathsOfMenus } from '@/utils';
  import { Menu } from '@/layout/common';

  interface Props {
    /** 菜单抽屉可见性 */
    visible: boolean;
    /** 子菜单数据 */
    menus: GlobalMenuOption[];
  }

  const props = defineProps<Props>();

  const route = useRoute();
  const app = useAppStore();
  const theme = useThemeStore();
  // const { routerPush } = useRouterPush();
  const { title } = useAppInfo();

  const showDrawer = computed(() => (props.visible && props.menus.length) || app.mixSiderFixed);

  const activeKey = computed(() => route.name as string);
  const expandedKeys = ref<string[]>([]);

  // TODO: 1111111111111  any
  // function handleUpdateMenu(_key: string, item: any) {
  //   const menuItem = item as GlobalMenuOption;
  //   routerPush(menuItem.routePath);
  // }
  //
  // function handleUpdateExpandedKeys(keys: string[]) {
  //   expandedKeys.value = keys;
  // }

  watch(
    () => route.name,
    () => {
      expandedKeys.value = getActiveKeyPathsOfMenus(activeKey.value, props.menus);
    },
    { immediate: true }
  );
</script>
<style scoped>
  .drawer-shadow {
    box-shadow: 2px 0 8px 0 rgb(29 35 41 / 5%);
  }
</style>
