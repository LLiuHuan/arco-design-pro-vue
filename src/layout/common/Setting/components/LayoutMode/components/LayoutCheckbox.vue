<template>
  <div
    class="border-2px rounded-6px cursor-pointer hover:border-primary"
    :class="[checked ? 'border-primary' : 'border-transparent']"
  >
    <a-tooltip :content="activeConfig.placement" position="bottom">
      <template #content>
        <span>{{ label }}</span>
      </template>
      <div
        class="layout-checkbox__shadow relative w-56px h-48px bg-white rounded-4px overflow-hidden"
      >
        <div class="absolute-lt bg-[#273352]" :class="activeConfig.menuClass"></div>
        <div class="absolute-rb bg-[#f0f2f5]" :class="activeConfig.mainClass"></div>
      </div>
    </a-tooltip>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import type { FollowerPlacement } from 'vueuc';
  import type { EnumThemeLayoutMode } from '@/enums';

  interface Props {
    /** 布局模式 */
    mode: EnumType.ThemeLayoutMode;
    /** 布局模式文本 */
    label: EnumThemeLayoutMode;
    /** 选中状态 */
    checked: boolean;
  }

  const props = defineProps<Props>();

  type LayoutConfig = Record<
    EnumType.ThemeLayoutMode,
    {
      placement: FollowerPlacement;
      menuClass: string;
      mainClass: string;
    }
  >;

  const layoutConfig: LayoutConfig = {
    vertical: {
      placement: 'bottom-start',
      menuClass: 'w-1/3 h-full',
      mainClass: 'w-2/3 h-3/4',
    },
    'vertical-mix': {
      placement: 'bottom',
      menuClass: 'w-1/4 h-full',
      mainClass: 'w-2/3 h-3/4',
    },
    horizontal: {
      placement: 'bottom',
      menuClass: 'w-full h-1/4',
      mainClass: 'w-full h-3/4',
    },
    'horizontal-mix': {
      placement: 'bottom-end',
      menuClass: 'w-full h-1/4',
      mainClass: 'w-2/3 h-3/4',
    },
  };

  const activeConfig = computed(() => layoutConfig[props.mode]);
</script>
<style scoped>
  .layout-checkbox__shadow {
    box-shadow: 0 1px 2.5px rgba(0, 0, 0, 0.18);
  }
</style>
