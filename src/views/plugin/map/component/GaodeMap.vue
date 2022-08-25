<template>
  <a-alert class="mb-20px" :show-icon="false"
    >文档地址：https://lbs.amap.com/api/jsapi-v2/summary</a-alert
  >
  <div ref="domRef" class="w-full h-400px"></div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { useScriptTag } from '@vueuse/core';
  // import AMapLoader from '@amap/amap-jsapi-loader';
  import { GAODE_MAP_SDK_URL } from '@/config';

  const { load } = useScriptTag(GAODE_MAP_SDK_URL);

  const domRef = ref<HTMLDivElement>();

  async function renderMap() {
    await load(true);
    if (!domRef.value) return;
    const map = new AMap.Map(domRef.value, {
      zoom: 11,
      center: [116.397428, 39.90923],
      viewMode: '3D',
    });
    map.getCenter();
  }

  onMounted(() => {
    renderMap();
  });
</script>

<style lang="less" scoped></style>
