<template>
  <div class="flex-center flex-wrap gap-x-32px gap-y-16px">
    <div
      v-for="item in menuTypeListEnum"
      :key="item.mode"
      class="flex cursor-pointer border-2px border-solid rounded-6px hover:border-[rgba(var(--primary-6))]"
      :class="[
        def === item.mode
          ? 'border-[rgba(var(--primary-6))]'
          : 'border-transparent',
      ]"
      @click="handleChangeMode(item)"
    >
      <ATooltip :position="item.position" :content="$t(item.title)">
        <div
          class="h-64px w-96px gap-6px rd-4px p-6px shadow dark:shadow-coolGray-5"
          :class="[
            item.mode.includes(MenuModeEnum.VERTICAL) ? 'flex' : 'flex-col',
          ]"
        >
          <slot :name="item.mode"></slot>
        </div>
      </ATooltip>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { MenuModeEnum, MenuTypeEnum } from '@/enums';
  import { HandlerEnum } from '@/layout/common/setting-drawer/components/common';
  import { baseHandler } from '@/layout/common/setting-drawer/components/common/helpers';

  defineOptions({
    name: 'LayoutModeCard',
  });

  interface Props {
    /**
     * @description Modification event called - [调用的修改事件]
     */
    event: HandlerEnum;
    /**
     * @description Layout mode - [布局方式]
     */
    def: MenuModeEnum;
    /**
     * @description Whether to disable - [是否禁用]
     */
    disabled?: boolean;
  }

  const props = defineProps<Props>();

  interface MenuTypeItem {
    title: string;
    mode: MenuModeEnum;
    type: MenuTypeEnum;
    position: 'top' | 'bottom';
  }

  const menuTypeListEnum: MenuTypeItem[] = [
    {
      title: 'layout.setting.layoutMode.menuTypeSidebar',
      mode: MenuModeEnum.VERTICAL,
      type: MenuTypeEnum.SIDEBAR,
      position: 'bottom',
    },
    {
      title: 'layout.setting.layoutMode.menuTypeMixSidebar',
      mode: MenuModeEnum.VERTICAL_MIX,
      type: MenuTypeEnum.MIX_SIDEBAR,
      position: 'bottom',
    },
    {
      title: 'layout.setting.layoutMode.menuTypeTopMenu',
      mode: MenuModeEnum.HORIZONTAL,
      type: MenuTypeEnum.TOP_MENU,
      position: 'bottom',
    },
    {
      title: 'layout.setting.layoutMode.menuTypeMixTopMenu',
      mode: MenuModeEnum.HORIZONTAL_MIX,
      type: MenuTypeEnum.MIX_TOP_MENU,
      position: 'bottom',
    },
  ];

  function handleChangeMode(mode: MenuTypeItem) {
    if (props.disabled) return;
    baseHandler(props.event, mode.mode);
  }
</script>

<style lang="less" scoped></style>
