<template>
  <mix-sider v-if="getIsMixSidebar"></mix-sider>
  <sider v-else></sider>
</template>

<script lang="ts" setup>
  import { useMenuSetting } from '@/hooks/setting';
  import { Sider, MixSider } from './components';

  const { getIsMixSidebar } = useMenuSetting();
</script>

<style lang="less" scoped></style>
