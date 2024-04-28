<template>
  <DefineMixMenuItem v-slot="{ label, icon, active, isCollapsed }">
    <div
      class="flex-col-center cursor-pointer bg-transparent px-4px hover:bg-[var(--color-neutral-2)]"
      :class="[
        active ? 'activeItem' : 'defaultItem',
        isCollapsed ? 'py-8px' : 'py-10px',
      ]"
    >
      <component
        :is="icon"
        class="h-20px transition-base"
        :class="[isCollapsed ? 'text-16px mb-0' : 'text-20px mb-8px']"
      />
      <p
        class="m-0 text-12px"
        :class="[isCollapsed ? 'h-0 pt-0 hidden' : 'h-24px pt-4px']"
      >
        {{ label }}
      </p>
    </div>
  </DefineMixMenuItem>

  <div class="h-full flex-col-stretch flex-1-hidden">
    <slot />

    <AScrollbar
      outer-class="h-full flex-1-hidden"
      class="h-full overflow-y-auto"
    >
      <MixMenuItem
        v-for="item in getMenus"
        :key="item.routeName"
        :label="item.meta.i18nTitle ? $t(item.meta.i18nTitle) : item.meta.title"
        :icon="item.icon"
        :active="activeMenuKey === item.routeName"
        :is-collapsed="getCollapsed"
        v-bind="getItemEvents(item)"
      />
    </AScrollbar>

    <LayoutTrigger
      class="cursor-pointer bg-[var(--color-bg-2)] border-t-1 border-t-solid border-t-[var(--color-fill-2)]"
      :style="{ height: `${getFooterHeight + 1}px` }"
    />
  </div>
</template>

<script lang="ts" setup>
  import { createReusableTemplate } from '@vueuse/core';
  import { LayoutTrigger } from '@/layout/common';
  import { MixSidebarTriggerEnum } from '@/enums';
  import type { App } from '~/types/app';
  import { useFooterSetting, useMenuSetting } from '@/hooks/setting';
  import { unref } from 'vue';
  import { useGo } from '@/hooks/web/usePage';
  import { useRouteStore } from '@/store/modules/route';

  interface Props {
    /**
     * 激活菜单key
     * Active menu key
     */
    activeMenuKey: string;
  }

  defineProps<Props>();

  interface Emits {
    (e: 'select', menu: App.Menu, hover: boolean): boolean;
  }

  const emit = defineEmits<Emits>();

  interface MixMenuItemProps {
    /** Menu item label */
    label: any;
    /** Menu item icon */
    icon: any;
    /** Active menu item */
    active: boolean;
    /** Mini size */
    isCollapsed: boolean;
  }
  const [DefineMixMenuItem, MixMenuItem] =
    createReusableTemplate<MixMenuItemProps>();

  const { getMenus } = useRouteStore();
  const { goKey } = useGo();
  const { getCollapsed, getMixSideTrigger, getIsMixSidebar } = useMenuSetting();
  const { getFooterHeight } = useFooterSetting();

  const handleMixMenuClick = (item: App.Menu, hover: boolean = false) => {
    emit('select', item, hover);
  };

  // 获取菜单项事件
  // Get menu item events
  const getItemEvents = (item: App.Menu) => {
    if (
      unref(getIsMixSidebar) &&
      unref(getMixSideTrigger) === MixSidebarTriggerEnum.HOVER
    ) {
      return {
        onMouseenter: () => handleMixMenuClick(item, true),
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
      onClick: () => handleMixMenuClick(item),
    };
  };
</script>

<style scoped>
  .activeItem {
    background-color: var(--color-neutral-2);
    position: relative;
    font-weight: 700;
    color: rgba(var(--primary-6), 1) !important;
  }
  .activeItem:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 3px;
    height: 100%;
    background-color: rgba(var(--primary-6), 1);
  }

  .defaultItem {
    color: var(--color-text-1);
  }
</style>
