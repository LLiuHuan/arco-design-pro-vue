<template>
  <!-- 切换模式 MODE SWITCH -->
  <div class="flex-center text-18px cursor-pointer" @click="handleToggleTheme">
    <icon-moon-fill v-if="isDark" />
    <icon-sun-fill v-else />
  </div>
</template>

<script setup lang="ts">
  import { useDark, useToggle } from '@vueuse/core';

  interface Emits {
    (e: 'update:dark', darkMode: boolean): void;
  }

  const emit = defineEmits<Emits>();

  const isDark = useDark({
    selector: 'body',
    attribute: 'arco-theme',
    valueDark: 'dark',
    valueLight: 'light',
    storageKey: 'arco-theme',
    onChanged(dark: boolean) {
      // overridden default behavior
      emit('update:dark', dark);
    },
  });
  const toggleTheme = useToggle(isDark);
  const handleToggleTheme = () => {
    toggleTheme();
  };
</script>
<style scoped></style>
