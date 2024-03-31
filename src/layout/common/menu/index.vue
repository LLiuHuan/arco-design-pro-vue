<template>
  <div class="size-full flex-col-stretch shadow-sider text-16px font-bold">
    <AppLogo
      v-if="getIsShowLogo"
      :theme="theme"
      :show-title="!getCollapsed"
      style="height: 64px"
    ></AppLogo>
  </div>
</template>

<script lang="ts" setup>
  import { AppLogo } from '@/components/AppLogo';
  import { computed, unref } from 'vue';
  import { useMenuSetting, useRootSetting } from '@/hooks/setting';
  import { ThemeEnum } from '@/enums';

  const { getShowLogo } = useRootSetting();
  const { getIsSidebarType, getCollapsed } = useMenuSetting();

  interface Props {
    /**
     * The theme of the current parent component - [当前父组件的主题]
     */
    theme?: ThemeEnum;
  }

  defineProps<Props>();

  const getIsShowLogo = computed(
    () => unref(getShowLogo) && unref(getIsSidebarType),
  );
</script>

<style lang="less" scoped></style>
