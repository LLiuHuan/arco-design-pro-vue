<template>
  <a-layout class="admin-layout">
    <Sider />
    <a-layout class="layout-body">
      <!--    <a-layout class="layout-body" :style="{ marginLeft: !siderVisible ? 0 : headerLeft + 'px' }">-->
      <Header v-bind="headerProps" />
      <Tab />
      <a-layout>
        <a-layout-content
          :style="{
            marginTop: headerHeight + 'px',
            marginBottom: theme.footer.fixed ? theme.footer.height + 'px' : '',
          }"
        >
          <Content />
        </a-layout-content>
        <a-layout-footer style="color: var(--color-text-1)" :style="footerStyle">
          <Footer />
        </a-layout-footer>
      </a-layout>
    </a-layout>
    <Setting />
  </a-layout>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useThemeStore } from '@/store';
  import { useBasicLayout } from '@/composables';
  import { Sider, Header, Tab, Content, Setting, Footer } from '@/layout/common';
  import { setBaseColor } from '@/utils/color';

  const { headerProps } = useBasicLayout();

  const theme = useThemeStore();
  // const app = useAppStore();

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

  const footerStyle = computed(() => {
    if (theme.footer.fixed) {
      return {
        position: 'fixed',
        zIndex: 4,
        height: `${theme.footer.height}px`,
        paddingLeft: `${theme.sider.width}px`,
        transitionDuration: '300ms',
        transitionTimingFunction: 'ease-in-out',
        transform: 'translateX(0px)',
        left: 0,
        bottom: 0,
        'flex-shrink': 0,
        'box-sizing': 'border-box',
        width: '100%',
        'transition-property': 'padding-left',
        backgroundColor: 'var(--color-bg-1)',
      };
    }
    return {
      height: `${theme.footer.height}px`,
    };
  });

  const init = () => {
    setBaseColor(theme.themeColor);
  };

  init();
</script>

<style lang="less" scoped>
  .admin-layout {
    height: 100%;
    width: 100%;
  }
</style>
