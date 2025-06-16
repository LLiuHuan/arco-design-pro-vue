import { VNode, defineComponent, createVNode, render, reactive, h } from 'vue';

import Loading from './index.vue';

export interface LoadingProps {
  isShowTitle?: boolean;
  isShowLogo?: boolean;
  tip?: string;
  loading?: boolean;
  background?: string;
  absolute?: boolean;
}

export function createLoading(
  props?: Partial<LoadingProps>,
  target?: HTMLElement,
  wait = false,
) {
  let vm: Nullable<VNode> = null;
  const data = reactive({
    tip: '',
    loading: true,
    ...props,
  });

  const LoadingWrap = defineComponent({
    render() {
      return h(Loading, { ...data });
    },
  });

  vm = createVNode(LoadingWrap);

  if (wait) {
    setTimeout(() => {
      render(vm, document.createElement('div'));
    }, 0);
  } else {
    render(vm, document.createElement('div'));
  }

  function close() {
    if (vm?.el && vm.el.parentNode) {
      vm.el.parentNode.removeChild(vm.el);
    }
  }

  function open(targetDom: HTMLElement = document.body) {
    if (!vm || !vm.el) {
      return;
    }
    targetDom.appendChild(vm.el as HTMLElement);
  }

  if (target) {
    open(target);
  }
  return {
    vm,
    close,
    open,
    setTip: (tip: string) => {
      data.tip = tip;
    },
    setLoading: (loading: boolean) => {
      data.loading = loading;
    },
    get loading() {
      return data.loading;
    },
    get $el() {
      return vm?.el as HTMLElement;
    },
  };
}
