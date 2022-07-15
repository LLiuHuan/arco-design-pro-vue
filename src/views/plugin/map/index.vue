<template>
  <div class="h-full">
    <a-card class="h-full shadow-sm rounded-16px">
      <a-tabs class="h-full">
        <a-tab-pane v-for="item in maps" :key="item.id" :title="item.label">
          <component :is="item.component" />
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import type { Component } from 'vue';
  import { GaodeMap, BaiduMap, TenxunMap, GoogleMap } from './component';

  interface Map {
    id: string;
    label: string;
    component: Component;
  }

  const maps: Map[] = [
    { id: 'gaode', label: '高德地图', component: GaodeMap },
    { id: 'tencent', label: '腾讯地图', component: TenxunMap },
    { id: 'baidu', label: '百度地图', component: BaiduMap },
    { id: 'google', label: 'Google地图', component: GoogleMap },
  ];
</script>

<style lang="less" scoped></style>
