<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-08-01 02:15:03
 * @LastEditTime: 2025-08-01 02:15:20
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import { useRouter } from 'vue-router';

import { Fallback } from '@arco/common-ui';

import { Button } from '@arco-design/web-vue';

const router = useRouter();

function details() {
  router.push({ name: 'BreadcrumbLateralDetailDemo' });
}
</script>

<template>
  <Fallback
    description="点击查看详情，并观察面包屑导航变化"
    status="coming-soon"
    title="面包屑导航-平级模式"
  >
    <template #action>
      <Button type="primary" @click="details">点击查看详情</Button>
    </template>
  </Fallback>
</template>
