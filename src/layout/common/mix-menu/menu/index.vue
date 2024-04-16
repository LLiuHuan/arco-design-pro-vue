<template>
  <div
    v-click-outside="handleClickOutside"
    class="h-full flex-auto flex-col transition-base bg-[var(--color-bg-2)]"
    v-bind="getMenuEvents"
  >
    <slot name="logo" />
    <div
      :style="{
        height: `calc(100% - ${getHeaderHeight}px - ${getFooterHeight}px)`,
      }"
    >
      <AScrollbar
        outer-class="h-full"
        class="h-full overflow-y-auto"
        :outer-style="{ borderRight: openMenu ? '1px solid #eeeeee' : '' }"
      >
        <ul class="relative pt-1px flex-auto overflow-y-auto">
          <li
            v-for="item in menus"
            :key="item.routeName"
            class="relative text-center cursor-pointer hover:bg-[var(--color-neutral-2)]"
            :class="{ activeItem: activeName === item.routeName }"
            :style="{ padding: getCollapsed ? '8px 0' : '12px 0' }"
            v-bind="getItemEvents(item)"
          >
            <div
              v-if="item.icon"
              class="h-20px transition-base"
              :style="{
                fontSize: getCollapsed ? '16px' : '20px',
                marginBottom: getCollapsed ? '0' : '8px',
                color:
                  activeName === item.routeName
                    ? 'rgba(var(--primary-6), 1)'
                    : 'var(--color-text-1)',
              }"
            >
              <component :is="item.icon" />
            </div>
            <p
              class="m-0 text-12px"
              :style="{
                display: getCollapsed ? 'none' : '',
                color:
                  activeName === item.routeName
                    ? 'rgba(var(--primary-6), 1)'
                    : 'var(--color-text-1)',
              }"
            >
              {{
                item.meta.i18nTitle ? $t(item.meta.i18nTitle) : item.meta.title
              }}
            </p>
          </li>
        </ul>
      </AScrollbar>
    </div>

    <slot name="trigger" />

    <LayoutMixMenuDrawer
      :menus="childrenMenus"
      :visible="openMenu"
      :fixed="getIsFixed"
    />
  </div>
</template>

