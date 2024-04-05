<template>
  <!-- class="h-full flex justify-center items-center px-10px py-1px hover:bg-#f6f6f6 cursor-pointer transition-all-300" -->
  <a-button
    type="text"
    class="!text-[var(--color-text-1)] !h-40px"
    @click="toggleCollapsed"
  >
    <SvgIcon
      v-if="getCollapsed"
      icon="line-md:menu-fold-left"
      size="20"
    ></SvgIcon>
    <SvgIcon v-else icon="line-md:menu-unfold-left" size="20"></SvgIcon>
  </a-button>
</template>

<script lang="ts" setup>
  import { useMenuSetting } from '@/hooks/setting';
  import { SvgIcon } from '@/components/Icon';

  defineOptions({ name: 'HeaderTrigger' });

  const { getCollapsed, toggleCollapsed } = useMenuSetting();
</script>

<style lang="less" scoped></style>
