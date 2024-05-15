<template>
  <AInput
    class="!w-126px"
    v-bind="getBindValue"
    :disabled="disabled"
    :placeholder="placeholder"
    :max-length="maxLength"
    :readonly="readonly"
    @change="handleChange"
  />
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
    def?: string | number;
    // 只读
    readonly?: boolean;
    // 提示文字
    placeholder?: string;
    // 最大长度
    maxLength?: number;
  }

  const props = withDefaults(defineProps<Props>(), {
    disabled: false,
    readonly: false,
    maxLength: 200,
  });

  const getBindValue = computed(() => {
    return props.def ? { 'default-value': props.def } : {};
  });

  const handleChange = (value: boolean | string | number | undefined) => {
    if (props.event) {
      console.log('handleChange', value, props.event);
      baseHandler(props.event, value);
    }
  };
</script>

<style lang="less" scoped></style>
