<template>
  <a-card :bordered="false" title="生产环境依赖" class="mt-4 proCard" size="small">
    <a-descriptions :data="dependencies" :column="2" bordered />
  </a-card>
</template>

<script lang="ts" setup>
  import { pkgJson } from './model';

  const { dependencies } = pkgJson;
  defineExpose({ dependencies });
</script>

<style lang="less" scoped></style>
