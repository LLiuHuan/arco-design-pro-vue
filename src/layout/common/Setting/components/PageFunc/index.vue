<template>
  <a-divider orientation="center">界面功能</a-divider>
  <a-space direction="vertical" fill>
    <!--    <setting-menu label="侧边栏反转色">-->
    <!--      <a-switch :model-value="theme.sider.inverted" @change="theme.setSiderInverted" />-->
    <!--    </setting-menu>-->
    <!--    <setting-menu label="头部反转色">-->
    <!--      <a-switch :model-value="theme.header.inverted" @change="theme.setHeaderInverted" />-->
    <!--    </setting-menu>-->
    <setting-menu label="固定头部和多页签">
      <a-switch :model-value="theme.fixedHeaderAndTab" @change="theme.setIsFixedHeaderAndTab" />
    </setting-menu>
    <!--    <setting-menu label="顶部菜单位置">-->
    <!--      <n-select-->
    <!--        class="w-120px"-->
    <!--        size="small"-->
    <!--        :value="theme.menu.horizontalPosition"-->
    <!--        :options="theme.menu.horizontalPositionList"-->
    <!--        @update:value="theme.setHorizontalMenuPosition"-->
    <!--      />-->
    <!--    </setting-menu>-->
    <setting-menu label="头部高度">
      <a-input-number
        class="max-w-120px"
        size="small"
        v-model="theme.header.height"
        @change="theme.setHeaderHeight"
        :step="1"
      />
    </setting-menu>
    <setting-menu label="多页签高度">
      <a-input-number
        class="max-w-120px"
        size="small"
        v-model="theme.tab.height"
        @change="theme.setTabHeight"
        :step="1"
      />
    </setting-menu>
    <setting-menu label="多页签缓存">
      <a-switch :model-value="theme.tab.isCache" @change="theme.setTabIsCache" />
    </setting-menu>
    <setting-menu label="侧边栏展开宽度">
      <a-input-number
        class="max-w-120px"
        size="small"
        v-model="theme.sider.width"
        @change="theme.setSiderWidth"
        :step="10"
      />
    </setting-menu>
    <setting-menu label="左侧混合侧边栏展开宽度">
      <a-input-number
        class="max-w-120px"
        size="small"
        v-model="theme.sider.mixWidth"
        @change="theme.setMixSiderWidth"
        :step="10"
      />
    </setting-menu>
    <setting-menu label="固定底部">
      <a-switch :model-value="theme.footer.fixed" @change="theme.setFooterIsFixed" />
    </setting-menu>
  </a-space>
</template>

<script lang="ts" setup>
  import { useThemeStore } from '@/store';
  import SettingMenu from '../SettingMenu/index.vue';

  const theme = useThemeStore();
</script>

<style lang="less" scoped></style>
