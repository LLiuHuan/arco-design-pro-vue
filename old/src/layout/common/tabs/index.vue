<script lang="ts" setup>
  import { SvgIcon } from '@/components/Icon';
  import { computed, nextTick, reactive, ref } from 'vue';
  import { useMultipleTabStore } from '@/store/modules/multipleTab';
  import { listenerRouteChange } from '@/utils/router';
  import { PageEnum } from '@/enums';
  import { RouteMeta, useRoute, useRouter } from 'vue-router';
  import { useDebounceFn, useResizeObserver } from '@vueuse/core';
  import { useHeaderSetting, useMultipleTabSetting } from '@/hooks/setting';
  import { useFullContent } from '@/hooks/web/useFullContent';
  import { useDraggable } from 'vue-draggable-plus';
  import { useAuthStore } from '@/store/modules/auth';
  import {
    ButtonTab,
    ContentMenu,
    Dropdown,
    Fold,
    Redo,
    Setting,
  } from './components';

  const activeKeyRef = ref('');
  const navScroll = ref();
  const tabState = reactive({
    scrollable: false,
  });
  const draggableRef = ref();

  const route = useRoute();
  const router = useRouter();

  const tabStore = useMultipleTabStore();

  const { getShowFold, getShowQuick, getShowRedo } = useMultipleTabSetting();
  const { getShowHeader } = useHeaderSetting();
  const { getFullContent } = useFullContent();
  const authStore = useAuthStore();

  const getTabs = computed({
    get: () => tabStore.tabs,
    set: (value) => {
      tabStore.setTabs(value);
    },
  });

  // const unClose = computed(() => unref(getTabsState).length === 1);

  // const handleActive = (activeKey: any, options: any) => {
  //   activeKeyRef.value = activeKey;
  //   goKey(transformRoutePathToRouteName(activeKey), options);
  // };

  const handleClose = (tab: App.Tab) => {
    tabStore.removeTab(tab.id);
    // await routeStore.reCacheRoutesByKey(tab.routeKey);
  };

  // region scroll

  /**
   * @param autoScroll 是否开启自动滚动功能
   */
  async function updateNavScroll(autoScroll: boolean = true) {
    await nextTick();
    if (!navScroll.value) return;
    const containerWidth = navScroll.value.offsetWidth;
    const navWidth = navScroll.value.scrollWidth;
    if (containerWidth < navWidth) {
      tabState.scrollable = true;
      if (autoScroll) {
        const tagList =
          navScroll.value.querySelectorAll('.layout-tab-scroll-item') || [];
        [...tagList].forEach((tag: HTMLElement) => {
          // fix SyntaxError
          if (tag.id === `${activeKeyRef.value}`) {
            tag.scrollIntoView();
          }
        });
      }
    } else {
      tabState.scrollable = false;
    }
  }

  /**
   * @param value 要滚动到的位置
   * @param amplitude 每次滚动的长度
   */
  function scrollTo(value: number, amplitude: number) {
    const currentScroll = navScroll.value.scrollLeft;
    const scrollWidth =
      (amplitude > 0 && currentScroll + amplitude >= value) ||
      (amplitude < 0 && currentScroll + amplitude <= value)
        ? value
        : currentScroll + amplitude;
    navScroll.value.scrollTo(scrollWidth, 0);
    if (scrollWidth === value) return;
    window.requestAnimationFrame(() => scrollTo(value, amplitude));
  }

  // 滚动 左
  function scrollPrev() {
    const containerWidth = navScroll.value.offsetWidth;
    const currentScroll = navScroll.value.scrollLeft;

    if (!currentScroll) return;
    const scrollLeft =
      currentScroll > containerWidth ? currentScroll - containerWidth : 0;
    scrollTo(scrollLeft, (scrollLeft - currentScroll) / 20);
  }

  // 滚动 右
  function scrollNext() {
    const containerWidth = navScroll.value.offsetWidth;
    const navWidth = navScroll.value.scrollWidth;
    const currentScroll = navScroll.value.scrollLeft;

    if (navWidth - currentScroll <= containerWidth) return;
    const scrollLeft =
      navWidth - currentScroll > containerWidth * 2
        ? currentScroll + containerWidth
        : navWidth - containerWidth;
    scrollTo(scrollLeft, (scrollLeft - currentScroll) / 20);
  }

  // 处理鼠标滚动
  function wheel(event: WheelEvent) {
    event.preventDefault(); // 防止页面滚动
    const { deltaY } = event;
    if (deltaY < 0) {
      scrollPrev();
    } else {
      scrollNext();
    }
  }

  const { start } = useDraggable(draggableRef, getTabs, {
    animation: 300,
  });

  // endregion scroll
  listenerRouteChange((routeItem) => {
    const { name } = routeItem;
    if (name === PageEnum.REDIRECT || !routeItem || !authStore.token) {
      return;
    }
    const { path, fullPath, meta = {} } = routeItem;
    const { activeMenu, hideTab, href } = meta as RouteMeta;
    if (href) return;
    const isHide = !hideTab ? null : activeMenu;
    const p = isHide || fullPath || path;
    if (activeKeyRef.value !== p) {
      activeKeyRef.value = p as string;
    }

    if (isHide) {
      const findParentRoute = router
        .getRoutes()
        .find((item) => item.path === activeMenu);

      if (findParentRoute) {
        tabStore.addTab(routeItem);
      }
    } else {
      tabStore.addTab(routeItem);
    }

    updateNavScroll();
  });

  const debounceScroll = useDebounceFn(() => {
    updateNavScroll();
  }, 80);

  useResizeObserver(navScroll, () => {
    debounceScroll();
  });

  updateNavScroll();

  nextTick(() => {
    start();
  });

  function init() {
    tabStore.initTabs(route);
  }

  init();
