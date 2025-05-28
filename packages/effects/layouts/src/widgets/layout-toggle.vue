<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-27 12:13:55
 * @LastEditTime: 2025-05-27 12:24:25
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type { AuthPageLayoutType } from '@arco/types';

import type { ArcoDropdownMenuItem } from '@arco-core/shadcn-ui';

import { computed } from 'vue';

import { InspectionPanel, PanelLeft, PanelRight } from '@arco/icons';
import { $t } from '@arco/locales';
import {
  preferences,
  updatePreferences,
  usePreferences,
} from '@arco/preferences';

import { ArcoDropdownRadioMenu, ArcoIconButton } from '@arco-core/shadcn-ui';

defineOptions({
  name: 'AuthenticationLayoutToggle',
});

const menus = computed((): ArcoDropdownMenuItem[] => [
  {
    icon: PanelLeft,
    label: $t('authentication.layout.alignLeft'),
    value: 'panel-left',
  },
  {
    icon: InspectionPanel,
    label: $t('authentication.layout.center'),
    value: 'panel-center',
  },
  {
    icon: PanelRight,
    label: $t('authentication.layout.alignRight'),
    value: 'panel-right',
  },
]);

const { authPanelCenter, authPanelLeft, authPanelRight } = usePreferences();

function handleUpdate(value: string | undefined) {
  if (!value) return;
  updatePreferences({
    app: {
      authPageLayout: value as AuthPageLayoutType,
    },
  });
}
</script>

<template>
  <ArcoDropdownRadioMenu
    :menus="menus"
    :model-value="preferences.app.authPageLayout"
    @update:model-value="handleUpdate"
  >
    <ArcoIconButton>
      <PanelRight v-if="authPanelRight" class="size-4" />
      <PanelLeft v-if="authPanelLeft" class="size-4" />
      <InspectionPanel v-if="authPanelCenter" class="size-4" />
    </ArcoIconButton>
  </ArcoDropdownRadioMenu>
</template>
