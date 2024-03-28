<template>
  <div :class="getClass" :style="getDragBarStyle"></div>
</template>

<script lang="ts" setup>
  import { computed, unref } from 'vue';
  import { useDesign } from '@/hooks/common';
  import { useMenuSetting } from '@/hooks/setting';

  defineOptions({ name: 'LayoutDragBar' });

  const { prefixCls } = useDesign('drag-bar');
  const { getCollapsed, getCanDrag } = useMenuSetting();

  const getDragBarStyle = computed(() => {
    if (unref(getCollapsed)) {
      // TODO: unref(getMiniWidthNumber) is not defined
      // TODO: 应该设置成动态的
      return { left: `48px` };
    }
    return {};
  });

  const getClass = computed(() => {
    return [
      prefixCls,
      {
        [`${prefixCls}--hide`]: !unref(getCanDrag),
      },
    ];
  });
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{name}-drag-bar';

  .@{prefix-cls} {
    position: absolute;
    top: 0;
    right: -2px;
    z-index: @side-drag-z-index;
    width: 2px;
    height: 100%;
    cursor: col-resize;
    border-top: none;
    border-bottom: none;

    &--hide {
      display: none;
    }

    &:hover {
      background-color: rgb(var(--primary-5));
      box-shadow: 0 0 4px 0 rgb(28 36 56 / 15%);
    }
  }
</style>
