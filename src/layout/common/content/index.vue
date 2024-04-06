<template>
  <div
    v-loading="getOpenPageLoading && getPageLoading"
    :class="{
      'p-16px': showPadding,
      'h-full': getOpenPageLoading && getPageLoading,
    }"
    class="overflow-hidden"
  >
    <RouterView
      v-slot="{ Component, route }"
      class="transition duration-300 ease-in-out"
    >
      <transition
        :name="
          getTransitionName({
            route,
            openCache,
            enableTransition: getEnableTransition,
            cacheTabs: getCaches,
            def: getBasicTransition,
          })
        "
        mode="out-in"
        appear
      >
        <keep-alive v-if="openCache" :include="getCaches">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
        <component :is="Component" v-else :key="route.fullPath" />
      </transition>
    </RouterView>
  </div>
</template>

<script lang="ts" setup>
  import { useMultipleTabStore } from '@/store/modules/multipleTab';
  import {
    useRootSetting,
    useMultipleTabSetting,
    useTransitionSetting,
  } from '@/hooks/setting';
  import { computed, unref } from 'vue';
  import { getTransitionName } from './transition';

  defineOptions({ name: 'LayoutContent' });

  interface Props {
    /** 显示padding */
    showPadding?: boolean;
  }

  withDefaults(defineProps<Props>(), {
    showPadding: true,
  });

  const tabStore = useMultipleTabStore();

  const { getShowMultipleTab } = useMultipleTabSetting();
  const { getOpenKeepAlive, getPageLoading } = useRootSetting();
  const { getBasicTransition, getEnableTransition, getOpenPageLoading } =
    useTransitionSetting();
  // 是否开启缓存
  const openCache = computed(
    () => unref(getOpenKeepAlive) && unref(getShowMultipleTab),
  );

  const getCaches = computed((): string[] => {
    if (!unref(getOpenKeepAlive)) {
      return [];
    }
    return tabStore.getCachedTabList;
  });
</script>

<style lang="less" scoped></style>
