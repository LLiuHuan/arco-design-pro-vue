<template>
  <HoverContainer
    :tooltip-content="$t('layout.header.switchLanguage')"
    position="left"
  >
    <ADropdown trigger="click" @select="handleSelect">
      <AButton class="!text-[var(--color-text-1)] !h-40px" type="text">
        <SvgIcon icon="heroicons:language-16-solid" size="20"></SvgIcon>
      </AButton>
      <template #content>
        <ADoption
          :style="getActivateStyle(LocaleEnum.zh_CN)"
          :value="LocaleEnum.zh_CN"
          >中文
        </ADoption>
        <ADoption
          :style="getActivateStyle(LocaleEnum.en_US)"
          :value="LocaleEnum.en_US"
          >English
        </ADoption>
      </template>
    </ADropdown>
  </HoverContainer>
</template>

<script lang="ts" setup>
  import { HoverContainer } from '@/components/HoverContainer';
  import { SvgIcon } from '@/components/Icon';
  import { LocaleType } from '~/types/config';
  import { LocaleEnum } from '@/enums';
  import { unref } from 'vue';
  import { useLocale } from '@/hooks/web/useLocale';

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
