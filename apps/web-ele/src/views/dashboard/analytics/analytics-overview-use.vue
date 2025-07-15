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
      top: 0,
      bottom: 0,
    },
    legend: {
      show: true,
      top: 'center',
      right: '0',
      orient: 'vertical',
      icon: 'circle',
      itemWidth: 6,
      itemHeight: 6,
    },
    tooltip: {
      show: true,
    },
    series: [
      {
        name: '总计',
        type: 'pie',
        radius: ['50%', '70%'],
        label: {
          show: false,
        },
        data: [
          { value: 1024, name: '微信' },
          { value: 1024, name: '抖音' },
          { value: 1024, name: '知乎' },
        ],
      },
    ],
  });
});
</script>

<template>
  <EchartsUI ref="chartRef" height="70px" width="120px" />
</template>
