import type { BaseFormComponentType } from '@arco/common-ui';

import type { Component } from 'vue';

import { defineAsyncComponent, h } from 'vue';

/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-28 12:04:14
 * @LastEditTime: 2025-05-28 12:44:55
 * @LastEditors: LLiuHuan
 */
import { globalShareState } from '@arco/common-ui';

import { Notification } from '@arco-design/web-vue';

const AButton = defineAsyncComponent(() =>
  Promise.all([
    import('@arco-design/web-vue/es/button/index'),
    import('@arco-design/web-vue/es/button/style/index.css'),
  ]).then(([res]) => res.default),
);

// 这里需要自行根据业务组件库进行适配，需要用到的组件都需要在这里类型说明
export type ComponentType =
  | 'ApiSelect'
  | 'ApiTreeSelect'
  | 'Checkbox'
  | 'CheckboxGroup'
  | 'DatePicker'
  | 'Divider'
  | 'IconPicker'
  | 'Input'
  | 'InputNumber'
  | 'RadioGroup'
  | 'Select'
  | 'Space'
  | 'Switch'
  | 'TimePicker'
  | 'TreeSelect'
  | 'Upload'
  | BaseFormComponentType;

async function initComponentAdapter() {
  const components: Partial<Record<ComponentType, Component>> = {
    // 自定义默认按钮
    DefaultButton: (props, { attrs, slots }) => {
      return h(AButton, { ...props, attrs, type: 'info' }, slots);
    },
    // 自定义主要按钮
    PrimaryButton: (props, { attrs, slots }) => {
      return h(AButton, { ...props, attrs, type: 'primary' }, slots);
    },
  };

  // 将组件注册到全局共享状态中
  globalShareState.setComponents(components);

  // 定义全局共享状态中的消息提示
  globalShareState.defineMessage({
    // 复制成功消息提示
    copyPreferencesSuccess: (title, content) => {
      Notification.success({
        title,
        content: content as string,
        position: 'bottomRight',
      });
    },
  });
}

export { initComponentAdapter };
