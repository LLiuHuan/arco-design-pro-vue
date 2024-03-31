<template>
  <div
    class="system-logo flex-center flex-center cursor-pointer transition-all-200"
    :class="[
      theme === ThemeEnum.DARK
        ? 'text-[var(--color-white)]'
        : 'border-b-[var(--color-border-1)] border-b border-solid border-0 !text-[rgba(var(--primary-6))]',
    ]"
    @click="toHome(false)"
  >
    <img class="w-32px" src="/logo.png" alt="logo" />
    <div
      v-show="showTitle"
      class="text-16px font-bold transition-all-500 leading-normal ml-2 truncate md:opacity-100"
      >{{ title ?? globTitle }}</div
    >
  </div>
</template>

<script lang="ts" setup>
  import { useRouterPush } from '@/hooks/component';
  import { useGlobSetting } from '@/hooks/setting';
  import { ThemeEnum } from '@/enums';

  const { toHome } = useRouterPush();

  defineOptions({ name: 'AppLogo' });

  interface Props {
    /** 项目标题名称，不填写就显示默认的 */
    title?: string;
    /**
     * Whether to show title - [是否显示标题]
     */
    showTitle?: boolean;
    /**
     * The theme of the current parent component - [当前父组件的主题]
     */
    theme?: ThemeEnum;
  }

  withDefaults(defineProps<Props>(), {
    showTitle: true,
    theme: ThemeEnum.LIGHT,
  });

  const { title: globTitle } = useGlobSetting();
</script>

<style lang="less" scoped></style>
