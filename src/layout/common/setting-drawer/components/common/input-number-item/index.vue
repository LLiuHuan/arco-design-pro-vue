<template>
  <AInputNumber
    :disabled="disabled"
    :formatter="formatter"
    :max="max"
    :min="min"
    :parser="parser"
    :precision="precision"
    :read-only="readonly"
    :step="step"
    class="!w-126px"
    mode="button"
    v-bind="getBindValue"
    @change="handleChange"
  >
  </AInputNumber>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { baseHandler, HandlerEnum } from '../helpers';

  interface Props {
    // 调用的修改事件
    event: HandlerEnum;
    // 是否禁用
    disabled?: boolean;
    // 是否绑定值
    def?: number;
    // 数字变化步长
    step?: number;
    // 数字精度
    precision?: number;
    // 数字最小值
    min?: number;
    // 数字最大值
    max?: number;
    // 定义输入框展示值
    formatter?: any;
    // 从 formatter 转换为数字，和 formatter 搭配使用
    parser?: any;
    // 只读
    readonly?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    step: 1,
  });

  const getBindValue = computed(() => {
    return props.def ? { 'model-value': props.def } : {};
  });

  const handleChange = (value: boolean | string | number | undefined) => {
    if (props.event) {
      baseHandler(props.event, value);
    }
  };
</script>

<style lang="less" scoped></style>
