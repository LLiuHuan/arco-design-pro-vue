<template>
  <a-layout class="layout">
    <!--  切换菜单顶部加载进度条  -->
    <LoadingBar ref="loading" />
    <div class="layoutNavbar">
      <!--   顶部菜单栏   -->
      <nav-bar />
    </div>
    <a-layout>
      <a-layout-sider
        collapsible
        :collapsed="collapsed"
        class="layoutSider"
        hide-trigger
        style="padding-top: 60px"
        :style="{ width: collapsed ? minMenuWidth + 'px' : menuWidth + 'px' }"
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
        :style="{
          paddingLeft: collapsed ? minMenuWidth + 'px' : menuWidth + 'px',
          height: '100vh',
        }"
      >
        <a-layout-content class="layoutContent1">
          <!--          <a-affix :offsetTop="60">-->
          <tags-view />
          <!--          </a-affix>-->
          <div
            id="base-content"
            :class="{
              'main-view-fix': true,
              noMultiTabs: false,
            }"
          >
            <router-view />
          </div>
          <a-back-top target-container="#base-content" :style="{ position: 'absolute' }" />
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
  import { useSettingStore } from '@/store/modules/settings';

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

      const settingStore = useSettingStore();

      const { collapsed: menuCollapsed, menuWidth, minMenuWidth } = settingStore.menuSetting;

      const collapsed = ref<boolean>(menuCollapsed);

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

        menuWidth,
        minMenuWidth,
      };
    },
  });
</script>

<style lang="less" scoped>
  @import './style/layout.module.less';

  .main-view-fix {
    //padding-top: 24px;
    overflow-y: auto;
    height: calc(100vh - 44px - 60px - 40px);
  }

  .noMultiTabs {
    //padding-top: 0;
    //height: 100%;
    height: calc(100vh - 60px - 40px);
  }
</style>
