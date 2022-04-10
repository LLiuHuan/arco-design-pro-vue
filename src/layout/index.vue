<template>
  <a-layout class="layout">
    <!--  切换菜单顶部加载进度条  -->
    <!--    <LoadingBar ref="loading" />-->
    <div class="layout-navbar">
      <!--   顶部菜单栏   -->
      <nav-bar />
    </div>
    <a-layout>
      <a-layout-sider
        collapsible
        :collapsed="collapsed"
        class="layout-sider"
        hide-trigger
        style="padding-top: 64px"
        :style="{ width: collapsed ? minMenuWidth + 'px' : menuWidth + 'px' }"
      >
        <menu-box />
        <div class="collapseBtn" @click="fold">
          <icon-menu-unfold v-if="collapsed" />
          <icon-menu-fold v-else />
        </div>
      </a-layout-sider>
      <a-layout
        :style="{
          paddingLeft: collapsed ? minMenuWidth + 'px' : menuWidth + 'px',
          height: '100vh',
        }"
        style="transition: padding-left 0.2s ease 0s"
      >
        <a-layout-content id="layout-content" class="layout-content" style="overflow-y: auto">
          <div
            class="layout-content-main"
            :class="{
              'layout-content-main-fix': fixedMulti,
            }"
            style="overflow-y: auto"
          >
            <tags-view v-if="isMultiTabs" v-model:collapsed="collapsed" />
            <div
              id="main-view"
              :class="{
                'main-view-fix': fixedMulti,
                noMultiTabs: !isMultiTabs,
                'mt-3': !isMultiTabs,
              }"
            >
              <MainView />
            </div>
          </div>
        </a-layout-content>
        <a-back-top target-container="#layout-content" :style="{ position: 'absolute' }" />
        <footer-bar />
      </a-layout>
    </a-layout>
  </a-layout>
  <Settings />
</template>

<script lang="ts" setup>
  import { computed, ref, unref, watch } from 'vue';
  import projectSetting from '@/settings/projectSetting';
  import { NavBar } from '@/layout/components/NavBar';
  import { MenuBox } from '@/layout/components/MenuBox';
  import { FooterBar } from '@/layout/components/FooterBar';
  import { TagsView } from '@/layout/components/TagsView';
  import { Settings } from '@/layout/components/Settings';
  import { MainView } from '@/layout/components/MainView';
  import { useSettingStore } from '@/store/modules/settings';
  import { useProjectSetting } from '@/hooks/setting/useProjectSetting';
  import watermark from '@/utils/watermark';

  const { headerSetting } = projectSetting;
  const { getMultiTabsSetting } = useProjectSetting();

  const settingStore = useSettingStore();

  const { collapsed: menuCollapsed, menuWidth, minMenuWidth } = settingStore.menuSetting;

  if (settingStore.getWatermark) {
    //添加水印
    watermark.set('水印', {});
  }

  watch(
    () => settingStore.getWatermark,
    () => {
      if (settingStore.getWatermark) {
        //添加水印
        watermark.set('水印', {});
      } else {
        //移除水印
        watermark.close();
      }
    }
  );

  // 折叠菜单
  const collapsed = ref<boolean>(menuCollapsed);

  // 是否显示tabs
  const isMultiTabs = computed(() => {
    return unref(getMultiTabsSetting).show;
  });

  // 是否固定tabs
  const fixedMulti = computed(() => {
    return unref(getMultiTabsSetting).fixed;
  });

  // 折叠菜单
  const fold = () => {
    collapsed.value = !collapsed.value;
  };
</script>

<style lang="less" scoped>
  @import './style/layout.module.less';

  // TODO: 改为动态的
  .main-view-fix {
    //padding-top: 24px;
    //overflow-y: auto;
    //height: calc(100vh - 44px - 60px - 40px);
  }

  .noMultiTabs {
    //padding-top: 0;
    //height: 100%;
    height: calc(100vh - 60px - 40px);
  }
</style>
