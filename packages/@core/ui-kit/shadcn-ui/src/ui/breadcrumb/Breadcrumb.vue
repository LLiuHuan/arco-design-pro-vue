<!--
 * @Description: 面包屑组件
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-05-27 09:53:44
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
const props = defineProps<{
  class?: any;
}>();
</script>

<template>
  <nav :class="props.class" aria-label="breadcrumb" role="navigation">
    <slot></slot>
  </nav>
</template>
