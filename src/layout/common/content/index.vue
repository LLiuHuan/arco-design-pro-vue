<template>
  <router-view v-slot="{ Component, route }">
    <!--  :name="theme.pageAnimateMode"  -->
    <!--    @before-leave="app.setDisableMainXScroll(true)"-->
    <!--    @after-enter="app.setDisableMainXScroll(false)"-->
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
        <component
          :is="Component"
          :key="route.fullPath"
          :class="{ 'p-16px': showPadding }"
          class="flex-grow bg-#f6f9f8 dark:bg-#101014 transition duration-300 ease-in-out"
        />
      </keep-alive>
      <component
        :is="Component"
        v-else
        :key="route.fullPath"
        :class="{ 'p-16px': showPadding }"
        class="flex-grow bg-#f6f9f8 dark:bg-#101014 transition duration-300 ease-in-out"
      />
    </transition>
  </router-view>
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
  const { getOpenKeepAlive } = useRootSetting();
  const { getBasicTransition, getEnableTransition } = useTransitionSetting();
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
