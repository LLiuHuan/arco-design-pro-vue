<template>
  <a-space class="system-logo" @click="toHome">
    <img class="w-32px" src="/logo.png" alt="logo" />
    <div v-show="showTitle">{{ title ?? globTitle }}</div>
  </a-space>
</template>

<script lang="ts" setup>
  import { useRouterPush } from '@/hooks/component';
  import { useGlobSetting } from '@/hooks/setting';

  const { toHome } = useRouterPush();

  defineOptions({ name: 'AppLogo' });

  interface Props {
    /** 项目标题名称，不填写就显示默认的 */
    title?: string;
    /**
     * Whether to show title - [是否显示标题]
     */
    showTitle?: boolean;
  }

  withDefaults(defineProps<Props>(), {
    showTitle: true,
  });

  const { title: globTitle } = useGlobSetting();
</script>

<style lang="less" scoped></style>
