<template>
  <HoverContainer
    :tooltip-content="$t('layout.header.switchLanguage')"
    position="left"
  >
    <ADropdown trigger="click" @select="handleSelect">
      <AButton type="text" class="!text-[var(--color-text-1)]">
        <SvgIcon icon="heroicons:language-16-solid" size="20"> </SvgIcon>
      </AButton>
      <template #content>
        <ADoption :style="getActivateStyle(LOCALE.ZH_CN)" :value="LOCALE.ZH_CN"
          >中文</ADoption
        >
        <ADoption :style="getActivateStyle(LOCALE.EN_US)" :value="LOCALE.EN_US"
          >English</ADoption
        >
      </template>
    </ADropdown>
  </HoverContainer>
</template>

<script lang="ts" setup>
  import { HoverContainer } from '@/components/HoverContainer';
  import { SvgIcon } from '@/components/Icon';
  import { LOCALE } from '@/settings';
  import { useLocale } from '@/locale/useLocale';
  import { LocaleType } from '~/types/config';
  import { unref } from 'vue';

  const { changeLocale, getLocale } = useLocale();

  const handleSelect = (value: string) => {
    changeLocale(value as LocaleType);
  };

  const getActivateStyle = (lang: LocaleType) => {
    if (unref(getLocale) === lang) {
      return {
        backgroundColor: 'var(--color-fill-2)',
        color: 'rgb(var(--primary-6))',
      };
    }
    return {};
  };
</script>

<style lang="less" scoped></style>
