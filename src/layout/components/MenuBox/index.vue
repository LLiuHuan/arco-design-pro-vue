<template>
  <a-menu
    @menu-item-click="openKey"
    :default-selected-keys="defaultSelectedKeys"
    :default-open-keys="defaultOpenKeys"
  >
    <menu-item v-for="menu in menus" :key="menu.name" :item="menu" />
    <!--   不分组   -->
  </a-menu>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, toRefs } from 'vue';
  import { isArray } from 'lodash-es';
  import MenuItem from '@/layout/components/MenuBox/MenuItem.vue';
  import { storage } from '@/utils/storage';
  import { useStore } from '@/store';
  import { GettersType } from '@/store/modules/route/getters';

  export default defineComponent({
    name: 'Menu',
    components: {
      MenuItem,
    },
    setup() {
      // const menus = generatorMenu(asyncRoutes);
      const store = useStore();
      const state = reactive({
        menus: ref<any[]>([]),
        defaultOpenKeys: ref<Array<String>>([storage.get('open-key')]),
        defaultSelectedKeys: ref<Array<String>>([storage.get('select-key')]),
      });

      const openKey = (key: any) => {
        if (key.split('.').length > 0) storage.set('open-key', key.split('.')[0]);
        storage.set('select-key', key);
      };

      state.menus = store.getters[GettersType.GET_ASYNC_ROUTER];

      return {
        ...toRefs(state),

        isArray,
        openKey,
      };
    },
  });
</script>

<style scoped></style>
