import { computed, nextTick, onMounted, Ref, unref } from 'vue';
import { useDebounceFn } from '@vueuse/core';
import { useMenuSetting } from '@/hooks/setting';
import { useAppStore } from '@/store/modules/app';

/**
 * @description Handle menu drag and drop related operations - [处理菜单拖放相关操作]
 * @param siderRef - [侧边栏引用]
 * @param dragBarRef - [拖动条引用]
 * @param mix - [是否混合模式]
 */
export function useDragLine(
  siderRef: Ref<any>,
  dragBarRef: Ref<any>,
  mix = false,
) {
  const { getCollapsed, setMenuSetting } = useMenuSetting();

  function getEl(elRef: Ref<ElRef | ComponentRef>): any {
    const el = unref(elRef);
    if (!el) return null;
    if (Reflect.has(el, '$el')) {
      return (unref(elRef) as ComponentRef)?.$el;
    }
    return unref(elRef);
  }

  function handleMouseMove(
    ele: HTMLElement,
    wrap: HTMLElement,
    clientX: number,
  ) {
    document.onmousemove = (innerE) => {
      let iT = (ele as any).left + (innerE.clientX - clientX);
      innerE = innerE || Event;
      // TODO: 最大值应该动态获取
      const maxT = 800;
      // TODO: 'getMiniWidthNumber' is not defined.
      const minT = 48;
      if (iT < 0) iT = 0;
      if (iT > maxT) iT = maxT;
      if (iT < minT) iT = minT;
      ele.style.left = `${iT}px`;
      wrap.style.width = `${iT}px`;
      return false;
    };
  }

  // Drag and drop in the menu area-release the mouse
  function removeMouseup(ele: any) {
    const wrap = getEl(siderRef);
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
      wrap.style.transition = 'width 0.2s';
      const width = parseInt(wrap.style.width, 10);

      if (!mix) {
        // TODO: 'getMiniWidthNumber' is not defined.
        const miniWidth = 48;
        if (!unref(getCollapsed)) {
          if (width > miniWidth + 20) {
            setMenuSetting({ menuWidth: width });
          } else {
            setMenuSetting({ collapsed: true });
          }
        } else if (width > miniWidth) {
          setMenuSetting({ collapsed: false, menuWidth: width });
        }
      } else {
        setMenuSetting({ menuWidth: width });
      }

      ele.releaseCapture?.();
    };
  }

  function changeWrapWidth() {
    const ele = getEl(dragBarRef);
    if (!ele) return;
    const wrap = getEl(siderRef);
    if (!wrap) return;

    ele.onmousedown = (e: any) => {
      wrap.style.transition = 'unset';
      const clientX = e?.clientX;
      ele.left = ele.offsetLeft;
      handleMouseMove(ele, wrap, clientX);
      removeMouseup(ele);
      ele.setCapture?.();
      return false;
    };
  }

  onMounted(() => {
    nextTick(() => {
      const exec = useDebounceFn(changeWrapWidth, 80);
      exec();
    });
  });

  return {};
}

/**
 * Handle related operations of menu events
 */
export function useSiderEvent() {
  const appStore = useAppStore();
  const { getMiniWidthNumber } = useMenuSetting();

  const getCollapsedWidth = computed(() => {
    return unref(getMiniWidthNumber);
  });

  function onBreakpointChange(broken: boolean) {
    appStore.setProjectConfig({
      menuSetting: {
        siderHidden: broken,
      },
    });
  }

  return { getCollapsedWidth, onBreakpointChange };
}
