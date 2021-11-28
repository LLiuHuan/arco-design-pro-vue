<template>
  <a-layout class="layout">
    <LoadingBar ref="loading" />
    <!--    v-if="showNavbar" -->
    <div class="layoutNavbar">
      <NavBar />
    </div>
    <!--    <div style="background-color: red" class="layoutNavbar">1112222</div>-->
    <a-layout>
      <a-layout-sider
        collapsible
        :collapsed="collapsed"
        @collapse="fold"
        class="layoutSider"
        style="padding-top: 60px"
        :style="{ width: collapsed ? '48px' : '220px' }"
      >
        <!-- trigger -->
        <template #trigger="{ collapsed }">
          <icon-caret-right v-if="collapsed" />
          <icon-caret-left v-else />
        </template>
        <!--        <div class="menuWrapper">-->
        <Menu />
        <!--        </div>-->
      </a-layout-sider>
      <a-layout
        class="layoutContent"
        style="padding-top: 60px"
        :style="{ paddingLeft: collapsed ? '48px' : '220px' }"
      >
        <a-layout-content> <router-view /> </a-layout-content>
        <a-layout-footer>1111</a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import styles from './style/layout.module.less';
  import projectSetting from '@/settings/projectSetting';
  import NavBar from '@/components/NavBar/index.vue';
  import Menu from '@/components/Menu/index.vue';
  import LoadingBar from '@/components/LoadingBar/index.vue';
  import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute } from 'vue-router';
  import LoadingBarType from '@/components/LoadingBar/LoadingBar';

  export default defineComponent({
    name: 'Layout',
    components: {
      NavBar,
      Menu,
      LoadingBar,
    },
    setup: function () {
      const loading = ref<null | LoadingBarType>(null);
      const { headerSetting } = projectSetting;
      const route = useRoute();

      const collapsed = ref<boolean>(false);

      const fold = () => {
        collapsed.value = !collapsed.value;
      };

      onBeforeRouteLeave(() => {
        if (loading.value) {
          loading.value.success();
        }
      });

      onBeforeRouteUpdate(() => {
        if (loading.value) {
          loading.value.success();
        }
      });

      watch(
        () => route.path,
        () => {
          if (loading.value) {
            loading.value.loading();
          }
        }
      );

      return {
        styles,
        headerSetting,
        loading,
        collapsed,
        fold,
      };
    },
  });
</script>

<style lang="less" scoped>
  @import './style/layout.module.less';
</style>
