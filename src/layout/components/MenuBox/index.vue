<template>
  <a-menu @menu-item-click="openKey">
    <menu-item v-for="menu in menus" :key="menu.name" :item="menu" />
    <!--   不分组   -->
  </a-menu>
</template>

<script lang="ts">
  import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
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
        defaultOpenKeys: ref(),
        defaultSelectedKeys: ref(),
      });

      const openKey = (key: any) => {
        storage.setCookie('open-key', key);
      };

      state.menus = store.getters[GettersType.GET_ASYNC_ROUTER];

      onMounted(() => {
        state.defaultSelectedKeys = storage.getCookie('open-key');
        let selected = state.defaultSelectedKeys.split('.');
        if (selected.length > 0) {
          state.defaultOpenKeys = selected[0];
        }
      });

      return {
        ...toRefs(state),

        isArray,
        openKey,
      };
    },
  });
</script>

<style scoped></style>
