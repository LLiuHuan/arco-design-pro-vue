<template>
  <a-card class="general-card" :header-style="{ paddingBottom: '15px' }">
    <a-grid class="pb-15px" :cols="24" :col-gap="12" :row-gap="12">
      <a-grid-item :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 16, xxl: 16 }">
        <div class="flex-1-hidden h-full">
          <div ref="lineRef" class="wh-full"></div>
        </div>
      </a-grid-item>
      <a-grid-item :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 8, xxl: 8 }">
        <div ref="pieRef" class="w-full h-360px"></div>
      </a-grid-item>
    </a-grid>
  </a-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { ECOption, useEcharts } from '@/composables/echarts';

  const lineOptions = ref<ECOption>({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    legend: {
      data: ['下载量', '注册数'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: [
          '06:00',
          '08:00',
          '10:00',
          '12:00',
          '14:00',
          '16:00',
          '18:00',
          '20:00',
          '22:00',
          '24:00',
        ],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        color: '#8e9dff',
        name: '下载量',
        type: 'line',
        smooth: true,
        stack: 'Total',
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0.25,
                color: '#8e9dff',
              },
              {
                offset: 1,
                color: '#fff',
              },
            ],
          },
        },
        emphasis: {
          focus: 'series',
        },
        data: [4623, 6145, 6268, 6411, 1890, 4251, 2978, 3880, 3606, 4311],
      },
      {
        color: '#26deca',
        name: '注册数',
        type: 'line',
        smooth: true,
        stack: 'Total',
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0.25,
                color: '#26deca',
              },
              {
                offset: 1,
                color: '#fff',
              },
            ],
          },
        },
        emphasis: {
          focus: 'series',
        },
        data: [2208, 2016, 2916, 4512, 8281, 2008, 1963, 2367, 2956, 678],
      },
    ],
  });
  const { domRef: lineRef } = useEcharts(lineOptions as any);

  const pieOptions = ref<ECOption>({
    tooltip: {
      trigger: 'item',
    },
    legend: {
      bottom: '1%',
      left: 'center',
      itemStyle: {
        borderWidth: 0,
      },
    },
    series: [
      {
        color: ['#5da8ff', '#8e9dff', '#fedc69', '#26deca'],
        name: '时间安排',
        type: 'pie',
        radius: ['45%', '75%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 1,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '12',
          },
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 20, name: '学习' },
          { value: 10, name: '娱乐' },
          { value: 30, name: '工作' },
          { value: 40, name: '休息' },
        ],
      },
    ],
  });
  const { domRef: pieRef } = useEcharts(pieOptions as any);
</script>

<style lang="less" scoped></style>
