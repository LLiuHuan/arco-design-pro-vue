/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-28 12:04:14
 * @LastEditTime: 2025-06-15 19:26:58
 * @LastEditors: LLiuHuan
 */

import type { BaseFormComponentType } from '@arco/common-ui';
import type { Recordable } from '@arco/types';

import type { Component } from 'vue';

import { defineComponent, getCurrentInstance, h, ref } from 'vue';

import { ApiComponent, globalShareState, IconPicker } from '@arco/common-ui';
import { $t } from '@arco/locales';

import {
  Button as AButton,
  Checkbox as ACheckbox,
  CheckboxGroup as ACheckboxGroup,
  DatePicker as ADatePicker,
  Divider as ADivider,
  Input as AInput,
  InputNumber as AInputNumber,
  Radio as ARadio,
  RadioGroup as ARadioGroup,
  Select as ASelect,
  Space as ASpace,
  Switch as ASwitch,
  Tag as ATag,
  TimePicker as ATimePicker,
  TreeSelect as ATreeSelect,
  Upload as AUpload,
  Notification,
  Textarea,
} from '@arco-design/web-vue';

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
  | 'Textarea'
  | 'TimePicker'
  | 'TreeSelect'
  | 'Upload'
  | BaseFormComponentType;

const withDefaultPlaceholder = <T extends Component>(
  component: T,
  type: 'input' | 'select',
  componentProps: Recordable<any> = {},
) => {
  return defineComponent({
    name: component.name,
    inheritAttrs: false,
    setup: (props: any, { attrs, expose, slots }) => {
      const placeholder =
        props?.placeholder ||
        attrs?.placeholder ||
        $t(`ui.placeholder.${type}`);
      // 透传组件暴露的方法
      const innerRef = ref();
      const publicApi: Recordable<any> = {};
      expose(publicApi);
      const instance = getCurrentInstance();
      instance?.proxy?.$nextTick(() => {
        for (const key in innerRef.value) {
          if (typeof innerRef.value[key] === 'function') {
            publicApi[key] = innerRef.value[key];
          }
        }
      });
      return () =>
        h(
          component,
          { ...componentProps, placeholder, ...props, ...attrs, ref: innerRef },
          slots,
        );
    },
  });
};

async function initComponentAdapter() {
  const components: Partial<Record<ComponentType, Component>> = {
    ApiSelect: (props, { attrs, slots }) => {
      return h(
        ApiComponent,
        {
          placeholder: $t('ui.placeholder.select'),
          ...props,
          ...attrs,
          component: ASelect,
          modelPropName: 'modelValue',
        },
        slots,
      );
    },
    ApiTreeSelect: (props, { attrs, slots }) => {
      return h(
        ApiComponent,
        {
          placeholder: $t('ui.placeholder.select'),
          ...props,
          ...attrs,
          component: ATreeSelect,
          labelKey: 'title',
          valueKey: 'key',
          nodeKey: 'value',
          loadingSlot: 'loading',
          keyField: 'value',
          modelPropName: 'modelValue',
          optionsPropName: 'data',
          visibleEvent: 'dropdownVisibleChange',
        },
        slots,
      );
    },
    Checkbox: ACheckbox,
    CheckboxGroup: (props, { attrs, slots }) => {
      let defaultSlot;
      if (Reflect.has(slots, 'default')) {
        defaultSlot = slots.default;
      } else {
        const { options, isButton } = attrs;
        if (Array.isArray(options)) {
          defaultSlot = () =>
            options.map((option) =>
              h(
                isButton
                  ? h(ACheckbox, option, {
                      checkbox: ({ checked }) =>
                        h(
                          ATag,
                          {
                            checked,
                            checkable: true,
                          },
                          option.label,
                        ),
                    })
                  : ACheckbox,
                option,
              ),
            );
        }
      }
      return h(
        ACheckboxGroup,
        { ...props, ...attrs },
        { default: defaultSlot },
      );
      // return h(
      //   ACheckboxGroup,
      //   { ...props, ...attrs },
      //   { default: () => options.map((option) => h(AButton)) },
      // );
    },
    DatePicker: ADatePicker,
    // 自定义默认按钮
    DefaultButton: (props, { attrs, slots }) => {
      return h(AButton, { ...props, attrs }, slots);
    },
    // 自定义主要按钮
    PrimaryButton: (props, { attrs, slots }) => {
      return h(AButton, { ...props, attrs, type: 'primary' }, slots);
    },
    Divider: ADivider,
    IconPicker: (props, { attrs, slots }) => {
      return h(
        IconPicker,
        { iconSlot: 'suffix', inputComponent: AInput, ...props, ...attrs },
        slots,
      );
    },
    Input: withDefaultPlaceholder(AInput, 'input'),
    InputNumber: withDefaultPlaceholder(AInputNumber, 'input'),
    RadioGroup: (props, { attrs, slots }) => {
      let defaultSlot;
      if (Reflect.has(slots, 'default')) {
        defaultSlot = slots.default;
      } else {
        const { options } = attrs;
        if (Array.isArray(options)) {
          defaultSlot = () => options.map((option) => h(ARadio, option));
        }
      }
      const groupRender = h(
        ARadioGroup,
        { ...props, ...attrs },
        { default: defaultSlot },
      );
      return groupRender;
      // return attrs.isButton
      //   ? h(ASpace, { direction: 'vertical' }, () => groupRender)
      //   : groupRender;
    },
    Select: withDefaultPlaceholder(ASelect, 'select'),
    Space: ASpace,
    Switch: ASwitch,
    TimePicker: ATimePicker,
    TreeSelect: withDefaultPlaceholder(ATreeSelect, 'select'),
    Upload: AUpload,
    Textarea,
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
