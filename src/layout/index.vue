<template>
  <a-layout class="layout">
    <!--  <LoadingBar ref={loadingBarRef} />-->
    <!--    v-if="showNavbar" -->
    <div class="layoutNavbar">
      <NavBar />
    </div>
    <!--    <div style="background-color: red" class="layoutNavbar">1112222</div>-->
    <a-layout>
      <a-sider class="layoutSider" style="width: 220px; padding-top: 60px" width="200">
        <div class="menuWrapper">
          <a-menu
            :defaultOpenKeys="['1']"
            :defaultSelectedKeys="['0_2']"
          >
            <a-menu-item key="0_1" disabled>
              <IconHome />
              Menu 1
            </a-menu-item>
            <a-menu-item key="0_2">
              <IconCalendar />
              Menu 2
            </a-menu-item>
            <a-sub-menu key="1">
              <template #title>
                <span><IconCalendar />Navigation 1</span>
              </template>
              <a-menu-item key="1_1">Menu 1</a-menu-item>
              <a-menu-item key="1_2">Menu 2</a-menu-item>
              <a-sub-menu key="2" title="Navigation 2">
                <a-menu-item key="2_1">Menu 1</a-menu-item>
                <a-menu-item key="2_2">Menu 2</a-menu-item>
              </a-sub-menu>
              <a-sub-menu key="3" title="Navigation 3">
                <a-menu-item key="3_1">Menu 1</a-menu-item>
                <a-menu-item key="3_2">Menu 2</a-menu-item>
                <a-menu-item key="3_3">Menu 3</a-menu-item>
              </a-sub-menu>
            </a-sub-menu>
            <a-sub-menu key="4">
              <template #title>
                <span><IconCalendar />Navigation 4</span>
              </template>
              <a-menu-item key="4_1">Menu 1</a-menu-item>
              <a-menu-item key="4_2">Menu 2</a-menu-item>
              <a-menu-item key="4_3">Menu 3</a-menu-item>
            </a-sub-menu>
          </a-menu>
        </div>
      </a-sider>
      <a-layout class="layoutContent" style="padding-left: 220px; padding-top: 60px">
        <a-layout-content> <router-view /> </a-layout-content>
        <a-layout-footer>1111</a-layout-footer>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import styles from './style/layout.module.less';
  import projectSetting from '@/settings/projectSetting';
  import NavBar from '@/components/NavBar/index.vue';

  export default defineComponent({
    name: 'Layout',
    components: {
      NavBar,
    },
    setup() {
      const { headerSetting } = projectSetting;
      return {
        styles,
        headerSetting,
      };
    },
  });
</script>

<style lang="less" scoped>
  @import './style/layout.module.less';
</style>
