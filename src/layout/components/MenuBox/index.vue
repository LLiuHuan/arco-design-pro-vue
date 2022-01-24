<template>
  <a-menu
    @menu-item-click="openKey"
    v-model:selected-keys="defaultSelectedKeys"
    :default-open-keys="defaultOpenKeys"
  >
    <MenuItem v-for="menu in menus" :key="menu.name" :item="menu" />
    <!--   不分组   -->
  </a-menu>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, toRefs, watch } from 'vue';
  import { isArray } from 'lodash-es';
  import MenuItem from '@/layout/components/MenuBox/MenuItem.vue';
  import { storage } from '@/utils/storage';
  import { useRoutersStore } from '@/store/modules/routers';
  import { useRoute } from 'vue-router';

  export default defineComponent({
    name: 'Menu',
    components: {
      MenuItem,
    },
    setup() {
      // const menus = generatorMenu(asyncRoutes);
      const currentRoute = useRoute();
      const routerStore = useRoutersStore();
      const state = reactive({
        menus: ref<any[]>([]),
        defaultOpenKeys: ref<Array<String>>([storage.get('open-key')]),
        defaultSelectedKeys: ref<Array<String>>([storage.get('select-key')]),
      });

      const openKey = (key: any) => {
        storage.set('select-key', key);
        console.log('key', key);
      };

      state.menus = routerStore.getRouters;

      watch(
        () => currentRoute.fullPath,
        () => {
          console.log(currentRoute);
          state.defaultSelectedKeys = [currentRoute.name as string];
        }
      );

      return {
        ...toRefs(state),

        isArray,
        openKey,
      };
    },
  });
</script>

<style scoped></style>
