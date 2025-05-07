import type { App, Directive } from 'vue';
import { createLoading } from '@/components/AppLoading';

const loadingDirective: Directive = {
  mounted(el, binding) {
    const tip = el.getAttribute('loading-tip');
    const background = el.getAttribute('loading-background');
    const { fullscreen } = binding.modifiers;
    el.instance = createLoading(
      {
        tip,
        background,
        loading: !!binding.value,
        absolute: !fullscreen,
      },
      fullscreen ? document.body : el,
    );
  },
  updated(el, binding) {
    const { instance } = el;
    if (!instance) return;
    instance.setTip(el.getAttribute('loading-tip'));
    if (binding.oldValue !== binding.value) {
      instance.setLoading?.(binding.value && !instance.loading);
    }
  },
  unmounted(el) {
    el?.instance?.close();
  },
};

export function setupLoadingDirective(app: App) {
  app.directive('loading', loadingDirective);
}

export default loadingDirective;
