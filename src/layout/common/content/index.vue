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
        :name="
          getTransitionName({
            route,
            openCache,
            enableTransition: getEnableTransition,
            cacheTabs: getCaches,
            def: getBasicTransition,
          })
        "
        appear
        mode="out-in"
        @before-leave="setRootSetting({ contentXScrollable: true })"
        @after-enter="setRootSetting({ contentXScrollable: false })"
      >
        <KeepAlive v-if="openCache" :include="getCaches">
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
  import { useMultipleTabWithOutStore } from '@/store/modules/multipleTab';
  import {
    useMultipleTabSetting,
    useRootSetting,
    useTransitionSetting,
  } from '@/hooks/setting';
  import { computed, unref } from 'vue';
  import { useAppStoreWithOut } from '@/store/modules/app';
  import { getTransitionName } from './transition';

  defineOptions({ name: 'LayoutContent' });

  interface Props {
    /** 显示padding */
    showPadding?: boolean;
  }

  withDefaults(defineProps<Props>(), {
    showPadding: true,
  });

  const tabStore = useMultipleTabWithOutStore();
  const appStore = useAppStoreWithOut();

  const { getShowMultipleTab } = useMultipleTabSetting();
  const { getOpenKeepAlive, getPageLoading, setRootSetting } = useRootSetting();
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
