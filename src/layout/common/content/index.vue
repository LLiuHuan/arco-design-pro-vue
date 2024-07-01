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
        @before-leave="appStore.setContentXScrollable(true)"
        @after-enter="appStore.setContentXScrollable(false)"
      >
        <KeepAlive v-if="openCache" :include="routeStore.cacheRoutes" :max="12">
          <Component
            :is="Component"
            v-if="appStore.reloadFlag"
            :key="route.fullPath"
          />
        </KeepAlive>
        <Component :is="Component" v-else :key="route.fullPath" />
      </Transition>
    </RouterView>
  </div>
</template>

<script lang="ts" setup>
  import {
    useMultipleTabSetting,
    useRootSetting,
    useTransitionSetting,
  } from '@/hooks/setting';
  import { computed, unref } from 'vue';
  import { useAppStore } from '@/store/modules/app';
  import { useRouteStore } from '@/store/modules/route';

  defineOptions({ name: 'LayoutContent' });

  interface Props {
    /** 显示padding */
    showPadding?: boolean;
  }

  withDefaults(defineProps<Props>(), {
    showPadding: true,
  });

  const appStore = useAppStore();
  const routeStore = useRouteStore();

  const { getShowMultipleTab } = useMultipleTabSetting();
  const { getOpenKeepAlive, getPageLoading } = useRootSetting();
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

<style lang="less" scoped></style>
