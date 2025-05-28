<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-27 12:13:55
 * @LastEditTime: 2025-05-27 12:19:55
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import { ArcoSpinner } from '@arco-core/shadcn-ui';

import { useContentSpinner } from './use-content-spinner';

defineOptions({ name: 'LayoutContentSpinner' });

const { spinning } = useContentSpinner();
</script>
<template>
  <ArcoSpinner :spinning="spinning" />
</template>
