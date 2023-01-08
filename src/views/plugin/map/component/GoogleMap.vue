<template>
  <a-alert class="mb-20px" :show-icon="false">文档地址：https://vue-map.netlify.app/</a-alert>
  <GMapMap class="w-full !h-800px" :center="center" :zoom="7" map-type-id="terrain" />
</template>

<script setup lang="ts">
  const center = { lat: 40.689247, lng: -74.044502 };
</script>

<style lang="less" scoped></style>
