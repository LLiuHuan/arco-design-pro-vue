<template>
  <div class="flex">
    <div class="one"></div>
    <div class="two"></div>
    <div class="three"></div>
    <div class="four"></div>
  </div>
</template>

<script lang="ts" setup></script>

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
