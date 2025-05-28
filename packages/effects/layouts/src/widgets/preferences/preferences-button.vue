<script lang="ts" setup>
import { Settings } from '@arco/icons';

import { ArcoIconButton } from '@arco-core/shadcn-ui';

import Preferences from './preferences.vue';

const emit = defineEmits<{ clearPreferencesAndLogout: [] }>();

function clearPreferencesAndLogout() {
  emit('clearPreferencesAndLogout');
}
</script>
<template>
  <Preferences @clear-preferences-and-logout="clearPreferencesAndLogout">
    <ArcoIconButton>
      <Settings class="text-foreground size-4" />
    </ArcoIconButton>
  </Preferences>
</template>
