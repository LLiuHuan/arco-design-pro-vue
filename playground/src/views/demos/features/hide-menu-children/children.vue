<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-08-01 03:43:04
 * @LastEditTime: 2025-08-01 04:02:41
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import { ArcoButton, Fallback } from '@arco/common-ui';
import { useTabs } from '@arco/hooks';
import { X } from '@arco/icons';

const { closeCurrentTab } = useTabs();
</script>

<template>
  <Fallback
    description="当前路由在菜单中不可见"
    status="coming-soon"
    title="被隐藏的子菜单"
    show-back
  >
    <template #action>
      <ArcoButton size="lg" @click="closeCurrentTab()">
        <X class="mr-2 size-4" />
        关闭当前标签页
      </ArcoButton>
    </template>
  </Fallback>
</template>
