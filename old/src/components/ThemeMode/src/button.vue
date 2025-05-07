<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2024-08-23 10:13:56
 * @LastEditTime: 2024-08-23 12:42:03
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
  import { computed, unref, nextTick } from 'vue';
  import { useRootSetting } from '@/hooks/setting';
  import { SvgIcon } from '@/components/Icon';
  import { ThemeModeIcons, ThemeModeIconsTransition } from '@/constants/app';
  import { AppEnum } from '@/enums';

  interface Props {
    /**
     * @description: 关闭跟随系统
     * @default: false
     */
    isNotAuto?: boolean;

    /**
     * @description: 图标大小
     * @default: 20
     */
    size?: number;
  }

  defineOptions({ name: 'ThemeModeButton' });

  const props = withDefaults(defineProps<Props>(), {
    isNotAuto: false,
    size: 20,
  });

  const { getDarkMode, getIsDarkMode, toggleDarkMode } = useRootSetting();

  const icon = computed(() => {
    const theme = unref(getDarkMode);
    return ThemeModeIcons[theme];
  });

  function toggleThemeMode(event: MouseEvent) {
    const isAppearanceTransition =
      document.startViewTransition &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isAppearanceTransition || !event) {
      toggleDarkMode(props.isNotAuto);
      return;
    }
    const x = event.clientX;
    const y = event.clientY;

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y),
    );
    // @ts-expect-error: Transition API
    const transition = document.startViewTransition(async () => {
      toggleDarkMode(props.isNotAuto);
      await nextTick();
    });
    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];
      document.documentElement.animate(
        {
          clipPath: unref(getIsDarkMode) ? [...clipPath].reverse() : clipPath,
        },
        {
          duration: 450,
          easing: 'ease-in',
          pseudoElement: unref(getIsDarkMode)
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        },
      );
    });
  }
</script>

<template>
  <AButton
    class="!text-[var(--color-text-1)]"
    type="text"
    @click.stop="toggleThemeMode"
  >
    <template v-if="isNotAuto">
      <SvgIcon
        v-if="getIsDarkMode"
        :icon="ThemeModeIconsTransition[AppEnum.DARK]"
        :size="size"
      />
      <SvgIcon
        v-else
        :icon="ThemeModeIconsTransition[AppEnum.LIGHT]"
        :size="size"
      />
    </template>
    <SvgIcon v-else :icon="icon" :size="size" />
  </AButton>
</template>

<style lang="less" scoped></style>
