<template>
  <div class="h-full w-full flex justify-center items-center"> ArcoDesignPro @ {{ year }} </div>
</template>

<script lang="ts" setup>
  const date = new Date();
  const year = date.getFullYear();
</script>

<style lang="less" scoped></style>
