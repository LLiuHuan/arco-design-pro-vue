<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-27 10:47:21
 * @LastEditTime: 2025-05-27 10:52:19
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import type { DropdownMenuProps } from '@arco-core/shadcn-ui';

import { ChevronDown } from '@arco-core/icons';
import { ArcoDropdownMenu } from '@arco-core/shadcn-ui';

defineProps<DropdownMenuProps>();
</script>

<template>
  <ArcoDropdownMenu :menus="menus" :modal="false">
    <div
      class="flex-center hover:bg-muted hover:text-foreground text-muted-foreground border-border h-full cursor-pointer border-l px-2 text-lg font-semibold"
    >
      <ChevronDown class="size-4" />
    </div>
  </ArcoDropdownMenu>
</template>
