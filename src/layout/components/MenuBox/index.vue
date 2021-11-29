<template>
  <a-menu :defaultOpenKeys="['1']" :defaultSelectedKeys="['0_2']">
    <menu-item v-for="menu in menus" :key="menu.name" :item="menu" />
    <!--   不分组   -->
  </a-menu>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { generatorMenu } from '@/utils';
  import { asyncRoutes } from '@/router';
  import { isArray } from 'lodash-es';
  import MenuItem from '@/layout/components/MenuBox/MenuItem.vue';

  export default defineComponent({
    name: 'Menu',
    components: {
      MenuItem,
    },
    setup() {
      const menus = generatorMenu(asyncRoutes);
      console.log(menus);
      return {
        menus,

        isArray,
      };
    },
  });
</script>

<style scoped></style>
