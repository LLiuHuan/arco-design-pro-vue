<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-27 11:47:53
 * @LastEditTime: 2025-05-27 11:56:18
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type { WorkbenchQuickNavItem } from '../typing';

import {
  ArcoIcon,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@arco-core/shadcn-ui';

interface Props {
  items?: WorkbenchQuickNavItem[];
  title: string;
}

defineOptions({
  name: 'WorkbenchQuickNav',
});

withDefaults(defineProps<Props>(), {
  items: () => [],
});

defineEmits(['click']);
</script>

<template>
  <Card>
    <CardHeader class="py-4">
      <CardTitle class="text-lg">{{ title }}</CardTitle>
    </CardHeader>
    <CardContent class="flex flex-wrap p-0">
      <template v-for="(item, index) in items" :key="item.title">
        <div
          :class="{
            'border-r-0': index % 3 === 2,
            'border-b-0': index < 3,
            'pb-4': index > 2,
            'rounded-bl-xl': index === items.length - 3,
            'rounded-br-xl': index === items.length - 1,
          }"
          class="flex-col-center border-border group w-1/3 cursor-pointer border-t border-r py-8 hover:shadow-xl"
          @click="$emit('click', item)"
        >
          <ArcoIcon
            :color="item.color"
            :icon="item.icon"
            class="size-7 transition-all duration-300 group-hover:scale-125"
          />
          <span class="text-md mt-2 truncate">{{ item.title }}</span>
        </div>
      </template>
    </CardContent>
  </Card>
</template>
