<template>
  <div
    :class="prefixCls"
    class="w-full flex justify-center items-center"
    @click.stop="toggleCollapsed"
  >
    <SvgIcon
      v-if="getCollapsed"
      icon="line-md:chevron-double-right"
      size="20"
    ></SvgIcon>
    <SvgIcon v-else icon="line-md:chevron-double-left" size="20"></SvgIcon>
  </div>
</template>

<script lang="ts" setup>
  import { useDesign } from '@/hooks/common';
  import { useMenuSetting } from '@/hooks/setting';
  import { SvgIcon } from '@/components/Icon';

  defineOptions({ name: 'SiderTrigger' });

  const { prefixCls } = useDesign('layout-sider-trigger');

  const { getCollapsed, toggleCollapsed } = useMenuSetting();
</script>

<style lang="less" scoped></style>
