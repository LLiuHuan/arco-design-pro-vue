<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2024-08-07 18:52:02
 * @LastEditTime: 2024-08-23 15:15:45
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
  import {
    useMultipleTabSetting,
    useRootSetting,
    useTransitionSetting,
  } from '@/hooks/setting';
  import { computed, unref } from 'vue';
  import { useRouteStore } from '@/store/modules/route';

  interface Props {
    /** 显示padding */
    showPadding?: boolean;
  }

  defineOptions({ name: 'LayoutContent' });

  withDefaults(defineProps<Props>(), {
    showPadding: true,
  });

  const routeStore = useRouteStore();

  const { getShowMultipleTab } = useMultipleTabSetting();
  const {
    getOpenKeepAlive,
    getPageLoading,
    setContentXScrollable,
    getReloadFlag,
  } = useRootSetting();
  const { getBasicTransition, getEnableTransition, getOpenPageLoading } =
    useTransitionSetting();
  // 是否开启缓存
  const openCache = computed(
    () => unref(getOpenKeepAlive) && unref(getShowMultipleTab),
  );

  const transitionName = computed(() =>
    unref(getEnableTransition) ? unref(getBasicTransition) : '',
  );
</script>

<template>
  <div
    v-loading="getOpenPageLoading && getPageLoading"
    :class="{
      'p-16px': showPadding,
    }"
    class="text-[var(--color-text-1)] flex-1"
  >
    <RouterView v-slot="{ Component, route }" class="h-full">
      <Transition
        :name="transitionName"
        appear
        mode="out-in"
        @before-leave="setContentXScrollable(true)"
        @after-enter="setContentXScrollable(false)"
      >
        <KeepAlive v-if="openCache" :include="routeStore.cacheRoutes" :max="12">
          <Component
            :is="Component"
            v-if="getReloadFlag"
            :key="route.fullPath"
          />
        </KeepAlive>
        <Component :is="Component" v-else :key="route.fullPath" />
      </Transition>
    </RouterView>
  </div>
</template>

<style lang="less" scoped></style>
