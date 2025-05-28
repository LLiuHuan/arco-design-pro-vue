<!--
 * @Description: dialog 遮罩层
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-05-27 09:50:24
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import { useScrollLock } from '@arco-core/composables';

useScrollLock();
</script>
<template>
  <div class="bg-overlay z-popup inset-0"></div>
</template>
