<template>
  <a-menu @menu-item-click="openKey" v-model:selected-keys="defaultSelectedKeys" auto-open-selected>
    <MenuItem v-for="menu in menus" :key="menu.name" :item="menu" />
    <!--   不分组   -->
  </a-menu>
</template>

<script lang="ts">
  import { defineComponent, onBeforeMount, reactive, ref, toRefs, watch } from 'vue';
  import { isArray } from 'lodash-es';
  import MenuItem from '@/layout/components/MenuBox/MenuItem.vue';
  import { storage } from '@/utils/storage';
  import { useRouterStore } from '@/store/modules/routers';
  import { useRoute } from 'vue-router';
  import { generatorMenu, generatorMenuMix } from '@/utils';
  import { useSettingStore } from '@/store/modules/settings';

  export default defineComponent({
    name: 'Menu',
    components: {
      MenuItem,
    },
    props: {
      mode: {
        // 菜单模式
        type: String,
        default: 'vertical',
      },
      collapsed: {
        // 侧边栏菜单是否收起
        type: Boolean,
      },
      //位置
      location: {
        type: String,
        default: 'left',
      },
    },
    emits: ['update:collapsed'],
    setup(props) {
      // const menus = generatorMenu(asyncRoutes);
      const currentRoute = useRoute();
      const routerStore = useRouterStore();
      const settingStore = useSettingStore();
      const headerMenuSelectKey = ref<string>('');
      const selectedKeys = ref<string>(currentRoute.name as string);

      const menus = ref<any[]>([]);

      // 获取当前打开的子菜单
      const matched = currentRoute.matched;

      const getOpenKeys = matched && matched.length ? matched.map((item) => item.name) : [];

      const state = reactive({
        defaultSelectedKeys: ref<Array<String>>([storage.get('select-key')]),
        openKeys: getOpenKeys,
      });

      const openKey = (key: any) => {
        storage.set('select-key', key);
      };

      menus.value = routerStore.getRouters;

      watch(
        () => currentRoute.fullPath,
        () => {
          updateMenu();
          const matched = currentRoute.matched;
          state.openKeys = matched.map((item) => item.name);
          const activeMenu: string = (currentRoute.meta?.activeMenu as string) || '';
          selectedKeys.value = activeMenu ? (activeMenu as string) : (currentRoute.name as string);
          state.defaultSelectedKeys = [selectedKeys.value];
        }
      );

      function updateMenu() {
        if (!settingStore.menuSetting.mixMenu) {
          menus.value = generatorMenu(routerStore.getRouters);
        } else {
          //混合菜单
          const firstRouteName: string = (currentRoute.matched[0].name as string) || '';
          menus.value = generatorMenuMix(routerStore.getRouters, firstRouteName, props.location);
          const activeMenu: string = currentRoute?.matched[0].meta?.activeMenu as string;
          headerMenuSelectKey.value = (activeMenu ? activeMenu : firstRouteName) || '';
        }
      }

      onBeforeMount(() => {
        updateMenu();
        console.log(currentRoute.fullPath);
      });

      return {
        ...toRefs(state),
        menus,
        isArray,
        openKey,
      };
    },
  });
</script>

<style scoped></style>
