<!--
 * @Description: 组件文档按钮
 * @Author: LLiuHuan
 * @Date: 2025-07-24 01:58:17
 * @LastEditTime: 2025-07-24 01:58:59
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import { ARCO_DOC_URL } from '@arco/constants';
import { openWindow } from '@arco/utils';

import { Button } from '@arco-design/web-vue';

const props = defineProps<{ path: string }>();

function handleClick() {
  // 如果没有.html，打开页面时可能会出现404
  const path =
    ARCO_DOC_URL +
    (props.path.toLowerCase().endsWith('.html')
      ? props.path
      : `${props.path}.html`);
  openWindow(path);
}
</script>

<template>
  <Button @click="handleClick">查看组件文档</Button>
</template>
