<template>
  <a-layout class="layout">
    <!--  <LoadingBar ref={loadingBarRef} />-->
    <!--    v-if="showNavbar" -->
    <div class="layoutNavbar">
      <NavBar />
    </div>
    <!--    <div style="background-color: red" class="layoutNavbar">1112222</div>-->
    <a-layout>
      <a-layout-sider class="layoutSider" style="width: 220px; padding-top: 60px">
        <div class="menuWrapper">
          <Menu />
        </div>
      </a-layout-sider>
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
  import Menu from '@/components/Menu/index.vue';

  export default defineComponent({
    name: 'Layout',
    components: {
      NavBar,
      Menu,
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
