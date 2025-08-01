<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-08-01 03:43:04
 * @LastEditTime: 2025-08-01 09:18:07
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import { ref } from 'vue';

import { Button } from '@arco-design/web-vue';
import { useQuery } from '@tanstack/vue-query';

const retryCount = ref(-1);
async function fetchApi() {
  retryCount.value += 1;
  return new Promise((_resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Simulated API failure'));
    }, 1000);
  });
}

const { error, isFetching, refetch } = useQuery({
  enabled: false, // Disable automatic refetching when the query mounts
  queryFn: fetchApi,
  queryKey: ['queryKey'],
  retry: 3, // Will retry failed requests 3 times before displaying an error
});

const onClick = async () => {
  retryCount.value = -1;
  await refetch();
};
</script>

<template>
  <Button :loading="isFetching" @click="onClick"> 发起错误重试 </Button>
  <p v-if="retryCount > 0" class="my-3">重试次数{{ retryCount }}</p>
  <p>{{ error }}</p>
</template>
