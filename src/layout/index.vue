<template>
  <a-layout class="layout">
    <LoadingBar ref="loading" />
    <div class="layoutNavbar">
      <nav-bar />
    </div>
    <a-layout>
      <!--   TODO: 改为动态 48 220  -->
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
          <!--          <a-affix :offsetTop="60">-->
          <tags-view />
          <!--          </a-affix>-->
          <div
            :class="{
              'main-view-fix': true,
              noMultiTabs: false,
            }"
          >
            <router-view />
          </div>
        </a-layout-content>
        <footer-bar />
      </a-layout>
    </a-layout>
  </a-layout>
  <Settings />
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import styles from './style/layout.module.less';
  import projectSetting from '@/settings/projectSetting';
  import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute } from 'vue-router';
  import LoadingBarType from '@/layout/components/LoadingBar/LoadingBar';
  import { NavBar } from '@/layout/components/NavBar';
  import { MenuBox } from '@/layout/components/MenuBox';
  import { LoadingBar } from '@/layout/components/LoadingBar';
  import { FooterBar } from '@/layout/components/FooterBar';
  import { TagsView } from '@/layout/components/TagsView';
  import { Settings } from '@/layout/components/Settings';

  export default defineComponent({
    name: 'Layout',
    components: {
      NavBar,
      MenuBox,
      LoadingBar,
      FooterBar,
      TagsView,
      Settings,
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

      // const watchWidth = () => {
      //   const Width = document.body.clientWidth;
      //   collapsed.value = Width <= 950;
      // };

      // onMounted(() => {
      //   window.addEventListener('resize', watchWidth);
      // });

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

  .main-view-fix {
    //padding-top: 24px;
    height: calc(100% - 44px);
  }

  .noMultiTabs {
    //padding-top: 0;
    height: 100%;
  }
</style>
