<template>
  <div class="banner">
    <div class="banner-inner">
      <a-carousel class="carousel" animation-name="fade">
        <a-carousel-item v-for="item in carouselItem" :key="item.slogan">
          <div :key="item.slogan" class="carousel-item">
            <div class="carousel-title">{{ item.slogan }}</div>
            <div class="carousel-sub-title">{{ item.subSlogan }}</div>
            <img class="carousel-image" :src="item.image" alt="" />
          </div>
        </a-carousel-item>
      </a-carousel>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import bannerImage from '@/assets/images/login-banner.png';
  import { useI18n } from '@/hooks';

  const { t } = useI18n();
  const carouselItem = computed(() => [
    {
      slogan: t('sys.login.banner.slogan1'),
      subSlogan: t('sys.login.banner.subSlogan1'),
      image: bannerImage,
    },
    {
      slogan: t('sys.login.banner.slogan2'),
      subSlogan: t('sys.login.banner.subSlogan2'),
      image: bannerImage,
    },
    {
      slogan: t('sys.login.banner.slogan3'),
      subSlogan: t('sys.login.banner.subSlogan3'),
      image: bannerImage,
    },
  ]);
</script>

<style lang="less" scoped>
  .banner {
    display: flex;
    align-items: center;
    justify-content: center;

    &-inner {
      flex: 1;
      height: 100%;
    }
  }

  .carousel {
    height: 100%;

    &-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    &-title {
      color: var(--color-fill-1);
      font-weight: 500;
      font-size: 20px;
      line-height: 28px;
    }

    &-sub-title {
      margin-top: 8px;
      color: var(--color-text-3);
      font-size: 14px;
      line-height: 22px;
    }

    &-image {
      width: 320px;
      margin-top: 30px;
    }
  }
</style>
