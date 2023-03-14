<template>
  <div class="fixed-center flex-col grid-cols-1 grid-rows-3 gap-y-30px">
    <!--    <system-logo class="text-128px text-primary !h-100px !w-100px" />-->
    <div class="flex">
      <div class="one"></div>
      <div class="two"></div>
      <div class="three"></div>
      <div class="four"></div>
    </div>
    <h2 class="text-28px font-500 text-#646464">{{ title }}</h2>
  </div>
</template>

<script setup lang="ts">
  import { useAppInfo } from '@/composables';

  const { title } = useAppInfo();

  function addThemeColorCssVars() {
    const defaultColor = '#1890ff';
    const themeColor = defaultColor;
    const cssVars = `--primary-color: ${themeColor}`;
    document.documentElement.style.cssText = cssVars;
  }

  addThemeColorCssVars();
</script>

<style lang="less" scoped>
  .one,
  .two,
  .three,
  .four {
    width: 15px;
    height: 58px;
    background: black;
    margin: 7px;
    flex-wrap: wrap;
    transition: all 1s ease;
    border-radius: 30px;
  }
  .one {
    animation: growshrink 1s infinite;
    background: #4285f4;
  }

  .two {
    animation: growshrink 1s infinite;
    animation-delay: 0.1s;
    background: #db4437;
  }

  .three {
    animation: growshrink 1s infinite;
    animation-delay: 0.2s;
    background: #f4b400;
  }

  .four {
    animation: growshrink 1s infinite;
    animation-delay: 0.3s;
    background: #0f9d58;
  }

  @keyframes growshrink {
    1% {
      transform: scale(1);
    }
    50% {
      transform: scale(0.5);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
