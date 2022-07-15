<template>
  <GoogleMap
    ref="domRef"
    class="w-full h-400px"
    :api-key="GOOGLE_KEY"
    style="width: 100%; height: 500px"
    :center="center"
    :zoom="15"
  >
    <Marker :options="{ position: center }" />
  </GoogleMap>
</template>

<script setup lang="ts">
  import { GoogleMap, Marker } from 'vue3-google-map';
  import { GOOGLE_KEY } from '@/config';

  const center = { lat: 40.689247, lng: -74.044502 };
</script>

<style lang="less" scoped></style>
