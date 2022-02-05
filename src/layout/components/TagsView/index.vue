<template>
  <div
    class="tabs-view"
    :class="{
      'tabs-view-fix': multiTabsSetting.fixed,
      'tabs-view-fixed-header': isMultiHeaderFixed,
      'tabs-view-default-background': theme === 'light',
      'tabs-view-dark-background': theme === 'dark',
    }"
    :style="getChangeStyle"
  >
    <div class="tabs-view-main" :style="{ minWidth: multiTabsSetting.fixed ? '98.5%' : '100%' }">
      <div ref="navWrap" class="tabs-card" :class="{ 'tabs-card-scrollable': scrollable }">
        <span
          class="tabs-card-prev"
          :class="{ 'tabs-card-prev-hide': !scrollable }"
          @click="scrollPrev"
          ><icon-left
        /></span>
        <span
          class="tabs-card-next"
          :class="{ 'tabs-card-next-hide': !scrollable }"
          @click="scrollNext"
          ><icon-right
        /></span>
        <div ref="navScroll" class="tabs-card-scroll pl-2">
          <a-dropdown trigger="contextMenu" alignPoint :style="{ display: 'block' }">
            <a-space>
              <Draggable
                :list="tabsList"
                animation="300"
                item-key="fullPath"
                class="flex"
                ref="flex"
              >
                <template #item="{ element }">
                  <div
                    :id="`tag${element.fullPath.split('/').join('\/')}`"
                    class="tabs-card-scroll-item"
                    :class="{ 'active-item': activeKey === element.path }"
                    @click.stop="goPage(element)"
                    @contextmenu="handleContextMenu($event, element)"
                  >
                    <span v-if="activeKey !== element.path">
                      {{
                        element.meta.title.indexOf('menu.') !== -1
                          ? $t(element.meta.title)
                          : element.meta.title
                      }}
                    </span>
                    <span v-else>
                      <a-badge class="pr-1.5" dot status="success" />
                      {{
                        element.meta.title.indexOf('menu.') !== -1
                          ? $t(element.meta.title)
                          : element.meta.title
                      }}
                    </span>
                    <icon-close
                      size="14"
                      @click.stop="closeTabItem(element)"
                      v-if="element.path !== baseHome"
                    />
                  </div>
                </template>
              </Draggable>
            </a-space>
            <template #content>
              <a-doption @click="reloadPage"><icon-refresh class="pr-0.5" />刷新当前</a-doption>
              <a-doption @click="removeTab(route)" :disabled="unref(isCurrent) || isDisabled"
                ><icon-close class="pr-0.5" />关闭当前</a-doption
              >
              <a-doption @click="closeOther(route)" :disabled="isDisabled"
                ><icon-oblique-line class="pr-0.5" />关闭其他</a-doption
              >
              <a-doption @click="closeAll" :disabled="isDisabled"
                ><icon-minus class="pr-0.5" />关闭全部</a-doption
              >
            </template>
          </a-dropdown>
        </div>
      </div>
      <div class="tabs-close">
        <a-dropdown>
          <div class="tabs-close-btn">
            <icon-down color="#515a6e" />
          </div>
          <template #content>
            <a-doption @click="reloadPage"><icon-refresh class="pr-0.5" />刷新当前</a-doption>
            <a-doption @click="removeTab(route)" :disabled="unref(isCurrent) || isDisabled"
              ><icon-close class="pr-0.5" />关闭当前</a-doption
            >
            <a-doption @click="closeOther(route)" :disabled="isDisabled"
              ><icon-oblique-line class="pr-0.5" />关闭其他</a-doption
            >
            <a-doption @click="closeAll" :disabled="isDisabled"
              ><icon-minus class="pr-0.5" />关闭全部</a-doption
            >
          </template>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import {
    computed,
    defineComponent,
    nextTick,
    onBeforeMount,
    onMounted,
    reactive,
    ref,
    toRefs,
    unref,
    UnwrapRef,
    watch,
  } from 'vue';
  import { RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router';
  import { PageEnum } from '@/enums/pageEnum';
  import { RouteItem } from '/#/config';
  import { Message } from '@arco-design/web-vue';
  import Draggable from 'vuedraggable';
  import { storage } from '@/utils/storage';
  import elementResizeDetectorMaker from 'element-resize-detector';
  import { emitter } from '@/utils/bus';
  import { useTabStore } from '@/store/modules/tabs';
  import { useUserStore } from '@/store/modules/users';
  import { useProjectSetting } from '@/hooks/setting/useProjectSetting';
  import { useSettingStore } from '@/store/modules/settings';

  export default defineComponent({
    name: 'TagsView',
    components: {
      Draggable,
    },
    props: {
      collapsed: {
        type: Boolean,
      },
    },
    setup(props) {
      const tabStore = useTabStore();
      const userStore = useUserStore();
      const settingStore = useSettingStore();
      const { getNavMode, getMenuSetting, getMultiTabsSetting } = useProjectSetting();
      const route = useRoute();
      const router = useRouter();
      const isCurrent = ref(false);
      const navScroll: any = ref(null);
      const navWrap: any = ref(null);
      const flex = ref(null);
      const theme = storage.get('theme') || 'dark';
      const baseHome = ref<string>();

      const state = reactive({
        activeKey: route.fullPath,
        scrollable: false,
        isMultiHeaderFixed: false,
        showDropdown: false,
        dropdownX: 0,
        dropdownY: 0,
        multiTabsSetting: getMultiTabsSetting,
      });

      //动态组装样式 菜单缩进
      const getChangeStyle = computed(() => {
        const { collapsed } = props;
        const navMode = unref(getNavMode);
        const { minMenuWidth, menuWidth }: any = unref(getMenuSetting);
        const { fixed }: any = unref(getMultiTabsSetting);
        let lenNum =
          navMode === 'horizontal' || !isMixMenuNoneSub.value
            ? '0px'
            : collapsed
            ? `${minMenuWidth}px`
            : `${menuWidth}px`;
        return {
          left: lenNum,
          width: `calc(100% - ${!fixed ? '0px' : lenNum})`,
        };
      });

      // 标签页列表
      const tabsList: any = computed(() => tabStore.getTabsList);
      const isDisabled = unref(tabsList).length <= 1;

      // 获取简易的路由对象
      const getSimpleRoute = (route: any): RouteItem => {
        const { fullPath, hash, meta, name, params, path, query } = route;
        return { fullPath, hash, meta, name, params, path, query };
      };

      const isMixMenuNoneSub = computed(() => {
        const mixMenu = settingStore.menuSetting.mixMenu;
        const currentRoute = useRoute();
        const navMode = unref(getNavMode);
        if (unref(navMode) != 'horizontal-mix') return true;
        return !(unref(navMode) === 'horizontal-mix' && mixMenu && currentRoute.meta.isRoot);
      });

      const whiteList: string[] = [PageEnum.BASE_LOGIN_NAME, PageEnum.REDIRECT_NAME];

      function handleContextMenu(e, item) {
        e.preventDefault();
        isCurrent.value = baseHome.value === item.path;
        state.showDropdown = false;
        nextTick().then(() => {
          state.showDropdown = true;
          state.dropdownX = e.clientX;
          state.dropdownY = e.clientY;
        });
      }

      // 移除缓存组件名称
      const delKeepAliveCompName = () => {
        if (route.meta.keepAlive) {
          const name = router.currentRoute.value.matched.find((item) => item.name == route.name)
            ?.components?.default.name;
          if (name) {
            // asyncRouteStore.keepAliveComponents = asyncRouteStore.keepAliveComponents.filter(
            //   (item) => item != name
            // );
          }
        }
      };

      // 刷新页面
      const reloadPage = () => {
        delKeepAliveCompName();
        router.push({
          path: '/redirect' + unref(route).fullPath,
        });
      };

      // 关闭其他
      const closeOther = (
        route: RouteItem | RouteLocationNormalizedLoaded | UnwrapRef<RouteLocationNormalizedLoaded>
      ) => {
        tabStore.setCloseOtherTabs(route);
        state.activeKey = route.fullPath;
        router.replace(route.fullPath);
        updateNavScroll();
      };

      // 关闭全部
      const closeAll = () => {
        localStorage.removeItem('routes');
        tabStore.setCloseAllTabs();
      };

      //删除tab
      function closeTabItem(e) {
        const { fullPath } = e;
        const routeInfo = tabsList.value.find((item) => item.fullPath == fullPath);
        removeTab(routeInfo);
      }

      // 关闭当前页面
      const removeTab = (
        route: RouteItem | RouteLocationNormalizedLoaded | UnwrapRef<RouteLocationNormalizedLoaded>
      ) => {
        if (tabsList.value.length === 1) {
          Message.warning('这已经是最后一页，不能再关闭了！');
          return;
        }
        delKeepAliveCompName();
        tabStore.setCloseCurrentTabs(route);
        // 如果关闭的是当前页
        if (state.activeKey === route.fullPath) {
          const currentRoute = tabsList.value[Math.max(0, tabsList.value.length - 1)];
          state.activeKey = currentRoute.fullPath;
          router.push(currentRoute);
        }
        updateNavScroll();
      };

      //tags 跳转页面
      function goPage(e: RouteItem) {
        const { fullPath } = e;
        if (fullPath === route.fullPath) return;
        state.activeKey = fullPath;
        router.push({ path: fullPath });
      }

      /**
       * @param value 要滚动到的位置
       * @param amplitude 每次滚动的长度
       */
      function scrollTo(value: number, amplitude: number): any {
        const currentScroll = navScroll.value.scrollLeft;
        const scrollWidth =
          (amplitude > 0 && currentScroll + amplitude >= value) ||
          (amplitude < 0 && currentScroll + amplitude <= value)
            ? value
            : currentScroll + amplitude;
        navScroll.value && navScroll.value.scrollTo(scrollWidth, 0);
        if (scrollWidth === value) return;
        return window.requestAnimationFrame(() => scrollTo(value, amplitude));
      }

      // 滚动 左
      function scrollPrev() {
        const containerWidth = navScroll.value.offsetWidth;
        const currentScroll = navScroll.value.scrollLeft;

        if (!currentScroll) return;
        const scrollLeft = currentScroll > containerWidth ? currentScroll - containerWidth : 0;
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

      /**
       * @param autoScroll 是否开启自动滚动功能
       */
      async function updateNavScroll(autoScroll?: boolean) {
        await nextTick();
        if (!navScroll.value) return;
        const containerWidth = navScroll.value.offsetWidth;
        const navWidth = navScroll.value.scrollWidth;

        if (containerWidth < navWidth) {
          state.scrollable = true;
          if (autoScroll) {
            let tagList = navScroll.value.querySelectorAll('.tabs-card-scroll-item') || [];
            [...tagList].forEach((tag: HTMLElement) => {
              // fix SyntaxError
              if (tag.id === `tag${state.activeKey.split('/').join('\/')}`) {
                tag.scrollIntoView && tag.scrollIntoView();
              }
            });
          }
        } else {
          state.scrollable = false;
        }
      }

      function handleResize() {
        updateNavScroll(true);
      }

      watch(
        () => route.fullPath,
        (to) => {
          if (whiteList.includes(route.name as string)) return;
          state.activeKey = to;
          tabStore.setAddTabs(getSimpleRoute(route));
          updateNavScroll(true);
        },
        { immediate: true }
      );

      onMounted(() => {
        onElementResize();

        emitter.on('closeAllPage', () => {
          closeAll();
        });
      });

      onBeforeMount(() => {
        setTimeout(() => {
          const userInfo = userStore.getUser.authority;
          baseHome.value = userInfo?.defaultRouter;
          // store_bak.commit(MutationType.SET_INIT_TABS, [baseHome.value]);
        }, 10);
      });

      function onElementResize() {
        let observer;
        observer = elementResizeDetectorMaker();
        observer.listenTo(navWrap.value, handleResize);
      }

      return {
        ...toRefs(state),
        baseHome,
        tabsList,
        isDisabled,
        flex,
        navScroll,
        navWrap,
        isCurrent,
        route,
        unref,

        goPage,
        removeTab,
        closeTabItem,
        handleContextMenu,
        reloadPage,
        closeOther,
        closeAll,
        scrollPrev,
        scrollNext,
        theme,
        updateNavScroll,
        getChangeStyle,
      };
    },
  });
</script>

<style lang="less" scoped>
  @import 'styles/index.module.less';
</style>
