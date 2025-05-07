<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2024-08-23 17:05:40
 * @LastEditTime: 2024-08-23 17:11:09
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
  import { LocaleEnum } from '@/enums';
  import { useLocale } from '@/hooks/web/useLocale';
  import { unref } from 'vue';
  import type { LocaleType } from '~/types/config';
  import { SvgIcon } from '@/components/Icon';

  const { changeLocale, getLocale } = useLocale();
  const handleSelect = (value: LocaleType) => {
    changeLocale(value);
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

<template>
  <ADropdown trigger="click" @select="handleSelect">
    <AButton class="!text-[var(--color-text-1)]" type="text">
      <SvgIcon icon="heroicons:language-16-solid" size="20" />
    </AButton>
    <template #content>
      <ADoption
        :style="getActivateStyle(LocaleEnum.zh_CN)"
        :value="LocaleEnum.zh_CN"
      >
        中文
      </ADoption>
      <ADoption
        :style="getActivateStyle(LocaleEnum.en_US)"
        :value="LocaleEnum.en_US"
      >
        English
      </ADoption>
    </template>
  </ADropdown>
</template>

<style lang="less" scoped></style>
