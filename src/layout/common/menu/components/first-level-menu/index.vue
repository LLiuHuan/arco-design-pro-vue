<template>
  <DefineMixMenuItem v-slot="{ label, icon, active, isCollapsed }">
    <div
      :class="[
        {
          darkDefaultItem: dark,
          darkActiveItem: active && dark,
        },
        active ? 'activeItem' : 'defaultItem',
        isCollapsed ? 'py-8px' : 'py-10px',
      ]"
      class="flex-col-center cursor-pointer bg-transparent px-4px"
    >
      <component
        :is="icon"
        :class="[isCollapsed ? 'text-16px mb-0' : 'text-20px mb-8px']"
        class="h-20px transition-base"
      />
      <p
        :class="[isCollapsed ? 'h-0 pt-0 hidden' : 'h-24px pt-4px']"
        class="m-0 text-12px"
      >
        {{ label }}
      </p>
    </div>
  </DefineMixMenuItem>

  <div class="h-full flex-col-stretch flex-1-hidden">
    <slot />

    <AScrollbar
      class="h-full overflow-y-auto"
      outer-class="h-full flex-1-hidden"
    >
      <MixMenuItem
        v-for="item in menus"
        :key="item.key"
        :active="item.key === activeMenuKey"
        :icon="item.icon"
        :is-collapsed="getCollapsed"
        :label="item.label"
        v-bind="getItemEvents(item)"
      />
    </AScrollbar>

    <LayoutTrigger
      v-if="isTrigger && getTrigger === 'FOOTER'"
      :style="{ height: `${getFooterHeight + 1}px` }"
      class="cursor-pointer bg-[var(--color-bg-2)] border-t-1 border-t-solid border-t-[var(--color-fill-2)]"
    />
  </div>
</template>

<script lang="ts" setup>
  import { createReusableTemplate } from '@vueuse/core';
  import { LayoutTrigger } from '@/layout/common';
  import { MixSidebarTriggerEnum } from '@/enums';
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
    /**
     * 是否深色模式
     * Whether dark mode
     */
    dark?: boolean;
  }

  defineProps<Props>();

  interface Emits {
    (e: 'select', menu: App.Menu, hover: boolean): boolean;
  }

  const emit = defineEmits<Emits>();

  interface MixMenuItemProps {
    /**
     * 菜单项标签
     * Menu item label
     */
    label: App.Menu['label'];
    /**
     * 菜单项图标
     * Menu item icon
     */
    icon: App.Menu['icon'];
    /**
     * 是否激活菜单项
     * Whether the menu item is active
     */
    active: boolean;
    /**
     * 是否折叠
     * Whether to collapse
     */
    isCollapsed?: boolean;
  }

  const [DefineMixMenuItem, MixMenuItem] =
    createReusableTemplate<MixMenuItemProps>();

  const { menus } = useRouteStore();
  const { goKey } = useGo();
  const {
    getCollapsed,
    getMixSideTrigger,
    isVerticalMix,
    getTrigger,
    isTrigger,
  } = useMenuSetting();
  const { getFooterHeight } = useFooterSetting();

  const handleMixMenuClick = (item: App.Menu, hover: boolean = false) => {
    emit('select', item, hover);
  };

  // 获取菜单项事件
  // Get menu item events
  const getItemEvents = (item: App.Menu) => {
    if (
      unref(isVerticalMix) &&
      unref(getMixSideTrigger) === MixSidebarTriggerEnum.HOVER
    ) {
      return {
        onMouseenter: () => handleMixMenuClick(item, true),
        onClick: () => {
          if (item.routeKey && (!item.children || item.children.length === 0)) {
            goKey(item.routeKey);
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
    position: relative;
    font-weight: 700;
    color: rgba(var(--primary-6), 1);
    background-color: var(--color-neutral-2);
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

  .darkActiveItem {
    color: rgba(var(--primary-6), 1) !important;
    background-color: var(--color-menu-dark-hover) !important;
  }

  .darkDefaultItem {
    color: var(--color-text-4);
  }
</style>