<script lang="ts" setup>
  import { AppEnum, MixSidebarTriggerEnum } from '@/enums';
  import type { App } from '~/types/app';
  import { computed, ref, unref } from 'vue';
  import { useGo } from '@/hooks/web/usePage';
  import {
    getActiveKeyPathsOfMenus,
    listenerRouteChange,
  } from '@/utils/router';
  import {
    useFooterSetting,
    useHeaderSetting,
    useMenuSetting,
  } from '@/hooks/setting';
  import { RouteLocationNormalized } from 'vue-router';
  import vClickOutside from '@/directives/clickOutside';
  import LayoutMixMenuDrawer from '../drawer/index.vue';

  interface Props {
    /**
     * The theme of the current parent component - [当前父组件的主题]
     */
    theme?: AppEnum;
    /**
     * Menu data -[菜单数据]
     */
    menus: App.Menu[];
  }

  const props = withDefaults(defineProps<Props>(), {
    theme: AppEnum.LIGHT,
  });

  const emit = defineEmits(['update:isFixed']);

  const activeName = ref('');
  const openMenu = ref(false);
  const childrenMenus = ref<App.Menu[]>([]);
  const { goKey } = useGo();
  const {
    getCollapsed,
    getIsMixSidebar,
    getMixSideFixed,
    getMixSideTrigger,
    getCloseMixSidebarOnChange,
  } = useMenuSetting();
  const { getHeaderHeight } = useHeaderSetting();
  const { getFooterHeight } = useFooterSetting();
  const currentRoute = ref<RouteLocationNormalized | null>(null);

  const mixSideHasChildren = ref(false);

  // 获取是否固定
  // Get whether it is fixed
  const getIsFixed = computed(() => {
    /* eslint-disable-next-line */
    mixSideHasChildren.value = unref(childrenMenus).length > 0;
    const isFixed = unref(getMixSideFixed) && unref(mixSideHasChildren);
    if (isFixed) {
      /* eslint-disable-next-line */
      openMenu.value = true;
    }
    emit('update:isFixed', isFixed);
    return isFixed;
  });

  // 关闭子菜单
  // Turn off the sub -menu
  const closeMenu = () => {
    if (!unref(getIsFixed)) {
      openMenu.value = false;
    }
  };

  // 设置当前活动菜单和子菜单
  // Set the currently active menu and submenu
  const setActive = async (setChildren = false) => {
    const activeKey = (unref(currentRoute)?.meta?.currentActiveMenu ||
      unref(currentRoute)?.name) as string;
    const activeKeys = getActiveKeyPathsOfMenus(activeKey, props.menus);
    if (!activeKeys) return;
    activeName.value = activeKeys ? activeKeys[0] : '';
    if (unref(getIsMixSidebar)) {
      const activeMenu = unref(props.menus).find(
        (item) => item.routeName === unref(activeName),
      );
      if (activeMenu?.children) {
        if (setChildren) {
          childrenMenus.value = activeMenu?.children;

          if (unref(getMixSideFixed)) {
            openMenu.value = activeMenu?.children.length > 0;
          }
        }
        if (activeMenu?.children.length === 0) {
          childrenMenus.value = [];
        }
      }
    }
  };

  // 处理菜单点击
  // Handle menu click
  const handleMixMenuClick = (
    routeName: AuthRoute.RouteKey,
    children: App.Menu[] | undefined,
    hover: boolean = false,
  ) => {
    if (unref(activeName) === routeName) {
      if (!hover) {
        if (!unref(openMenu)) {
          openMenu.value = true;
        } else {
          closeMenu();
          // emit('menuItemClick', routeName);
        }
      } else if (!unref(openMenu)) {
        openMenu.value = true;
      }

      if (!unref(openMenu)) {
        setActive();
      }
    } else {
      openMenu.value = true;
      activeName.value = routeName;
    }

    if (!children || children.length === 0) {
      if (!hover) goKey(routeName);
      childrenMenus.value = [];
      closeMenu();
      return;
    }

    childrenMenus.value = children;
  };

  // 监听路由变化
  // Listen for route changes
  listenerRouteChange((route) => {
    currentRoute.value = route;
    setActive(true);
    if (unref(getCloseMixSidebarOnChange)) {
      closeMenu();
    }
  });

  // 点击外部
  // Click outside
  const handleClickOutside = () => {
    setActive(true);
    closeMenu();
  };

  // 获取菜单项事件
  // Get menu item events
  const getItemEvents = (item: App.Menu) => {
    if (unref(getMixSideTrigger) === MixSidebarTriggerEnum.HOVER) {
      return {
        onMouseenter: () =>
          handleMixMenuClick(item.routeName, item.children, true),
        onClick: () => {
          if (
            item.routeName &&
            (!item.children || item.children.length === 0)
          ) {
            goKey(item.routeName);
          }
        },
      };
    }
    return {
      onClick: () => handleMixMenuClick(item.routeName, item.children),
    };
  };

  // 获取菜单事件
  // Get menu events
  const getMenuEvents = computed(() => {
    return !unref(getMixSideFixed)
      ? {
          onMouseleave: () => {
            setActive(true);
            closeMenu();
          },
        }
      : {};
  });
</script>

<style lang="less" scoped>
  .activeItem {
    background-color: rgba(var(--primary-1), 0.3);
    position: relative;
    font-weight: 700;
  }
  .activeItem:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 4px;
    height: 100%;
    background-color: rgba(var(--primary-6), 1);
  }

  :deep(.arco-menu-inner) {
    padding: 0;
  }
</style>
