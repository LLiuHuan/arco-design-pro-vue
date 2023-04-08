<template>
  <div class="h-full w-full flex flex-col justify-center items-center bg-[#f4f5f6]">
    <div class="content">
      <div class="content-logo">
        <img src="~@/assets/logo.png" alt="logo" />
        <span>{{ appInfo.title }}</span>
      </div>
      <div class="content-box">
        <div class="content-text">您将要访问的链接不属于本站点，请关注您的账号安全。</div>
        <div class="content-link">
          <div class="external-link-href">{{ urlValue }}</div>
        </div>

        <div class="text-right">
          <a-button class="mt-20px text-right" type="primary" @click="jumpUrl"> 继续前往 </a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRoute } from 'vue-router';
  import { computed } from 'vue';
  import { useAppInfo } from '@/composables';

  const route = useRoute();
  const appInfo = useAppInfo();
  const urlValue = computed(() => route.query.target as string);

  const jumpUrl = () => {
    window.open(urlValue.value, '_self');
  };
</script>

<style lang="less" scoped>
  .content {
    font-family: 'PingFang SC', serif;
    font-size: 18px;
  }
  .content-logo {
    margin-bottom: 20px;
    text-align: left;
    display: flex;
    align-items: center;
    img {
      width: 50px;
      padding-left: 5px;
    }
    span {
      padding-left: 14px;
      font-size: 20px;
      font-weight: 900;
    }
  }
  .content-box {
    width: 600px;
    font-size: 16px;
    line-height: 30px;
    background: #ffffff;
    padding: 30px 30px 20px;
    border: 1px solid #f1f2f3;
  }

  .content-text {
    font-weight: 500;
  }

  .content-link {
    margin-top: 10px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e5e6eb;
    .external-link-href {
      color: gray;
      word-break: break-all;
    }
  }
</style>
