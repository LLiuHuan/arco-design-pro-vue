<template>
  <div>
    <a-card title="引导页">
      <a-button type="primary" @click="handleStart">开始</a-button>
    </a-card>
  </div>
</template>
<script lang="ts" setup>
  import intro from 'intro.js';
  import 'intro.js/minified/introjs.min.css';

  const handleStart = () => {
    intro()
      .setOptions({
        steps: [
          {
            title: '欢迎页',
            intro: 'Hello World! 👋',
          },
          {
            title: '菜单折叠按钮',
            element: document.querySelector(`.collapse`)!,
            intro: '这是一个菜单折叠按钮',
          },
          {
            title: '功能区',
            element: document.querySelector(`.ribbon`)!,
            intro: '这是一堆功能按钮',
          },
        ],
      })
      .start();
  };
</script>
