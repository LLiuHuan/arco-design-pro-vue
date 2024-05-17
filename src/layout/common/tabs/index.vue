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
        <Draggable
          :list="getTabsState"
          align-point
          animation="300"
          class="flex items-center"
          item-key="fullPath"
          @change="sortTabs"
        >
          <template #item="{ element }">
            <div>
              <ContentMenu :active-key="activeKeyRef" :tab-item="element">
                <div
                  :id="element.fullPath"
                  class="bg-[var(--color-fill-2)] flex-center px-10px py-4px mx-3px rounded-1 cursor-pointer layout-tab-scroll-item h-30px"
                  @click.stop="
                    handleActive(element.fullPath, {
                      params: element.params,
                      query: element.query,
                    })
                  "
                >
                  <span
                    :class="{
                      'text-[rgba(var(--primary-6))]':
                        activeKeyRef === element.fullPath,
                    }"
                  >
                    {{
                      element.meta?.i18nTitle
                        ? $t(element.meta.i18nTitle)
                        : element.meta?.title
                    }}
                  </span>
                  <div
                    v-if="!(element && element.meta && element.meta.affix)"
                    class="flex-center py-2px"
                    @click.stop="handleClose(element.fullPath)"
                  >
                    <SvgIcon
                      class="ml-6px"
                      icon="mingcute:close-fill"
                      size="12"
                    />
                  </div>
                </div>
              </ContentMenu>
            </div>
          </template>
        </Draggable>
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
        :tab-item="$route"
        position="br"
        trigger="click"
      >
        <Dropdown />
      </ContentMenu>
      <Fold v-if="getShowFold" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { SvgIcon } from '@/components/Icon';
  import Draggable from 'vuedraggable';
  import { computed, nextTick, reactive, ref, unref } from 'vue';
  import { useMultipleTabWithOutStore } from '@/store/modules/multipleTab';
  import {
    listenerRouteChange,
    transformRoutePathToRouteName,
  } from '@/utils/router';
  import { PageEnum } from '@/enums';
  import { useAuthStoreWithOut } from '@/store/modules/auth';
  import { RouteLocationNormalized, RouteMeta, useRouter } from 'vue-router';
  import { useGo } from '@/hooks/web/usePage';
  import { useDebounceFn, useResizeObserver } from '@vueuse/core';
  import { useHeaderSetting, useMultipleTabSetting } from '@/hooks/setting';
  import { getTabRouteByVueRoute } from '@/store/modules/multipleTab/helpers';
  import { useFullContent } from '@/hooks/web/useFullContent';
  import { ContentMenu, Dropdown, Fold, Redo, Setting } from './components';

  const activeKeyRef = ref('');
  const navScroll = ref();
  const tabState = reactive({
    scrollable: false,
  });

  const router = useRouter();

  const tabStore = useMultipleTabWithOutStore();
  const userStore = useAuthStoreWithOut();
  const { goKey } = useGo();

  const { getShowFold, getShowQuick, getShowRedo } = useMultipleTabSetting();
  const { getShowHeader } = useHeaderSetting();
  const { getFullContent } = useFullContent();

  const getTabsState = computed(() => {
    return tabStore.getTabList.filter((item) => !item.meta?.hideTab);
  });

  const unClose = computed(() => unref(getTabsState).length === 1);

  const sortTabs = (val: { moved: { newIndex: number; oldIndex: number } }) => {
    tabStore.sortTabs(val.moved.oldIndex, val.moved.newIndex);
  };

  const handleActive = (activeKey: any, options: any) => {
    activeKeyRef.value = activeKey;
    goKey(transformRoutePathToRouteName(activeKey), options);
  };

  const handleClose = (targetKey: string) => {
    if (unClose.value) {
      return;
    }
    tabStore.closeTabByKey(targetKey, router);
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

  // endregion scroll
  listenerRouteChange((route) => {
    const { name } = route;
    if (name === PageEnum.REDIRECT || !route || !userStore.getToken) {
      return;
    }
    const { path, fullPath, meta = {} } = route;
    const { currentActiveMenu, hideTab, href } = meta as RouteMeta;
    if (href) return;
    const isHide = !hideTab ? null : currentActiveMenu;
    const p = isHide || fullPath || path;
    if (activeKeyRef.value !== p) {
      activeKeyRef.value = p as string;
    }

    if (isHide) {
      const findParentRoute = router
        .getRoutes()
        .find((item) => item.path === currentActiveMenu);

      if (findParentRoute) {
        tabStore.addTab(
          getTabRouteByVueRoute(
            findParentRoute as unknown as RouteLocationNormalized,
          ),
        );
      }
    } else {
      tabStore.addTab(
        getTabRouteByVueRoute(
          unref(route) as unknown as RouteLocationNormalized,
        ),
      );
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
</script>

<style lang="less" scoped></style>
