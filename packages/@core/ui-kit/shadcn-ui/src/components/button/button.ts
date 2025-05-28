/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 10:14:12
 * @LastEditTime: 2025-05-27 10:20:47
 * @LastEditors: LLiuHuan
 */
import type { AsTag } from 'reka-ui';

import type { Component } from 'vue';

import type { ButtonVariants, ButtonVariantSize } from '../../ui';

export interface ArcoButtonProps {
  /**
   * The element or component this component should render as. Can be overwrite by `asChild`
   * @defaultValue "div"
   */
  as?: AsTag | Component;
  /**
   * Change the default rendered element for the one passed as a child, merging their props and behavior.
   *
   * Read our [Composition](https://www.reka-ui.com/guides/composition.html) guide for more details.
   */
  asChild?: boolean;
  class?: any;
  disabled?: boolean;
  loading?: boolean;
  size?: ButtonVariantSize;
  variant?: ButtonVariants;
}

export type CustomRenderType = (() => Component | string) | string;

export type ValueType = boolean | number | string;

export interface ArcoButtonGroupProps
  extends Pick<ArcoButtonProps, 'disabled'> {
  beforeChange?: (
    value: ValueType,
    isChecked: boolean,
  ) => boolean | PromiseLike<boolean | undefined> | undefined;
  btnClass?: any;
  gap?: number;
  multiple?: boolean;
  options?: { [key: string]: any; label: CustomRenderType; value: ValueType }[];
  showIcon?: boolean;
  size?: 'large' | 'middle' | 'small';
}
