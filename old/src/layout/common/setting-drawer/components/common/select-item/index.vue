<script lang="ts" setup>
  import { computed } from 'vue';

  import { SelectOptionData, SelectOptionGroup } from '@arco-design/web-vue';

  import { baseHandler, HandlerEnum } from '../helpers';

  interface Props {
    // 是否绑定值
    def?:
      | (boolean | number | Record<string, any> | string)[]
      | boolean
      | number
      | Record<string, any>
      | string;
    // 是否禁用
    disabled?: boolean;
    // 调用的修改事件
    event: HandlerEnum;
    // 初始值
    initValue?:
      | (boolean | number | Record<string, any> | string)[]
      | boolean
      | number
      | Record<string, any>
      | string;
    // 选项值
    options: (
      | boolean
      | number
      | SelectOptionData
      | SelectOptionGroup
      | string
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
      | (boolean | number | Record<string, any> | string)[]
      | boolean
      | number
      | Record<string, any>
      | string,
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
