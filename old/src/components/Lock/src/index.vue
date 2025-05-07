<template>
  <transition mode="out-in" name="fade-bottom">
    <LockPage v-if="getIsLock" />
  </transition>
</template>

<script lang="ts" setup>
  import { useLockStore } from '@/store/modules/lock';
  import { computed } from 'vue';
  import LockPage from './lockPage.vue';

  const lockStore = useLockStore();
  const getIsLock = computed(() => lockStore?.lockInfo?.isLock ?? false);
</script>

<style lang="less" scoped></style>
