<script lang="ts" setup>
  import { computed, ref, unref } from 'vue';

  import { SvgIcon } from '@/components/Icon';
  import { isNumber, isString } from '@/utils/common';
  import { SelectOptionData, SelectProps } from '@arco-design/web-vue';
  import { cloneDeep, omit } from 'lodash-es';

  interface NumberProps {
    formatter?: (value: number) => string;
    max?: number;
    min?: number;
    mode?: 'button' | 'embed';
    parser?: (value: string) => number;
    readOnly?: boolean;
    step?: number;
  }

  interface SwitchProps {
    beforeChange?: (
      newValue: boolean | number | string,
    ) => boolean | Promise<boolean | void> | void;
    checkedColor?: string;
    checkedText?: string;
    checkedValue?: boolean | number | string;
    disabled?: boolean;
    loading?: boolean;
    size?: 'medium' | 'small';
    type?: 'circle' | 'line' | 'round';
    unCheckedColor?: string;
    unCheckedText?: string;
    unCheckedValue?: boolean | number | string;
  }

  interface Props {
    numberProps?: NumberProps;
    placeholder?: string;

    selectProps?: SelectProps;
    switchProps?: SwitchProps;
    type?: 'input' | 'inputNumber' | 'select' | 'switch';
    value?: boolean | number | string;
  }

  const props = withDefaults(defineProps<Props>(), {
    type: 'input',
  });
  const emit = defineEmits(['update:value', 'change']);
  const isEdit = ref(false);
  const showEdit = ref(false);

  const tmpValue = ref<any>(props.value);

  const getSelectProps = computed(() => {
    return { ...omit(props.selectProps, ['modelValue']) };
  });

  const getSelectLabel = computed(() => {
    const options = cloneDeep(props.selectProps?.options);
    if (!options) return '';
    for (let i = 0; i < options?.length; i += 1) {
      if (isString(options[i]) || isNumber(options[i])) {
        if (options[i] === unref(tmpValue)) {
          return options[i];
        }
      } else if ((options[i] as SelectOptionData).value === unref(tmpValue)) {
        return (options[i] as SelectOptionData).label;
      }
    }
    return '';
  });

  const saveValue = () => {
    isEdit.value = false;
    emit('update:value', unref(tmpValue));
    emit('change');
  };

  const closeValue = () => {
    isEdit.value = false;
  };
</script>

<template>
  <div>
    <div
      v-if="!isEdit"
      class="flex-center"
      @mouseleave="showEdit = false"
      @mouseover="showEdit = true"
    >
      <slot>
        <span
          v-if="['input', 'inputNumber'].indexOf(type) >= 0"
          class="flex-auto"
        >
          {{ tmpValue }}
        </span>
        <div v-else-if="type === 'switch'" class="flex-auto">
          <ASwitch v-model="tmpValue" disabled />
        </div>
        <span v-else-if="type === 'select'" class="flex-auto">
          {{ getSelectLabel }}
        </span>
      </slot>
      <div
        class="cursor-pointer w-14px hover:text-[rgba(var(--primary-6))]"
        @click="isEdit = true"
      >
        <SvgIcon v-if="showEdit" icon="uil:edit" size="14" />
      </div>
    </div>

    <div v-else class="flex justify-between items-center">
      <div v-if="type === 'input'">
        <slot name="input">
          <AInput
            v-model="tmpValue"
            :placeholder="placeholder"
            class="text-center"
            @keydown.enter="saveValue"
          />
        </slot>
      </div>

      <div v-else-if="type === 'inputNumber'">
        <slot name="inputNumber">
          <AInputNumber
            v-model="tmpValue"
            :placeholder="placeholder"
            class="text-center"
            v-bind="numberProps"
            @keydown.enter="saveValue"
          />
        </slot>
      </div>
      <div v-else-if="type === 'switch'" class="flex-auto">
        <slot name="switch">
          <ASwitch v-model="tmpValue" v-bind="switchProps" />
        </slot>
      </div>
      <div v-else-if="type === 'select'" class="flex-auto">
        <slot name="select">
          <ASelect v-model="tmpValue" v-bind="getSelectProps" />
        </slot>
      </div>
      <ASpace class="pl-5px">
        <div
          class="cursor-pointer hover:text-[rgba(var(--primary-6))]"
          @click="saveValue"
        >
          <SvgIcon icon="mingcute:check-fill" size="14" />
        </div>
        <div
          class="cursor-pointer hover:text-[rgba(var(--primary-6))]"
          @click="closeValue"
        >
          <SvgIcon icon="mingcute:close-fill" size="14" />
        </div>
      </ASpace>
    </div>
  </div>
</template>

<style lang="less" scoped>
  :deep(.arco-input) {
    text-align: center;
  }
</style>
