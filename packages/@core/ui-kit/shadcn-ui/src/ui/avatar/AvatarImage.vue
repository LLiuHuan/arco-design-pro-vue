<!--
 * @Description: 图片头像组件
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-05-27 09:51:34
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type { AvatarImageProps } from 'reka-ui';

import { AvatarImage } from 'reka-ui';

const props = defineProps<AvatarImageProps>();
</script>

<template>
  <AvatarImage v-bind="props" class="h-full w-full object-cover" />
</template>
