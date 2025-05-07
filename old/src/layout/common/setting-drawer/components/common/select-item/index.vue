<script lang="ts" setup>
  import { computed } from 'vue';
  import { SelectOptionData, SelectOptionGroup } from '@arco-design/web-vue';
  import { baseHandler, HandlerEnum } from '../helpers';

  interface Props {
    // 调用的修改事件
    event: HandlerEnum;
    // 是否禁用
    disabled?: boolean;
    // 是否绑定值
    def?:
      | string
      | number
      | boolean
      | Record<string, any>
      | (string | number | boolean | Record<string, any>)[];
    // 初始值
    initValue?:
      | string
      | number
      | boolean
      | Record<string, any>
      | (string | number | boolean | Record<string, any>)[];
    // 选项值
    options: (
      | string
      | number
      | boolean
      | SelectOptionData
      | SelectOptionGroup
    )[];
  }

  const props = defineProps<Props>();

  const getBindValue = computed(() => {
    return props.def
      ? { modelValue: props.def, defaultValue: props.initValue || props.def }
      : {};
  });

  function handleChange(
    value:
      | string
      | number
      | boolean
      | Record<string, any>
      | (string | number | boolean | Record<string, any>)[],
  ) {
    if (props.event) baseHandler(props.event, value);
  }
</script>

<template>
  <ASelect
    :disabled="disabled"
    :options="options"
    class="!w-126px"
    v-bind="getBindValue"
    @change="handleChange"
  />
</template>

<style lang="less" scoped></style>
