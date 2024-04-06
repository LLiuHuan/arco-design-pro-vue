<template>
  <div>
    测试Menu带参1

    <div>当前路由参数：{{ computedParams }}</div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, unref } from 'vue';
  import { useRouter } from 'vue-router';

  const { currentRoute, replace } = useRouter();

  const computedParams = computed(() => unref(currentRoute).params);
</script>

<style lang="less" scoped></style>
