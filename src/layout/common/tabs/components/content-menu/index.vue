<template>
  <div ref="containerRef">
    <slot></slot>

    <Teleport to="body">
      <Transition
        @before-enter="handleBeforeEnter"
        @enter="handleEnter"
        @after-enter="handleAfterEnter"
      >
        <div
          v-if="visible"
          class="absolute overflow-hidden arco-dropdown"
          :style="popupStyle"
        >
          <div
            v-for="item in getOptions"
            :key="item.event"
            @click="handleClick(item.event, item.disabled)"
          >
            <ADoption :value="item.event" :disabled="item.disabled">
              {{ item.label }}
              <template #icon>
                <SvgIcon :icon="item.icon"></SvgIcon>
              </template>
            </ADoption>
            <ADivider v-if="item.divider" class="!m-0"></ADivider>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
  import { computed, Ref, ref, unref } from 'vue';
  import { useI18n } from '@/hooks/web/useI18n';
  import { SvgIcon } from '@/components/Icon';
  import { useRouter } from 'vue-router';
  import { useMultipleTabWithOutStore } from '@/store/modules/multipleTab';
  import { useTabs } from '@/hooks/web/useTabs';
  import { App } from '~/types/app';
  import { getTabRouteByVueRoute } from '@/store/modules/multipleTab/helpers';
  import { DropOption, TabEventEnum } from './types';
  import { useContextMenu } from './helper';

  const { t } = useI18n();

  interface Props {
    /**
     * 当前选中的菜单fullPath
     * Currently selected menu full Path
     */
    activeKey: string;

    /**
     * 当前选中的tab
     * Currently selected tab
     */
    tabItem: App.Tab;
    /**
     * 是否是功能区的
     * Is it from the functional area?
     */
    isExtra?: boolean;
    /**
     * 定位位置
     * Positioning
     */
    position?: 'bl' | 'br';

    /**
     * 触发方式
     * Trigger
     */
    trigger?: 'click' | 'contextMenu';
  }

  const props = withDefaults(defineProps<Props>(), {
    position: 'bl',
    trigger: 'contextMenu',
  });

  const containerRef = ref<HTMLElement>();

  const { popupStyle, visible } = useContextMenu(
    containerRef as Ref<HTMLElement>,
    props.trigger,
    props.position,
  );

  const { currentRoute } = useRouter();
  const tabStore = useMultipleTabWithOutStore();

  const { refreshPage, closeAll, close, closeLeft, closeOther, closeRight } =
    useTabs();

  // 获取当前要操作的tab
  const getTargetTab = computed((): App.Tab => {
    return unref(!props.isExtra)
      ? unref(props.tabItem)
      : getTabRouteByVueRoute(unref(currentRoute));
  });

  const getOptions = computed(() => {
    const { meta } = unref(getTargetTab);

    const isCurItem = props.tabItem
      ? props.tabItem.fullPath === unref(currentRoute).fullPath
      : false;

    // Refresh button
    const tabIndex = tabStore.getTabList.findIndex(
      (tab) => tab.fullPath === props.tabItem.fullPath,
    );
    const refreshDisabled = !isCurItem;

    // Close left
    const closeLeftDisabled = unref(tabIndex) === 0 || !isCurItem;
    const disabled = tabStore.getTabList.length === 1;

    // Close right
    const closeRightDisabled =
      !isCurItem ||
      (unref(tabIndex) === tabStore.getTabList.length - 1 &&
        tabStore.getLastDragEndIndex >= 0);

    const options: DropOption[] = [
      {
        icon: 'ion:reload-sharp',
        event: TabEventEnum.REFRESH_PAGE,
        label: t('layout.multipleTab.reload'),
        disabled: refreshDisabled,
      },
      {
        icon: 'clarity:close-line',
        event: TabEventEnum.CLOSE_CURRENT,
        label: t('layout.multipleTab.close'),
        disabled: !!meta?.affix || disabled,
        divider: true,
      },
      {
        icon: 'line-md:arrow-close-left',
        event: TabEventEnum.CLOSE_LEFT,
        label: t('layout.multipleTab.closeLeft'),
        disabled: unref(closeLeftDisabled),
      },
      {
        icon: 'line-md:arrow-close-right',
        event: TabEventEnum.CLOSE_RIGHT,
        label: t('layout.multipleTab.closeRight'),
        disabled: closeRightDisabled,
        divider: true,
      },
      {
        icon: 'dashicons:align-center',
        event: TabEventEnum.CLOSE_OTHER,
        label: t('layout.multipleTab.closeOther'),
        disabled: disabled || !isCurItem,
      },
      {
        icon: 'clarity:minus-line',
        event: TabEventEnum.CLOSE_ALL,
        label: t('layout.multipleTab.closeAll'),
        disabled,
      },
    ];

    return options;
  });

  // 菜单的点击事件
  function handleClick(event: TabEventEnum, disabled: boolean | undefined) {
    if (disabled) return;
    // 选中菜单后关闭菜单
    visible.value = false;

    switch (event) {
      case TabEventEnum.REFRESH_PAGE:
        // refresh page
        refreshPage();
        break;
      // Close current
      case TabEventEnum.CLOSE_CURRENT:
        close(props.tabItem);
        break;
      // Close left
      case TabEventEnum.CLOSE_LEFT:
        closeLeft();
        break;
      // Close right
      case TabEventEnum.CLOSE_RIGHT:
        closeRight();
        break;
      // Close other
      case TabEventEnum.CLOSE_OTHER:
        closeOther();
        break;
      // Close all
      case TabEventEnum.CLOSE_ALL:
        closeAll();
        break;
      default:
        break;
    }
  }

  function handleBeforeEnter(el: any) {
    el.style.height = 0;
  }

  function handleEnter(el: any) {
    el.style.height = 'auto';
    const h = el.clientHeight;
    el.style.height = 0;
    requestAnimationFrame(() => {
      el.style.transition = '.3s';
      el.style.height = `${h}px`;
    });
  }

  function handleAfterEnter(el: any) {
    el.style.transition = 'none';
  }
</script>

<style lang="less" scoped></style>