</script>

<template>
  <div
    class="flex items-center relative bg-[var(--color-bg-2)] h-full shadow-tab text-[var(--color-text-1)]"
  >
    <div class="flex-auto flex items-center h-full relative nowrap-hidden">
      <span
        v-if="tabState.scrollable"
        class="tabs-prev flex-center w-32px h-full bg-[var(--color-bg-2)] hover:bg-[var(--color-fill-1)] cursor-pointer absolute-lt"
        @click="scrollPrev"
      >
        <SvgIcon icon="mingcute:left-fill" size="16" />
      </span>

      <div
        ref="navScroll"
        :class="{
          'mx-36px': tabState.scrollable,
          'mx-6px': !tabState.scrollable,
        }"
        class="flex-auto navScroll nowrap-hidden"
        @wheel="wheel"
      >
        <div ref="draggableRef" class="flex items-center">
          <div v-for="element in getTabs" :key="element.fullPath">
            <ContentMenu :active-key="activeKeyRef" :tab-item="element">
              <ButtonTab
                :activate="activeKeyRef === element.fullPath"
                :closable="!tabStore.isTabRetain(element.id)"
                :tab="element"
                @close="handleClose(element)"
                @click.stop="tabStore.switchRouteByTab(element)"
              />
            </ContentMenu>
          </div>
        </div>
      </div>

      <span
        v-if="tabState.scrollable"
        class="tabs-next flex-center w-32px h-full bg-[var(--color-bg-2)] hover:bg-[var(--color-fill-1)] cursor-pointer absolute-rt"
        @click="scrollNext"
      >
        <SvgIcon icon="mingcute:right-fill" />
      </span>
    </div>
    <div v-if="getShowRedo || getShowQuick" class="flex-center h-full">
      <Setting v-if="(getShowFold && getFullContent) || !getShowHeader" />
      <Redo v-if="getShowRedo" />
      <ContentMenu
        v-if="getShowQuick"
        :active-key="activeKeyRef"
        :tab-item="tabStore.activeTab"
        position="br"
        trigger="click"
      >
        <Dropdown />
      </ContentMenu>
      <Fold v-if="getShowFold" />
    </div>
  </div>
</template>

<style lang="less" scoped></style>
