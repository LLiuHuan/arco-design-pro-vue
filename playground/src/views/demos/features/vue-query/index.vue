<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-08-01 03:43:04
 * @LastEditTime: 2025-08-01 04:42:40
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import { Page } from '@arco/common-ui';

import { Button, Card, Empty } from '@arco-design/web-vue';
import { refAutoReset } from '@vueuse/core';

import ConcurrencyCaching from './concurrency-caching.vue';
import InfiniteQueries from './infinite-queries.vue';
import PaginatedQueries from './paginated-queries.vue';
import QueryRetries from './query-retries.vue';

const showCaching = refAutoReset(true, 1000);
</script>

<template>
  <Page title="Vue Query示例">
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <Card title="分页查询">
        <PaginatedQueries />
      </Card>
      <Card title="无限滚动">
        <InfiniteQueries class="h-[300px] overflow-auto" />
      </Card>
      <Card title="错误重试">
        <QueryRetries />
      </Card>
      <Card
        title="并发和缓存"
        v-spinning="!showCaching"
        :body-style="{ minHeight: '330px' }"
      >
        <template #extra>
          <Button @click="showCaching = false">重新加载</Button>
        </template>
        <ConcurrencyCaching v-if="showCaching" />
        <Empty v-else description="正在加载..." />
      </Card>
    </div>
  </Page>
</template>
