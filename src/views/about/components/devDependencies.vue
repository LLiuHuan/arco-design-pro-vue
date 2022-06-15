<template>
  <a-card :bordered="false" title="开发环境依赖" class="mt-4 proCard" size="small">
    <a-descriptions :data="devDependencies" :column="2" bordered />
  </a-card>
</template>

<script lang="ts" setup>
  import { pkgJson } from './model';

  const { devDependencies } = pkgJson;
  defineExpose({ devDependencies });
</script>

<style lang="less" scoped></style>
