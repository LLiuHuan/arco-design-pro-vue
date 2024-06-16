<template>
  <ACard :bordered="false">
    <div ref="domRef" class="w-full h-300px"></div>
  </ACard>
</template>

<script lang="ts" setup>
  import { useEcharts } from '@/hooks/web/useEcharts';

  const { domRef } = useEcharts(
    {
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
    },
    {
      onRender() {},
    },
  );
</script>

<style lang="less" scoped></style>
