<template>
  <a-layout class="layout">
    <LoadingBar ref="loading" />
    <div class="layoutNavbar">
      <nav-bar />
    </div>
    <a-layout>
      <a-layout-sider
        collapsible
        :collapsed="collapsed"
        class="layoutSider"
        hide-trigger
        style="padding-top: 60px"
        :style="{ width: collapsed ? '48px' : '220px' }"
      >
        <menu-box />
        <div class="collapseBtn" @click="fold">
          <icon-menu-unfold v-if="collapsed" />
          <icon-menu-fold v-else />
        </div>
      </a-layout-sider>
      <a-layout
        class="layoutContent"
        style="padding-top: 60px"
        :style="{ paddingLeft: collapsed ? '48px' : '220px' }"
      >
        <a-layout-content>
          <tags-view />
          <router-view />
        </a-layout-content>
        <footer-bar />
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import styles from './style/layout.module.less';
  import projectSetting from '@/settings/projectSetting';
  import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute } from 'vue-router';
  import LoadingBarType from '@/layout/components/LoadingBar/LoadingBar';
  import NavBar from '@/layout/components/NavBar/index.vue';
  import MenuBox from '@/layout/components/MenuBox/index.vue';
  import LoadingBar from '@/layout/components/LoadingBar/index.vue';
  import FooterBar from '@/layout/components/FooterBar/index.vue';
  import { TagsView } from '@/layout/components/TagsView';

  export default defineComponent({
    name: 'Layout',
    components: {
      NavBar,
      MenuBox,
      LoadingBar,
      FooterBar,
      TagsView,
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
