<template>
  <VCharts
    v-if="renderChart"
    :option="options"
    :autoresize="autoresize"
    :style="{ width, height }"
  />

  {{ options }}
</template>

<script lang="ts" setup>
  import { nextTick, ref } from 'vue';
  import VCharts from 'vue-echarts';

  defineProps({
    options: {
      type: Object,
      default() {
        return {};
      },
    },
    autoresize: {
      type: Boolean,
      default: true,
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '100%',
    },
  });

  const renderChart = ref(false);
  nextTick(() => {
    renderChart.value = true;
  });
</script>

<style scoped lang="less"></style>
