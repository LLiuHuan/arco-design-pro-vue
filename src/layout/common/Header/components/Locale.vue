<template>
  <hover-container
    :tooltip-content="$t('settings.language')"
    class="w-40px h-full"
    :inverted="theme.header.inverted"
    @click="setLanguage(theme.language === 'zh-CN' ? 'en-US' : 'zh-CN')"
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
  import { useThemeStore } from '@/store';
  import useLocale from '@/hooks/locale';

  const { changeLocale } = useLocale();

  const theme = useThemeStore();

  const setLanguage = (language: EnumType.Language | undefined = 'zh-CN') => {
    console.log(language);

    // if (!language) {
    //   language = theme.language === 'zh-CN' ? 'en-US' : 'zh-CN';
    // }
    // theme.setLanguage(language);
    changeLocale(language);
  };

  const init = () => {
    setLanguage(theme.getLanguage);
  };

  init();
</script>

<style lang="less" scoped></style>
