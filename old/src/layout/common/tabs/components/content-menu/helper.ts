import { CSSProperties, onMounted, onUnmounted, Ref, ref } from 'vue';

export function useContextMenu(
  containerRef: Ref<HTMLElement>,
  trigger: 'click' | 'contextMenu',
  position: 'bl' | 'br',
): {
  visible: Ref<boolean>;
  popupStyle: Ref<CSSProperties>;
} {
  const popupStyle: Ref<CSSProperties> = ref({});
  const visible = ref(false);
  const openMenu = (e: MouseEvent) => {
    const rect = containerRef.value.getBoundingClientRect();
    e.preventDefault();
    e.stopPropagation();
    visible.value = true;
    switch (position) {
      case 'bl':
        popupStyle.value = {
          left: `${rect.left}px`,
          top: `${rect.top + rect.height + 10}px`,
        };
        break;
      case 'br':
        popupStyle.value = {
          right: `${rect.right - rect.left}px`,
          top: `${rect.top + rect.height + 10}px`,
        };
        break;
      default:
        break;
    }
  };

  const closeMenu = () => {
    visible.value = false;
  };

  onMounted(() => {
    const div = containerRef.value;
    switch (trigger) {
      case 'click':
        if (div) div.addEventListener('click', openMenu);
        window.addEventListener('click', closeMenu, true);
        break;
      case 'contextMenu':
        if (div) div.addEventListener('contextmenu', openMenu);
        window.addEventListener('click', closeMenu, true);
        window.addEventListener('contextmenu', closeMenu, true);
        break;
      default:
        break;
    }
  });

  onUnmounted(() => {
    const div = containerRef.value;
    switch (trigger) {
      case 'click':
        if (div) div.removeEventListener('click', openMenu);
        window.removeEventListener('click', closeMenu, true);
        break;
      case 'contextMenu':
        if (div) div.removeEventListener('contextmenu', openMenu);
        window.removeEventListener('click', closeMenu, true);
        window.removeEventListener('contextmenu', closeMenu, true);
        break;
      default:
        break;
    }
  });

  return {
    visible,
    popupStyle,
  };
}
