<template>
  <a-popover position="br" trigger="click">
    <a-input v-model:model-value="modelValue" readonly placeholder="点击选择图标">
      <template #suffix>
        <Icon :icon="modelValue ? modelValue : emptyIcon" class="!text-30px p-5px" />
      </template>
    </a-input>
    <template #title>
      <a-input v-model:model-value="searchValue" placeholder="搜索图标" />
    </template>
    <template #content>
      <div v-if="iconsList.length > 0" class="grid grid-cols-9 h-auto overflow-auto">
        <template v-for="iconItem in iconsList" :key="iconItem">
          <Icon
            :icon="iconItem"
            class="border-1px border-[#d9d9d9] !text-30px m-2px p-5px"
            :style="{ 'border-color': modelValue === iconItem ? theme.themeColor : '' }"
            @click="handleChange(iconItem)"
          />
        </template>
      </div>
    </template>
  </a-popover>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { Icon } from '@iconify/vue';
  import { useThemeStore } from '@/store';

  interface Props {
    /** 选中的图标 */
    value: string;
    /** 图标列表 */
    icons: string[];
    /** 未选中图标 */
    emptyIcon?: string;
  }

  interface Emits {
    (e: 'update:value', val: string): void;
  }

  const props = withDefaults(defineProps<Props>(), {
    emptyIcon: 'mdi:apps',
  });

  const emit = defineEmits<Emits>();
  const theme = useThemeStore();

  const searchValue = ref('');
  const iconsList = computed(() => props.icons.filter((v) => v.includes(searchValue.value)));

  const modelValue = computed({
    get() {
      return props.value;
    },
    set(val: string) {
      emit('update:value', val);
    },
  });

  function handleChange(iconItem: string) {
    modelValue.value = iconItem;
  }
</script>

<style lang="less" scoped></style>
