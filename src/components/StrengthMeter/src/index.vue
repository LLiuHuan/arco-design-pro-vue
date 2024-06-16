<template>
  <div class="w-full flex flex-col">
    <AInputPassword
      v-if="showInput"
      v-model:model-value="innerValueRef"
      :disabled="disabled"
      :placeholder="placeholder"
      allow-clear
      autocomplete="off"
      @change="handleChange"
    >
      <template #prefix>
        <icon-lock />
      </template>
    </AInputPassword>
    <AProgress
      :animation="true"
      :percent="getPasswordStrength"
      :show-text="false"
      :status="
        getPasswordStrength <= 0.4
          ? 'danger'
          : getPasswordStrength <= 0.6
            ? 'warning'
            : 'success'
      "
      :steps="5"
      class="mt-5px"
    />
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, unref, watch, watchEffect } from 'vue';
  import { zxcvbn } from '@zxcvbn-ts/core';

  interface Props {
    value: string;
    showInput?: boolean;
    disabled?: boolean;
    placeholder?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    value: '',
    showInput: true,
    disabled: false,
    placeholder: '',
  });
  const emit = defineEmits(['change', 'scoreChange', 'update:value']);

  const innerValueRef = ref('');

  function handleChange(value: string) {
    emit('change', value);
  }

  const getPasswordStrength = computed(() => {
    if (props.disabled) return -1;
    const innerValue = unref(innerValueRef);
    const score = innerValue ? zxcvbn(unref(innerValueRef)).score : -1;
    emit('scoreChange', score);
    // 计算密码强度百分比
    return score === -1 ? 0 : ((score + 1) * 20) / 100;
  });

  watchEffect(() => {
    innerValueRef.value = props.value || '';
  });

  watch(
    () => unref(innerValueRef),
    (val) => {
      emit('update:value', val);
      emit('change', val);
    },
  );
</script>

<style lang="less" scoped></style>
