<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-07-22 14:39:21
 * @LastEditTime: 2025-07-22 15:00:34
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
// import { Input, Select } from '@arco-design/web-vue';

const emit = defineEmits(['blur', 'change']);

const modelValue = defineModel<[string, string]>({
  default: () => [undefined, undefined],
});

function onChange() {
  emit('change', modelValue.value);
}
</script>
<template>
  <div class="flex w-full gap-1">
    <ASelect
      v-model="modelValue[0]"
      class="!w-[80px]"
      placeholder="类型"
      allow-clear
      :class="{ 'valid-success': !!modelValue[0] }"
      :options="[
        { label: '个人', value: 'personal' },
        { label: '工作', value: 'work' },
        { label: '私密', value: 'private' },
      ]"
      @blur="emit('blur')"
      @change="onChange"
    />
    <AInput
      placeholder="请输入11位手机号码"
      class="flex-1"
      allow-clear
      :class="{ 'valid-success': modelValue[1]?.match(/^1[3-9]\d{9}$/) }"
      v-model="modelValue[1]"
      :maxlength="11"
      type="tel"
      @blur="emit('blur')"
      @change="onChange"
    />
  </div>
</template>
