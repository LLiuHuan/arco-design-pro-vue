<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-27 12:13:55
 * @LastEditTime: 2025-05-27 12:24:19
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type { SupportedLanguagesType } from '@arco/locales';

import { SUPPORT_LANGUAGES } from '@arco/constants';
import { Languages } from '@arco/icons';
import { loadLocaleMessages } from '@arco/locales';
import { preferences, updatePreferences } from '@arco/preferences';

import { ArcoDropdownRadioMenu, ArcoIconButton } from '@arco-core/shadcn-ui';

defineOptions({
  name: 'LanguageToggle',
});

async function handleUpdate(value: string | undefined) {
  if (!value) return;
  const locale = value as SupportedLanguagesType;
  updatePreferences({
    app: {
      locale,
    },
  });
  await loadLocaleMessages(locale);
}
</script>

<template>
  <div>
    <ArcoDropdownRadioMenu
      :menus="SUPPORT_LANGUAGES"
      :model-value="preferences.app.locale"
      @update:model-value="handleUpdate"
    >
      <ArcoIconButton>
        <Languages class="text-foreground size-4" />
      </ArcoIconButton>
    </ArcoDropdownRadioMenu>
  </div>
</template>
