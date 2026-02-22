<script lang="ts" setup>
import { AuthenticationQrCodeLogin } from '@qin/common-ui';
import { LOGIN_PATH } from '@qin/constants';

defineOptions({ name: 'QrCodeLogin' });
</script>

<template>
  <AuthenticationQrCodeLogin :login-path="LOGIN_PATH" />
</template>
