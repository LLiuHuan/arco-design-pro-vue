<!--
 * @Description: 菜单组件
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-05-27 09:59:25
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type { ContextMenuRootEmits, ContextMenuRootProps } from 'reka-ui';

import { ContextMenuRoot, useForwardPropsEmits } from 'reka-ui';

const props = withDefaults(defineProps<ContextMenuRootProps>(), {
  modal: false,
});
const emits = defineEmits<ContextMenuRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ContextMenuRoot v-bind="forwarded">
    <slot></slot>
  </ContextMenuRoot>
</template>
