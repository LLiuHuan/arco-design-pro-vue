<template>
  <a-layout-footer ref="footerRef" :class="prefixCls" class="h-48px">
    <div :class="`${prefixCls}__links`">
      <IconGithub
        :class="`${prefixCls}__github`"
        class="cursor-pointer"
        @click="openWindow(GITHUB_URL)"
      />
    </div>

    <div>Copyright &copy;{{ year }} Arco Design Pro</div>
  </a-layout-footer>
</template>

<script lang="ts" setup>
  import { openWindow } from '@/utils';
  import { GITHUB_URL } from '@/settings';
  import { useDesign } from '@/hooks/common';

  const { prefixCls } = useDesign('layout-footer');

  const date = new Date();
  const year = date.getFullYear();
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{name}-layout-footer';

  @normal-color: rgba(0, 0, 0, 0.45);

  @hover-color: rgba(0, 0, 0, 0.85);

  .@{prefix-cls} {
    color: @normal-color;
    text-align: center;
    background: var(--color-bg-2);

    &__links {
      margin-bottom: 8px;

      a {
        color: @normal-color;

        &:hover {
          color: @hover-color;
        }
      }
    }

    &__github {
      margin: 0 30px;

      &:hover {
        color: @hover-color;
      }
    }
  }
</style>
