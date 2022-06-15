<template>
  <hover-container
    tooltip-content="切换语言"
    class="w-40px h-full"
    :inverted="theme.header.inverted"
    @click="setLanguage"
  >
    <icon-english-fill
      v-if="theme.language === 'zh-CN'"
      class="text-20px"
      style="color: var(--color-text-1)"
    />
    <icon-chinese-fill v-else class="text-20px" style="color: var(--color-text-1)" />
  </hover-container>
</template>

<script lang="ts" setup>
  import { useI18n } from 'vue-i18n';
  import { useThemeStore } from '@/store';
  import useLocale from '@/hooks/locale';

  const { changeLocale } = useLocale();

  const theme = useThemeStore();

  const setLanguage = () => {
    const language = theme.language === 'zh-CN' ? 'en-US' : 'zh-CN';
    theme.setLanguage(language);
    // locale.value = language;
    changeLocale(language);
  };

  const init = () => {
    setLanguage();
  };

  init();
</script>

<style lang="less" scoped></style>
