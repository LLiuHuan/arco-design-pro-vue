<template>
  <div
    class="tabs-view"
    :class="{
      'tabs-view-fixed-header': isMultiHeaderFixed,
      'tabs-view-default-background': theme === 'light',
      'tabs-view-dark-background': theme === 'dark',
    }"
  >
    <div class="tabs-view-main">
      <div class="tabs-card">
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
                    <span v-if="activeKey !== element.path">{{ element.meta.title }}</span>
                    <span v-else
                      ><a-badge class="pr-1.5" dot status="success" />{{ element.meta.title }}</span
                    >
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
  import { computed, defineComponent, nextTick, reactive, ref, toRefs, unref, watch } from 'vue';
  import { useStore } from 'vuex';
  import { RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router';
  import { PageEnum } from '@/enums/pageEnum';
  import { RouteItem } from '/#/config';
  import { MutationType } from '@/store/modules/tabs/mutations';
  import { Message } from '@arco-design/web-vue';
  import Draggable from 'vuedraggable';
  import { storage } from '@/utils/storage';
  export default defineComponent({
    name: 'TagsView',
    components: {
      Draggable,
    },
    setup() {
      const store = useStore();
      const route = useRoute();
      const router = useRouter();
      const isCurrent = ref(false);
      const navScroll: any = ref(null);
      const flex = ref(null);
      const theme = storage.get('theme') || 'dark';
      const state = reactive({
        activeKey: route.fullPath,
        scrollable: false,
        isMultiHeaderFixed: false,
        baseHome: PageEnum.BASE_HOME,
        showDropdown: false,
        dropdownX: 0,
        dropdownY: 0,
      });

      // 标签页列表
      const tabsList: any = computed(() => store.getters.getTabsList);
      const isDisabled = unref(tabsList).length <= 1;

      // 获取简易的路由对象
      const getSimpleRoute = (route: any): RouteItem => {
        const { fullPath, hash, meta, name, params, path, query } = route;
        return { fullPath, hash, meta, name, params, path, query };
      };

      const whiteList: string[] = [PageEnum.BASE_LOGIN_NAME, PageEnum.REDIRECT_NAME];

      function handleContextMenu(e, item) {
        e.preventDefault();
        isCurrent.value = PageEnum.BASE_HOME_REDIRECT === item.path;
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
      const closeOther = (route: RouteItem | RouteLocationNormalizedLoaded) => {
        store.commit(MutationType.SET_CLOSE_OTHER_TABS, route);
        state.activeKey = route.fullPath;
        router.replace(route.fullPath);
        // updateNavScroll();
      };

      // 关闭全部
      const closeAll = () => {
        localStorage.removeItem('routes');
        store.commit(MutationType.SET_CLOSE_ALL_TABS, route);
        router.replace(PageEnum.BASE_HOME);
        // updateNavScroll();
      };

      //删除tab
      function closeTabItem(e) {
        const { fullPath } = e;
        const routeInfo = tabsList.value.find((item) => item.fullPath == fullPath);
        removeTab(routeInfo);
      }

      // 关闭当前页面
      const removeTab = (route: RouteItem | RouteLocationNormalizedLoaded) => {
        console.log(tabsList);
        if (tabsList.value.length === 1) {
          Message.warning('这已经是最后一页，不能再关闭了！');
          return;
        }
        delKeepAliveCompName();
        store.commit(MutationType.SET_CLOSE_CURRENT_TABS, route);
        // 如果关闭的是当前页
        if (state.activeKey === route.fullPath) {
          const currentRoute = tabsList.value[Math.max(0, tabsList.value.length - 1)];
          state.activeKey = currentRoute.fullPath;
          router.push(currentRoute);
        }
        // updateNavScroll();
      };

      //tags 跳转页面
      function goPage(e: RouteItem) {
        const { fullPath } = e;
        if (fullPath === route.fullPath) return;
        state.activeKey = fullPath;
        router.push({ path: fullPath });
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

      watch(
        () => route.fullPath,
        (to) => {
          if (whiteList.includes(route.name as string)) return;
          state.activeKey = to;
          // console.log(getSimpleRoute(route));
          // console.log(tabsList);
          store.commit(MutationType.SET_ADD_TABS, getSimpleRoute(route));
          // updateNavScroll(true);
        },
        { immediate: true }
      );
      return {
        ...toRefs(state),
        tabsList,
        isDisabled,
        flex,
        navScroll,
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
      };
    },
  });
</script>

<style lang="less" scoped>
  .tabs-view {
    width: 100%;
    padding: 6px 0;
    display: flex;
    transition: all 0.2s ease-in-out;

    &-main {
      height: 32px;
      display: flex;
      max-width: 100%;
      min-width: 100%;

      .tabs-card {
        -webkit-box-flex: 1;
        flex-grow: 1;
        flex-shrink: 1;
        overflow: hidden;
        position: relative;

        .tabs-card-prev,
        .tabs-card-next {
          width: 32px;
          text-align: center;
          position: absolute;
          line-height: 32px;
          cursor: pointer;

          svg {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 32px;
            width: 32px;
          }
        }

        .tabs-card-prev {
          left: 0;
        }

        .tabs-card-next {
          right: 0;
        }

        .tabs-card-next-hide,
        .tabs-card-prev-hide {
          display: none;
        }

        &-scroll {
          white-space: nowrap;
          overflow: hidden;

          &-item {
            background: var(--color-bg-1);
            color: var(--text-color);
            height: 32px;
            padding: 6px 16px 4px;
            border-radius: 3px;
            margin-right: 6px;
            cursor: pointer;
            display: inline-block;
            position: relative;
            flex: 0 0 auto;

            span {
              float: left;
              vertical-align: middle;
            }

            &:hover {
              color: #515a6e;
            }

            &:hover {
              color: #515a6e !important;
            }

            svg {
              margin-left: 8px;
              display: inline-block;
            }
          }

          //.active-item {
          //  color: v-bind(getAppTheme);
          //}
        }
      }
      .tabs-card-scrollable {
        padding: 0 32px;
        overflow: hidden;
      }
    }

    .tabs-close {
      min-width: 32px;
      width: 32px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      background: var(--color);
      border-radius: 2px;
      cursor: pointer;
      background-color: var(--color-bg-2);
      //margin-right: 10px;

      &-btn {
        color: var(--color);
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  //.tabs-view-default-background {
  //  background: #f5f7f9;
  //}
  //
  //.tabs-view-dark-background {
  //  background: #101014;
  //}

  .tabs-view-fix {
    position: fixed;
    z-index: 5;
    padding: 6px 19px 6px 10px;
    left: 200px;
  }

  .tabs-view-fixed-header {
    top: 0;
  }
</style>
