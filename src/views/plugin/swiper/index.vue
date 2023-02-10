<template>
  <div>
    <a-card title="Swiper插件" class="shadow-sm rounded-16px">
      <a-space direction="vertical" fill>
        <github-link link="https://github.com/nolimits4web/swiper" />
        <web-site-link label="vue3版文档地址：" link="https://swiperjs.com/vue" />
        <web-site-link label="插件demo地址：" link="https://swiperjs.com/demos" />
      </a-space>
      <a-space direction="vertical" fill>
        <div v-for="item in swiperExample" :key="item.id">
          <h3 class="py-24px text-24px font-bold">{{ item.label }}</h3>
          <swiper v-bind="item.options">
            <swiper-slide v-for="i in 5" :key="i">
              <div class="flex-center h-240px border-1px border-[#999] text-18px font-bold w-full">
                Slide{{ i }}
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </a-space>
    </a-card>
  </div>
</template>

<script setup lang="ts">
  import SwiperCore, { Navigation, Pagination } from 'swiper';
  import { Swiper, SwiperSlide } from 'swiper/vue';
  import type { SwiperOptions } from 'swiper';
  import 'swiper/css';

  interface SwiperExample {
    id: number;
    label: string;
    options: Partial<SwiperOptions>;
  }

  SwiperCore.use([Navigation, Pagination]);

  const swiperExample: SwiperExample[] = [
    { id: 0, label: 'Default', options: {} },
    {
      id: 1,
      label: 'Navigation',
      options: {
        navigation: true,
      },
    },
    {
      id: 2,
      label: 'Pagination',
      options: {
        pagination: true,
      },
    },
    {
      id: 3,
      label: 'Pagination dynamic',
      options: {
        pagination: { dynamicBullets: true },
      },
    },
    {
      id: 4,
      label: 'Pagination progress',
      options: {
        navigation: true,
        pagination: {
          type: 'progressbar',
        },
      },
    },
    {
      id: 5,
      label: 'Pagination fraction',
      options: {
        navigation: true,
        pagination: {
          type: 'fraction',
        },
      },
    },
    {
      id: 6,
      label: 'Slides per view',
      options: {
        pagination: {
          clickable: true,
        },
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
    {
      id: 7,
      label: 'Infinite loop',
      options: {
        navigation: true,
        pagination: {
          clickable: true,
        },
        loop: true,
      },
    },
  ];
</script>

<style lang="less" scoped>
  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
