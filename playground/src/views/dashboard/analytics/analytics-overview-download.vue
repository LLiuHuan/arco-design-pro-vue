<script lang="ts" setup>
import type { EchartsUIType } from '@arco/plugins/echarts';

import { onMounted, ref } from 'vue';

import { EchartsUI, useEcharts } from '@arco/plugins/echarts';

const chartRef = ref<EchartsUIType>();
const { renderEcharts } = useEcharts(chartRef);

onMounted(() => {
  renderEcharts({
    grid: {
      left: 0,
      right: 0,
      top: 10,
      bottom: 0,
    },
    xAxis: {
      type: 'category',
      show: false,
    },
    yAxis: {
      show: false,
    },
    tooltip: {
      show: true,
      trigger: 'axis',
    },
    series: [
      {
        name: '2001',
        data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100)),
        type: 'line',
        showSymbol: false,
        smooth: true,
        lineStyle: {
          color: '#165DFF',
          width: 3,
        },
      },
      {
        name: '2002',
        data: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100)),
        type: 'line',
        showSymbol: false,
        smooth: true,
        lineStyle: {
          color: '#6AA1FF',
          width: 3,
          type: 'dashed',
        },
      },
    ],
  });
});
</script>

<template>
  <EchartsUI ref="chartRef" height="70px" width="120px" />
</template>
