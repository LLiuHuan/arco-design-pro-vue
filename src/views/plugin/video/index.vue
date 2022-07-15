<template>
  <div class="h-full">
    <a-card title="西瓜视频" class="h-full shadow-sm rounded-16px">
      <div ref="domRef"></div>
      <template #actions>
        <web-site-link
          label="西瓜视频官网："
          link="https://v2.h5player.bytedance.com/"
          class="mt-10px"
        />
      </template>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, onUnmounted, ref } from 'vue';
  import Player from 'xgplayer';

  const domRef = ref<HTMLElement>();
  const player = ref<Player>();

  function renderXgPlayer() {
    if (!domRef.value) return;
    const url =
      'https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4';
    player.value = new Player({
      el: domRef.value,
      url,
      playbackRate: [0.5, 0.75, 1, 1.5, 2],
      poster: 'https://i.ytimg.com/vi/lK2ZbbQSHww/hqdefault.jpg',
      download: true, // 设置download控件显示
      danmu: {
        comments: [
          // 弹幕数组
          {
            duration: 15000, // 弹幕持续显示时间,毫秒(最低为5000毫秒)
            id: '1', // 弹幕id，需唯一
            start: 3000, // 弹幕出现时间，毫秒
            prior: true, // 该条弹幕优先显示，默认false
            color: true, // 该条弹幕为彩色弹幕，默认false
            txt: '长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕长弹幕', // 弹幕文字内容
            style: {
              // 弹幕自定义样式
              color: '#ff9500',
              fontSize: '20px',
              border: 'solid 1px #ff9500',
              borderRadius: '50px',
              padding: '5px 11px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
            mode: 'top', // 显示模式，top顶部居中，bottom底部居中，scroll滚动，默认为scroll
            // el: DOM //直接传入一个自定义的DOM元素作为弹幕，使用该项的话会忽略所提供的txt
            // eventListeners: [{ //支持自定义DOM设置DOM监听事件
            //   event: 'click',
            //   listener: function (e) {
            //     console.log('click')
            //   },
            //   useCapture: false,
            // }]
          },
        ],
        area: {
          // 弹幕显示区域
          start: 0, // 区域顶部到播放器顶部所占播放器高度的比例
          end: 1, // 区域底部到播放器顶部所占播放器高度的比例
        },
        // closeDefaultBtn: true, // 开启此项后不使用默认提供的弹幕开关，默认使用西瓜播放器提供的开关
        // defaultOff: true, // 开启此项后弹幕不会初始化，默认初始化弹幕
      },
      progressDot: [
        {
          time: 10, // 展示标记的时间
          text: '标记文字', // 鼠标hover在标记时展示的文字
          duration: 8, // 标记段长度（以时长计算）
          style: {
            // 标记样式
            background: 'blue',
          },
        },
        {
          time: 22,
          text: '标记文字',
        },
        {
          time: 56,
          duration: 8,
        },
        {
          time: 76,
        },
      ],
    });
  }
  function destroyXgPlayer() {
    player.value?.destroy();
  }

  onMounted(() => {
    renderXgPlayer();
  });

  onUnmounted(() => {
    destroyXgPlayer();
  });
</script>

<style lang="less" scoped></style>
