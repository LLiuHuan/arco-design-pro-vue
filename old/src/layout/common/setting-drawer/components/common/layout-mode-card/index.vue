<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2024-05-13 22:31:00
 * @LastEditTime: 2024-08-21 14:53:44
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
  import { MenuModeEnum } from '@/enums';
  import { useI18n } from '@/hooks/web/useI18n';
  import { baseHandler, HandlerEnum } from '../helpers';

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

  interface MenuTypeItem {
    title: string;
    mode: MenuModeEnum;
    position: 'top' | 'bottom';
  }

  defineOptions({
    name: 'LayoutModeCard',
  });

  const props = defineProps<Props>();

  const { t } = useI18n();

  const menuTypeListEnum: MenuTypeItem[] = [
    {
      title: 'layout.setting.layout.mode.menuTypeSidebar',
      mode: MenuModeEnum.VERTICAL,
      position: 'bottom',
    },
    {
      title: 'layout.setting.layout.mode.menuTypeMixSidebar',
      mode: MenuModeEnum.VERTICAL_MIX,
      position: 'bottom',
    },
    {
      title: 'layout.setting.layout.mode.menuTypeTopMenu',
      mode: MenuModeEnum.HORIZONTAL,
      position: 'bottom',
    },
    {
      title: 'layout.setting.layout.mode.menuTypeMixTopMenu',
      mode: MenuModeEnum.HORIZONTAL_MIX,
      position: 'bottom',
    },
  ];

  function handleChangeMode(mode: MenuTypeItem) {
    if (props.disabled) return;
    baseHandler(props.event, mode.mode);
  }
</script>

<template>
  <div class="flex-center flex-wrap gap-x-32px gap-y-16px">
    <div
      v-for="item in menuTypeListEnum"
      :key="item.mode"
      :class="[
        def === item.mode
          ? 'border-[rgba(var(--primary-6))]'
          : 'border-transparent',
      ]"
      class="flex cursor-pointer border-2px border-solid rounded-6px hover:border-[rgba(var(--primary-6))]"
      @click="handleChangeMode(item)"
    >
      <ATooltip :content="t(item.title)" :position="item.position">
        <div
          :class="[
            item.mode.includes(MenuModeEnum.VERTICAL) ? 'flex' : 'flex-col',
          ]"
          class="h-64px w-96px gap-6px rd-4px p-6px shadow-sm dark:shadow-coolGray-5"
        >
          <slot :name="item.mode"></slot>
        </div>
      </ATooltip>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
