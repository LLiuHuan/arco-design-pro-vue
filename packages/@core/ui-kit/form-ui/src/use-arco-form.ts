/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 11:33:35
 * @LastEditTime: 2025-05-27 11:40:18
 * @LastEditors: LLiuHuan
 */
import type {
  ArcoFormProps,
  BaseFormComponentType,
  ExtendedFormApi,
} from './types';

import { defineComponent, h, isReactive, onBeforeUnmount, watch } from 'vue';

import { useStore } from '@arco-core/shared/store';

import ArcoUseForm from './arco-use-form.vue';
import { FormApi } from './form-api';

export function useArcoForm<
  T extends BaseFormComponentType = BaseFormComponentType,
>(options: ArcoFormProps<T>) {
  const IS_REACTIVE = isReactive(options);
  const api = new FormApi(options);
  const extendedApi: ExtendedFormApi = api as never;
  extendedApi.useStore = (selector) => {
    return useStore(api.store, selector);
  };

  const Form = defineComponent(
    (props: ArcoFormProps, { attrs, slots }) => {
      onBeforeUnmount(() => {
        api.unmount();
      });
      api.setState({ ...props, ...attrs });
      return () =>
        h(ArcoUseForm, { ...props, ...attrs, formApi: extendedApi }, slots);
    },
    {
      name: 'ArcoUseForm',
      inheritAttrs: false,
    },
  );
  // Add reactivity support
  if (IS_REACTIVE) {
    watch(
      () => options.schema,
      () => {
        api.setState({ schema: options.schema });
      },
      { immediate: true },
    );
  }

  return [Form, extendedApi] as const;
}
