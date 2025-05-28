<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-27 11:47:53
 * @LastEditTime: 2025-05-27 11:52:59
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import { MdiGithub, MdiGoogle, MdiQqchat, MdiWechat } from '@arco/icons';
import { $t } from '@arco/locales';

import { ArcoIconButton } from '@arco-core/shadcn-ui';

defineOptions({
  name: 'ThirdPartyLogin',
});
</script>

<template>
  <div class="w-full sm:mx-auto md:max-w-md">
    <div class="mt-4 flex items-center justify-between">
      <span class="border-input w-[35%] border-b dark:border-gray-600"></span>
      <span class="text-muted-foreground text-center text-xs uppercase">
        {{ $t('authentication.thirdPartyLogin') }}
      </span>
      <span class="border-input w-[35%] border-b dark:border-gray-600"></span>
    </div>

    <div class="mt-4 flex flex-wrap justify-center">
      <ArcoIconButton class="mb-3">
        <MdiWechat />
      </ArcoIconButton>
      <ArcoIconButton class="mb-3">
        <MdiQqchat />
      </ArcoIconButton>
      <ArcoIconButton class="mb-3">
        <MdiGithub />
      </ArcoIconButton>
      <ArcoIconButton class="mb-3">
        <MdiGoogle />
      </ArcoIconButton>
    </div>
  </div>
</template>
