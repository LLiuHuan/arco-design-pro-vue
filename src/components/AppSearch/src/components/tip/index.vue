<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2024-05-13 22:31:00
 * @LastEditTime: 2024-08-22 13:42:52
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
  import { SvgIcon } from '@/components/Icon';
  import { useI18n } from '@/hooks/web/useI18n';

  const { t } = useI18n();
</script>

<template>
  <div class="flex-center model-title-right">
    <div class="ac-navbar-search-input-key">
      <SvgIcon icon="uil:enter" size="16" />
    </div>
    <div class="key-word">{{ t('common.okText') }}</div>
    <div class="ac-navbar-search-input-key">
      <SvgIcon icon="uil:arrow-up" size="16" />
    </div>
    <div class="ac-navbar-search-input-key">
      <SvgIcon icon="uil:arrow-down" size="16" />
    </div>
    <div class="key-word">{{ t('common.toggleText') }}</div>
    <div class="ac-navbar-search-input-key">
      <SvgIcon icon="mdi:keyboard-esc" size="16" />
    </div>
    <div class="key-word">{{ t('common.closeText') }}</div>
  </div>
</template>

<style scoped>
  .key-word {
    --uno: text-12px text-[var(--color-text-3)] mr-4px ml-2px leading-0;
  }

  .ac-navbar-search-input-key {
    --uno: flex-row flex-center p-1px wh-20px rounded-3px text-12px mr-1px;
    background: rgba(var(--color-bg-2));
    border: 1px solid var(--color-border-2);
    box-sizing: border-box;
    box-shadow: 0 1px var(--color-border-2);
    color: var(--color-text-3);
  }

  .ac-navbar-search-input-key:first-child {
    margin: 0 4px;
  }
</style>
