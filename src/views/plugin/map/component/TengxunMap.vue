<template>
  <a-alert class="mb-20px" :show-icon="false"
    >文档地址：https://lbs.qq.com/webApi/javascriptV2/jsDoc/jsDocIndex</a-alert
  >
  <div ref="domRef" class="w-full h-800px"></div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useScriptTag } from '@vueuse/core';
  import { TENXUN_MAP_SDK_URL } from '@/config';

  const { load } = useScriptTag(TENXUN_MAP_SDK_URL);

  const domRef = ref<HTMLDivElement | null>(null);

  async function renderMap() {
    await load(true);
    if (!domRef.value) return;
    // eslint-disable-next-line no-new
    new TMap.Map(domRef.value, {
      center: new TMap.LatLng(39.90923, 116.397428),
      zoom: 11,
      viewMode: '3D',
    });
  }

  onMounted(() => {
    renderMap();
  });
</script>

<style lang="less" scoped></style>
