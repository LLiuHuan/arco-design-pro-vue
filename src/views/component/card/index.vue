<template>
  <div>
    <a-card title="卡片">
      <a-grid :cols="{ sm: 1, md: 1 }" :row-gap="16" :col-gap="16">
        <a-grid-item>
          <a-card title="基础卡片">
            <template #extra>
              <a-link>More</a-link>
            </template>
            卡片内容 <br />
            卡片内容
          </a-card>
        </a-grid-item>
        <a-grid-item>
          <a-card title="鼠标悬浮卡片" hoverable>
            <template #extra>
              <a-link>More</a-link>
            </template>
            卡片内容 <br />
            卡片内容
          </a-card>
        </a-grid-item>
        <a-grid-item>
          <a-card class="card-demo" title="鼠标悬浮卡片自定义CSS" hoverable>
            <template #extra>
              <a-link>More</a-link>
            </template>
            卡片内容 <br />
            卡片内容
          </a-card>
        </a-grid-item>
        <a-grid-item>
          <a-card title="无边框卡片" :bordered="false">
            <template #extra>
              <a-link>More</a-link>
            </template>
            卡片内容 <br />
            卡片内容
          </a-card>
        </a-grid-item>
        <a-grid-item>
          <a-card hoverable :style="{ width: '360px', marginBottom: '20px' }">
            <div
              :style="{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }"
            >
              <span :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }">
                <a-avatar :style="{ marginRight: '8px', backgroundColor: '#165DFF' }" :size="28">
                  A
                </a-avatar>
                <a-typography-text>Username</a-typography-text>
              </span>
              <a-link>More</a-link>
            </div>
          </a-card>
        </a-grid-item>
        <a-grid-item>
          <a-card hoverable :style="{ width: '360px' }">
            <template #cover>
              <div
                :style="{
                  height: '204px',
                  overflow: 'hidden',
                }"
              >
                <img
                  :style="{ width: '100%', transform: 'translateY(-20px)' }"
                  alt="dessert"
                  src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp"
                />
              </div>
            </template>
            <a-card-meta title="Card Title">
              <template #description>
                Card content <br />
                Card content
              </template>
            </a-card-meta>
          </a-card>
        </a-grid-item>
        <a-grid-item>
          <a-card :style="{ width: '360px' }">
            <template #actions>
              <span class="icon-hover"> <IconThumbUp /> </span>
              <span class="icon-hover"> <IconShareInternal /> </span>
              <span class="icon-hover"> <IconMore /> </span>
            </template>
            <template #cover>
              <div
                :style="{
                  height: '204px',
                  overflow: 'hidden',
                }"
              >
                <img
                  :style="{ width: '100%', transform: 'translateY(-20px)' }"
                  alt="dessert"
                  src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp"
                />
              </div>
            </template>
            <a-card-meta title="Card Title" description="This is the description">
              <template #avatar>
                <div :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }">
                  <a-avatar :size="24" :style="{ marginRight: '8px' }"> A </a-avatar>
                  <a-typography-text>Username</a-typography-text>
                </div>
              </template>
            </a-card-meta>
          </a-card>
        </a-grid-item>
      </a-grid>
    </a-card>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
  .card-demo {
    transition-property: all;
  }
  .card-demo:hover {
    transform: translateY(-4px);
  }
</style>
