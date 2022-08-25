<!--<template>-->
<!--  <a-menu @menu-item-click="openKey" v-model:selected-keys="defaultSelectedKeys" auto-open-selected>-->
<!--    <MenuItem v-for="(menu, index) in menus" :key="index" :item="menu" />-->
<!--    &lt;!&ndash;   不分组   &ndash;&gt;-->
<!--  </a-menu>-->
<!--</template>-->

<!--<script lang="ts">-->
<!--  import { defineComponent, onBeforeMount, reactive, ref, toRefs, watch } from 'vue';-->
<!--  import { useRoute } from 'vue-router';-->
<!--  import { isArray } from 'lodash-es';-->
<!--  import { generatorMenu, generatorMenuMix } from '@/utils';-->
<!--  import MenuItem from '@/layout/BasicLayout/components/MenuBox/MenuItem.vue';-->
<!--  import { storage } from '@/utils/storage/storage';-->
<!--  import { useRouterStore } from '@/store/modules/routers';-->
<!--  import { useSettingStore } from '@/store/modules/settings';-->

<!--  export default defineComponent({-->
<!--    name: 'Menu',-->
<!--    components: {-->
<!--      MenuItem,-->
<!--    },-->
<!--    props: {-->
<!--      mode: {-->
<!--        // 菜单模式-->
<!--        type: String,-->
<!--        default: 'vertical',-->
<!--      },-->
<!--      collapsed: {-->
<!--        // 侧边栏菜单是否收起-->
<!--        type: Boolean,-->
<!--      },-->
<!--      // 位置-->
<!--      location: {-->
<!--        type: String,-->
<!--        default: 'left',-->
<!--      },-->
<!--    },-->
<!--    emits: ['update:collapsed'],-->
<!--    setup(props) {-->
<!--      // const menus = generatorMenu(asyncRoutes);-->
<!--      const currentRoute = useRoute();-->
<!--      const routerStore = useRouterStore();-->
<!--      const settingStore = useSettingStore();-->
<!--      const headerMenuSelectKey = ref<string>('');-->
<!--      const selectedKeys = ref<string>(currentRoute.name as string);-->

<!--      const menus = ref<any[]>([]);-->

<!--      // 获取当前打开的子菜单-->
<!--      const { matched } = currentRoute;-->

<!--      const getOpenKeys = matched && matched.length ? matched.map((item) => item.name) : [];-->

<!--      const state = reactive({-->
<!--        defaultSelectedKeys: ref<string[]>([selectedKeys.value]),-->
<!--        openKeys: getOpenKeys,-->
<!--      });-->

<!--      const openKey = (key: any) => {-->
<!--        storage.set('select-key', key);-->
<!--      };-->

<!--      menus.value = routerStore.getRouters;-->

<!--      watch(-->
<!--        () => currentRoute.fullPath,-->
<!--        () => {-->
<!--          updateMenu();-->
<!--          const { matched } = currentRoute;-->
<!--          state.openKeys = matched.map((item) => item.name);-->
<!--          const activeMenu: string = (currentRoute.meta?.activeMenu as string) || '';-->
<!--          selectedKeys.value = activeMenu ? (activeMenu as string) : (currentRoute.name as string);-->
<!--          state.defaultSelectedKeys = [selectedKeys.value];-->
<!--          openKey(selectedKeys.value);-->
<!--        }-->
<!--      );-->

<!--      function updateMenu() {-->
<!--        if (!settingStore.menuSetting.mixMenu) {-->
<!--          menus.value = generatorMenu(routerStore.getRouters);-->
<!--        } else {-->
<!--          // 混合菜单-->
<!--          const firstRouteName: string = (currentRoute.matched[0].name as string) || '';-->
<!--          menus.value = generatorMenuMix(routerStore.getRouters, firstRouteName, props.location);-->
<!--          const activeMenu: string = currentRoute?.matched[0].meta?.activeMenu as string;-->
<!--          headerMenuSelectKey.value = activeMenu || firstRouteName || '';-->
<!--        }-->
<!--      }-->

<!--      onBeforeMount(() => {-->
<!--        updateMenu();-->
<!--      });-->

<!--      return {-->
<!--        ...toRefs(state),-->
<!--        menus,-->
<!--        isArray,-->
<!--        openKey,-->
<!--      };-->
<!--    },-->
<!--  });-->
<!--</script>-->

<!--<style scoped></style>-->
