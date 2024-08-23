<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2024-05-13 22:31:00
 * @LastEditTime: 2024-08-23 09:47:56
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
  import { computed, unref } from 'vue';
  import { useRootSetting } from '@/hooks/setting';
  import { SvgIcon } from '@/components/Icon';
  import { APP_DARK_MODE_IS_AUTO_KEY, AppEnum } from '@/enums';
  import { localStg } from '@/utils/cache';

  interface Props {
    /**
     * @description: 是否自动
     */
    auto?: boolean;
  }

  defineOptions({ name: 'DarkModeSwitch' });

  const props = withDefaults(defineProps<Props>(), {
    auto: false,
  });

  const { getDarkMode, getIsDarkMode } = useRootSetting();

  const icons: Record<AppEnum, string> = {
    [AppEnum.LIGHT]: 'line-md:sunny-filled',
    [AppEnum.DARK]: 'line-md:moon-filled',
    [AppEnum.AUTO]: '',
  };

  const autoIcons: Record<AppEnum, string> = {
    [AppEnum.LIGHT]: 'ic:round-wb-sunny',
    [AppEnum.DARK]: 'ic:round-nightlight',
    [AppEnum.AUTO]: 'ic:round-hdr-auto',
  };

  const icon = computed(() => {
    const theme = unref(getDarkMode);
    return autoIcons[theme];
  });

  if (props.auto) {
    localStg.set(APP_DARK_MODE_IS_AUTO_KEY, true);
  } else {
    localStg.remove(APP_DARK_MODE_IS_AUTO_KEY);
  }
</script>

<template>
  <template v-if="!auto">
    <SvgIcon v-if="getIsDarkMode" :icon="icons[AppEnum.DARK]" size="20" />
    <SvgIcon v-else :icon="icons[AppEnum.LIGHT]" size="20" />
  </template>
  <SvgIcon v-else :icon="icon" size="20" />
</template>

<style lang="less" scoped></style>
