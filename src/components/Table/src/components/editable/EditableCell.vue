<template>
  <div>
    <div
      v-if="!isEdit"
      class="flex-center"
      @mouseleave="showEdit = false"
      @mouseover="showEdit = true"
    >
      <span class="flex-auto">{{ tmpValue }}</span>
      <div
        class="cursor-pointer w-14px hover:text-[rgba(var(--primary-6))]"
        @click="isEdit = true"
      >
        <SvgIcon v-if="showEdit" icon="uil:edit" size="14" />
      </div>
    </div>

    <div v-else class="flex justify-between items-center">
      <AInput
        v-if="type === 'input'"
        v-model="tmpValue"
        :placeholder="placeholder"
        class="text-center"
        @keydown.enter="saveValue"
      />
      <AInputNumber
        v-else-if="type === 'inputNumber'"
        v-model="tmpValue"
        :placeholder="placeholder"
        v-bind="numberProps"
        @keydown.enter="saveValue"
      />
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

<script lang="ts" setup>
  import { SvgIcon } from '@/components/Icon';
  import { ref, unref } from 'vue';

  interface NumberProps {
    mode?: 'embed' | 'button';
    step?: number;
    min?: number;
    max?: number;
    formatter?: (value: number) => string;
    parser?: (value: string) => number;
    readOnly?: boolean;
  }

  interface Props {
    value?: string | number | boolean;
    type?: 'input' | 'inputNumber' | 'select' | 'switch';

    numberProps?: NumberProps;
    placeholder?: string;
  }

  const props = withDefaults(defineProps<Props>(), {
    type: 'input',
  });
  const emit = defineEmits(['update:value', 'change']);
  const isEdit = ref(false);
  const showEdit = ref(false);

  const tmpValue = ref(props.value);

  const saveValue = () => {
    isEdit.value = false;
    emit('update:value', unref(tmpValue));
    emit('change');
  };

  const closeValue = () => {
    isEdit.value = false;
  };
</script>

<style lang="less" scoped>
  :deep(.arco-input) {
    text-align: center;
  }
</style>
