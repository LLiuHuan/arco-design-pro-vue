<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2024-05-13 22:31:00
 * @LastEditTime: 2025-06-04 02:19:14
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
  import { computed } from 'vue';

  import { baseHandler, HandlerEnum } from '../helpers';

  interface Props {
    // 是否绑定值
    def?: boolean;
    // 是否禁用
    disabled?: boolean;
    // 调用的修改事件
    event: HandlerEnum;
  }

  const props = defineProps<Props>();

  const getBindValue = computed(() => {
    return props.def ? { 'model-value': props.def } : {};
  });

  const handleChange = (value: boolean | number | string) => {
    console.log(props.event, value);
    if (props.event) {
      baseHandler(props.event, value);
    }
  };
</script>

<template>
  <ASwitch :disabled="disabled" v-bind="getBindValue" @change="handleChange">
    <template #checked-icon>
      <icon-check />
    </template>
    <template #unchecked-icon>
      <icon-close />
    </template>
  </ASwitch>
</template>

<style lang="less" scoped></style>
