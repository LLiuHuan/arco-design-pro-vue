<template>
  <div class="w-320px">
    <div class="text-[var(--color-text-1)] text-24px font-medium leading-8"
    >{{ $t(loginModuleLabels['register']) }}
    </div>

    <div>注册</div>
    {{ name }}
    <AButton @click="toLoginModule('pwd-login')">注册</AButton>
  </div>
</template>

<script lang="ts" setup>
import {useGo} from '@/hooks/web/usePage';
import {loginModuleLabels} from "@/views/base/login/enum";

const name = 'register';
const {toLoginModule} = useGo();
</script>

<style lang="less" scoped></style>
