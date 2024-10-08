<script lang="ts" setup>
  import { onUnmounted, ref, unref } from 'vue';
  import { ECOption, useEcharts } from '@/hooks/web/useEcharts';
  import { useI18n } from '@/hooks/web/useI18n';

  const { t } = useI18n();

  const lineOptions = ref<ECOption>({
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true,
      },
    ],
  });
  const { domRef: lineRef } = useEcharts(() => unref(lineOptions), {
    onRender() {},
  });

  const barOptions = ref<ECOption>({
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
      },
    ],
  });
  const { domRef: barRef } = useEcharts(() => unref(barOptions), {
    onRender() {},
  });

  const pieOptions = ref<ECOption>({
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        dataView: { show: true, readOnly: false },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    series: [
      {
        name: 'Nightingale Chart',
        type: 'pie',
        radius: [20, 90],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8,
        },
        data: [
          { value: 40, name: 'rose 1' },
          { value: 38, name: 'rose 2' },
          { value: 32, name: 'rose 3' },
          { value: 30, name: 'rose 4' },
          { value: 28, name: 'rose 5' },
          { value: 48, name: 'rose 6' },
          { value: 78, name: 'rose 7' },
          { value: 18, name: 'rose 8' },
        ],
      },
    ],
  });
  const { domRef: pieRef } = useEcharts(() => unref(pieOptions), {
    onRender() {},
  });

  const scatterOptions = ref<ECOption>({
    xAxis: {},
    yAxis: {},
    series: [
      {
        symbolSize: 20,
        data: [
          [10.0, 8.04],
          [8.07, 6.95],
          [13.0, 7.58],
          [9.05, 8.81],
          [11.0, 8.33],
          [14.0, 7.66],
          [13.4, 6.81],
          [10.0, 6.33],
          [14.0, 8.96],
          [12.5, 6.82],
          [9.15, 7.2],
          [11.5, 7.2],
          [3.03, 4.23],
          [12.2, 7.83],
          [2.02, 4.47],
          [1.05, 3.33],
          [4.05, 4.96],
          [6.03, 7.24],
          [12.0, 6.26],
          [12.0, 8.84],
          [7.08, 5.82],
          [5.02, 5.68],
        ],
        type: 'scatter',
      },
    ],
  });
  const { domRef: scatterRef } = useEcharts(() => unref(scatterOptions), {
    onRender() {},
  });

  const treeOptions = ref<ECOption>({
    series: [
      {
        type: 'treemap',
        data: [
          {
            name: 'nodeA', // First tree
            value: 10,
            children: [
              {
                name: 'nodeAa', // First leaf of first tree
                value: 4,
              },
              {
                name: 'nodeAb', // Second leaf of first tree
                value: 6,
              },
            ],
          },
          {
            name: 'nodeB', // Second tree
            value: 20,
            children: [
              {
                name: 'nodeBa', // Son of first tree
                value: 20,
                children: [
                  {
                    name: 'nodeBa1', // Granson of first tree
                    value: 20,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  });
  const { domRef: treeRef } = useEcharts(() => unref(treeOptions), {
    onRender() {},
  });

  const gaugeOptions = ref<ECOption>({
    series: [
      {
        name: 'hour',
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        min: 0,
        max: 12,
        splitNumber: 12,
        clockwise: true,
        axisLine: {
          lineStyle: {
            width: 15,
            color: [[1, 'rgba(0,0,0,0.7)']],
            shadowColor: 'rgba(0, 0, 0, 0.5)',
            shadowBlur: 15,
          },
        },
        splitLine: {
          lineStyle: {
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            shadowBlur: 3,
            shadowOffsetX: 1,
            shadowOffsetY: 2,
          },
        },
        axisLabel: {
          fontSize: 15,
          distance: 15,
          formatter(value) {
            if (value === 0) {
              return '';
            }
            return `${value}`;
          },
        },
        anchor: {
          show: true,
          icon: 'path://M532.8,70.8C532.8,70.8,532.8,70.8,532.8,70.8L532.8,70.8C532.7,70.8,532.8,70.8,532.8,70.8z M456.1,49.6c-2.2-6.2-8.1-10.6-15-10.6h-37.5v10.6h37.5l0,0c2.9,0,5.3,2.4,5.3,5.3c0,2.9-2.4,5.3-5.3,5.3v0h-22.5c-1.5,0.1-3,0.4-4.3,0.9c-4.5,1.6-8.1,5.2-9.7,9.8c-0.6,1.7-0.9,3.4-0.9,5.3v16h10.6v-16l0,0l0,0c0-2.7,2.1-5,4.7-5.3h10.3l10.4,21.2h11.8l-10.4-21.2h0c6.9,0,12.8-4.4,15-10.6c0.6-1.7,0.9-3.5,0.9-5.3C457,53,456.7,51.2,456.1,49.6z M388.9,92.1h11.3L381,39h-3.6h-11.3L346.8,92v0h11.3l3.9-10.7h7.3h7.7l3.9-10.6h-7.7h-7.3l7.7-21.2v0L388.9,92.1z M301,38.9h-10.6v53.1H301V70.8h28.4l3.7-10.6H301V38.9zM333.2,38.9v10.6v10.7v31.9h10.6V38.9H333.2z M249.5,81.4L249.5,81.4L249.5,81.4c-2.9,0-5.3-2.4-5.3-5.3h0V54.9h0l0,0c0-2.9,2.4-5.3,5.3-5.3l0,0l0,0h33.6l3.9-10.6h-37.5c-1.9,0-3.6,0.3-5.3,0.9c-4.5,1.6-8.1,5.2-9.7,9.7c-0.6,1.7-0.9,3.5-0.9,5.3l0,0v21.3c0,1.9,0.3,3.6,0.9,5.3c1.6,4.5,5.2,8.1,9.7,9.7c1.7,0.6,3.5,0.9,5.3,0.9h33.6l3.9-10.6H249.5z M176.8,38.9v10.6h49.6l3.9-10.6H176.8z M192.7,81.4L192.7,81.4L192.7,81.4c-2.9,0-5.3-2.4-5.3-5.3l0,0v-5.3h38.9l3.9-10.6h-53.4v10.6v5.3l0,0c0,1.9,0.3,3.6,0.9,5.3c1.6,4.5,5.2,8.1,9.7,9.7c1.7,0.6,3.4,0.9,5.3,0.9h23.4h10.2l3.9-10.6l0,0H192.7z M460.1,38.9v10.6h21.4v42.5h10.6V49.6h17.5l3.8-10.6H460.1z M541.6,68.2c-0.2,0.1-0.4,0.3-0.7,0.4C541.1,68.4,541.4,68.3,541.6,68.2L541.6,68.2z M554.3,60.2h-21.6v0l0,0c-2.9,0-5.3-2.4-5.3-5.3c0-2.9,2.4-5.3,5.3-5.3l0,0l0,0h33.6l3.8-10.6h-37.5l0,0c-6.9,0-12.8,4.4-15,10.6c-0.6,1.7-0.9,3.5-0.9,5.3c0,1.9,0.3,3.7,0.9,5.3c2.2,6.2,8.1,10.6,15,10.6h21.6l0,0c2.9,0,5.3,2.4,5.3,5.3c0,2.9-2.4,5.3-5.3,5.3l0,0h-37.5v10.6h37.5c6.9,0,12.8-4.4,15-10.6c0.6-1.7,0.9-3.5,0.9-5.3c0-1.9-0.3-3.7-0.9-5.3C567.2,64.6,561.3,60.2,554.3,60.2z',
          showAbove: false,
          offsetCenter: [0, '-35%'],
          size: 50,
          keepAspect: true,
          itemStyle: {
            color: '#707177',
          },
        },
        pointer: {
          icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
          width: 12,
          length: '55%',
          offsetCenter: [0, '8%'],
          itemStyle: {
            color: '#C0911F',
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            shadowBlur: 8,
            shadowOffsetX: 2,
            shadowOffsetY: 4,
          },
        },
        detail: {
          show: false,
        },
        title: {
          offsetCenter: [0, '30%'],
        },
        data: [
          {
            value: 0,
          },
        ],
      },
      {
        name: 'minute',
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        min: 0,
        max: 60,
        clockwise: true,
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        pointer: {
          icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
          width: 8,
          length: '70%',
          offsetCenter: [0, '8%'],
          itemStyle: {
            color: '#C0911F',
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            shadowBlur: 8,
            shadowOffsetX: 2,
            shadowOffsetY: 4,
          },
        },
        anchor: {
          show: true,
          size: 20,
          showAbove: false,
          itemStyle: {
            borderWidth: 15,
            borderColor: '#C0911F',
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            shadowBlur: 8,
            shadowOffsetX: 2,
            shadowOffsetY: 4,
          },
        },
        detail: {
          show: false,
        },
        title: {
          offsetCenter: ['0%', '-40%'],
        },
        data: [
          {
            value: 0,
          },
        ],
      },
      {
        name: 'second',
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        min: 0,
        max: 60,
        animationEasingUpdate: 'bounceOut',
        clockwise: true,
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        pointer: {
          icon: 'path://M2.9,0.7L2.9,0.7c1.4,0,2.6,1.2,2.6,2.6v115c0,1.4-1.2,2.6-2.6,2.6l0,0c-1.4,0-2.6-1.2-2.6-2.6V3.3C0.3,1.9,1.4,0.7,2.9,0.7z',
          width: 4,
          length: '85%',
          offsetCenter: [0, '8%'],
          itemStyle: {
            color: '#C0911F',
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            shadowBlur: 8,
            shadowOffsetX: 2,
            shadowOffsetY: 4,
          },
        },
        anchor: {
          show: true,
          size: 15,
          showAbove: true,
          itemStyle: {
            color: '#C0911F',
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            shadowBlur: 8,
            shadowOffsetX: 2,
            shadowOffsetY: 4,
          },
        },
        detail: {
          show: false,
        },
        title: {
          offsetCenter: ['0%', '-40%'],
        },
        data: [
          {
            value: 0,
          },
        ],
      },
    ],
  });
  let intervalId: NodeJS.Timeout;

  const { domRef: gaugeRef } = useEcharts(() => unref(gaugeOptions), {
    onRender(chart) {
      intervalId = setInterval(() => {
        const date = new Date();
        const second = date.getSeconds();
        const minute = date.getMinutes() + second / 60;
        const hour = (date.getHours() % 12) + minute / 60;

        chart.setOption({
          animationDurationUpdate: 300,
          series: [
            {
              name: 'hour',
              animation: hour !== 0,
              data: [{ value: hour }],
            },
            {
              name: 'minute',
              animation: minute !== 0,
              data: [{ value: minute }],
            },
            {
              animation: second !== 0,
              name: 'second',
              data: [{ value: second }],
            },
          ],
        });
      }, 1000);
    },
  });

  function clearClock() {
    clearInterval(intervalId);
  }

  onUnmounted(() => {
    clearClock();
  });
</script>

<template>
  <div>
    <AGrid
      :col-gap="12"
      :cols="{ xs: 1, sm: 1, md: 1, lg: 2, xl: 3, xxl: 3 }"
      :row-gap="16"
      class="grid"
    >
      <AGridItem class="grid-item">
        <ACard :title="t('plugin.charts.echarts.LineChart')" class="shadow-sm">
          <div ref="lineRef" class="h-300px"></div>
        </ACard>
      </AGridItem>
      <AGridItem class="grid-item">
        <ACard :title="t('plugin.charts.echarts.BarChart')" class="shadow-sm">
          <div ref="barRef" class="h-300px"></div>
        </ACard>
      </AGridItem>
      <AGridItem class="grid-item">
        <ACard
          :title="t('plugin.charts.echarts.PieChart')"
          class="rounded-16px shadow-sm"
        >
          <div ref="pieRef" class="h-300px"></div>
        </ACard>
      </AGridItem>
      <AGridItem class="grid-item">
        <ACard
          :title="t('plugin.charts.echarts.ScatterChart')"
          class="shadow-sm"
        >
          <div ref="scatterRef" class="h-300px"></div>
        </ACard>
      </AGridItem>
      <AGridItem class="grid-item">
        <ACard
          :title="t('plugin.charts.echarts.TreemapChart')"
          class="shadow-sm"
        >
          <div ref="treeRef" class="h-300px"></div>
        </ACard>
      </AGridItem>
      <AGridItem class="grid-item">
        <ACard :title="t('plugin.charts.echarts.ClockChart')" class="shadow-sm">
          <div ref="gaugeRef" class="h-300px"></div>
        </ACard>
      </AGridItem>
    </AGrid>
  </div>
</template>

<style lang="less" scoped></style>
