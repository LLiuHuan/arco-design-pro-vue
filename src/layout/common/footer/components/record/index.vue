<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2024-08-21 17:37:30
 * @LastEditTime: 2024-08-21 17:44:21
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
  interface Props {
    name?: string;
    href?: string;
    logo?: string;
  }

  defineProps<Props>();
</script>

<template>
  <div v-if="name" class="flex">
    <img v-if="logo" :src="logo" alt="logo" class="w-16px h-16px mr-1" />
    <a v-if="href" :href="href" target="_blank" rel="noopener noreferrer">
      {{ name }}
    </a>
    <div v-else>
      {{ name }}
    </div>
  </div>
</template>

<style lang="less" scoped></style>
