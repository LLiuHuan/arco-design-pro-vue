<template>
  <a-alert class="mb-20px" :show-icon="false"
    >文档地址：https://lbsyun.baidu.com/index.php?title=jspopular3.0</a-alert
  >
  <div ref="domRef" class="w-full h-400px"></div>
</template>

<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { useScriptTag } from '@vueuse/core';
  import { BAIDU_MAP_SDK_URL } from '@/config';

  const { load } = useScriptTag(BAIDU_MAP_SDK_URL);

  const domRef = ref<HTMLDivElement>();

  async function renderMap() {
    await load(true);
    if (!domRef.value) return;
    const map = new BMap.Map(domRef.value);
    const point = new BMap.Point(116.397428, 39.90923);
    map.centerAndZoom(point, 12);
    map.enableScrollWheelZoom();
  }

  onMounted(() => {
    renderMap();
  });
</script>

<style lang="less" scoped></style>
