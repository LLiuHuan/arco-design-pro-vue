<!--
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 11:47:53
 * @LastEditTime: 2025-05-27 11:55:47
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type { AnalysisChartOverviewItem } from '../typing';

import {
  ArcoCountToAnimator,
  Card,
  CardContent,
  CardFooter,
  CardTitle,
} from '@arco-core/shadcn-ui';

interface Props {
  items?: AnalysisChartOverviewItem[];
}

defineOptions({
  name: 'AnalysisChartOverview',
});

withDefaults(defineProps<Props>(), {
  items: () => [],
});
</script>

<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
    <template v-for="item in items" :key="item.title">
      <Card :title="item.title" class="w-full" :style="item.style">
        <CardContent
          :value="item.name"
          class="flex items-center justify-between"
        >
          <div class="flex flex-col">
            <CardTitle class="py-4">{{ item.title }}</CardTitle>

            <ArcoCountToAnimator
              :end-val="item.value"
              :start-val="1"
              class="text-xl"
              prefix=""
            />
          </div>
          <slot :name="item.name"></slot>
        </CardContent>

        <CardFooter class="justify-between">
          <span>{{ item.totalTitle }}</span>
          <ArcoCountToAnimator
            :end-val="item.totalValue"
            :start-val="1"
            prefix=""
            direction="up"
          />
        </CardFooter>
      </Card>
    </template>
  </div>
</template>
