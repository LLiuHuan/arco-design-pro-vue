<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2024-05-13 22:31:00
 * @LastEditTime: 2024-08-21 10:53:49
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
  import { computed } from 'vue';
  import { baseHandler, HandlerEnum } from '../helpers';

  interface Props {
    // 调用的修改事件
    event: HandlerEnum;
    // 是否禁用
    disabled?: boolean;
    // 是否绑定值
    def?: boolean;
  }

  const props = defineProps<Props>();

  const getBindValue = computed(() => {
    return props.def ? { 'model-value': props.def } : {};
  });

  const handleChange = (value: boolean | string | number) => {
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
