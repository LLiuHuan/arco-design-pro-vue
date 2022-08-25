<template>
  <a-dropdown @select="handleDropdown">
    <slot></slot>
    <template #content>
      <a-doption
        v-for="item in options"
        :key="item.key"
        :value="item.key"
        :disabled="item.disabled"
      >
        {{ item.label }}
        <template #icon>
          <component v-if="item.icon" :is="item.icon" />
        </template>
      </a-doption>
    </template>
  </a-dropdown>
</template>

<script lang="ts" setup>
  import { computed, reactive, watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { useAppStore, useTabStore } from '@/store';

  interface Props {
    /** 右键菜单可见性 */
    visible?: boolean;
  }

  interface Emits {
    (e: 'update:visible', visible: boolean): void;
  }

  type DropdownKey =
    | 'reload-current'
    | 'close-current'
    | 'close-other'
    | 'close-left'
    | 'close-right'
    | 'close-all';
  type Option = {
    key: DropdownKey;
    label: string;
    disabled?: boolean;
    icon?: string;
  };

  const props = withDefaults(defineProps<Props>(), {
    visible: false,
  });

  const route = useRoute();

  const state = reactive({
    currentPath: route.fullPath,
  });

  const emit = defineEmits<Emits>();

  const app = useAppStore();
  const tab = useTabStore();

  const dropdownVisible = computed({
    get() {
      return props.visible;
    },
    set(visible: boolean) {
      emit('update:visible', visible);
    },
  });

  function hide() {
    dropdownVisible.value = false;
  }

  const options = computed<Option[]>(() => [
    {
      label: '重新加载',
      key: 'reload-current',
      disabled: state.currentPath !== tab.activeTab,
      icon: 'icon-refresh',
    },
    {
      label: '关闭选中',
      key: 'close-current',
      disabled: state.currentPath === tab.homeTab.fullPath,
      icon: 'icon-close',
    },
    {
      label: '关闭其他',
      key: 'close-other',
      icon: 'icon-minus',
    },
    {
      label: '关闭左侧',
      key: 'close-left',
      icon: 'icon-to-left',
    },
    {
      label: '关闭右侧',
      key: 'close-right',
      icon: 'icon-to-right',
    },
  ]);

  const actionMap = new Map<DropdownKey, () => void>([
    [
      'reload-current' || '重新加载',
      () => {
        app.reloadPage(state.currentPath);
      },
    ],
    [
      'close-current',
      () => {
        tab.removeTab(state.currentPath);
      },
    ],
    [
      'close-other',
      () => {
        tab.clearTab([state.currentPath]);
      },
    ],
    [
      'close-left',
      () => {
        tab.clearLeftTab(state.currentPath);
      },
    ],
    [
      'close-right',
      () => {
        tab.clearRightTab(state.currentPath);
      },
    ],
  ]);

  function handleDropdown(optionKey: string) {
    const key = optionKey as DropdownKey;
    const actionFunc = actionMap.get(key);
    if (actionFunc) {
      actionFunc();
    }
    hide();
  }

  watch(
    () => route.fullPath,
    (path: string) => {
      state.currentPath = path;
    }
  );
</script>

<style lang="less" scoped></style>
