const line1Option = {
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
};

const line2Option = {
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
};

const barOption = {
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
  series: {
    name: 'total',
    data: [
      {
        value: 22,
        itemStyle: {
          color: '#2CAB40',
        },
      },
      {
        value: 88,
        itemStyle: {
          color: '#86DF6C',
        },
      },
      {
        value: 30,
        itemStyle: {
          color: '#2CAB40',
        },
      },
      {
        value: 24,
        itemStyle: {
          color: '#86DF6C',
        },
      },
      {
        value: 39,
        itemStyle: {
          color: '#2CAB40',
        },
      },
      {
        value: 24,
        itemStyle: {
          color: '#86DF6C',
        },
      },
      {
        value: 64,
        itemStyle: {
          color: '#2CAB40',
        },
      },
      {
        value: 93,
        itemStyle: {
          color: '#86DF6C',
        },
      },
    ],
    type: 'bar',
    barWidth: 7,
    itemStyle: {
      borderRadius: 2,
    },
  },
};

const pieOption = {
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
    textStyle: {
      color: '#4E5969',
    },
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
};

export { line1Option, line2Option, barOption, pieOption };
