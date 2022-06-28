<template>
  <a-layout class="admin-layout">
    <Sider />
    <a-layout class="layout-body">
      <!--    <a-layout class="layout-body" :style="{ marginLeft: !siderVisible ? 0 : headerLeft + 'px' }">-->
      <Header v-bind="headerProps" />
      <Tab />
      <a-layout>
        <a-layout-content :style="{ marginTop: headerHeight + 'px' }">
          <Content />
        </a-layout-content>
        <a-layout-footer>Footer</a-layout-footer>
      </a-layout>
    </a-layout>
    <Setting />
  </a-layout>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useAppStore, useThemeStore } from '@/store';
  import { useBasicLayout } from '@/composables';
  import { Sider, Header, Tab, Content, Setting } from '@/layout/common';

  const { mode, headerProps, siderVisible, siderWidth, siderCollapsedWidth } = useBasicLayout();

  const theme = useThemeStore();
  const app = useAppStore();

  // const headerLeft = computed((): number => {
  //   return app.siderCollapse ? siderCollapsedWidth.value : siderWidth.value;
  // });

  const headerHeight = computed((): number => {
    let { height } = theme.header;
    if (theme.tab.visible) {
      height += theme.tab.height;
    }
    if (!theme.fixedHeaderAndTab) {
      height = 0;
    }
    return height;
  });
</script>

<style lang="less" scoped>
  .admin-layout {
    height: 100%;
    width: 100%;
  }
</style>
