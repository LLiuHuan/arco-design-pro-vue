import { ComponentType } from '@/components/BasicForm';
import { ButtonProps } from '@arco-design/web-vue/es/button';
import { CSSProperties } from 'vue';
import { ColProps, RowProps } from '@/components/BasicForm/src/types/gridProps';
import { FieldRule } from '@arco-design/web-vue/es/form/interface';

export interface FormSchema {
  field: string; // 表单元素在数据对象中的path（数据项必填）
  label: string; // 标签的文本
  showColon?: boolean; // 是否显示冒号
  labelMessage?: string; // label提示信息
  labelMessageStyle?: object | string; // label提示信息样式
  defaultValue?: any; // 默认值
  component?: ComponentType; // 动态生成的标签
  componentProps?: object; // 标签的props
  slot?: string; // 插槽
  rules?: object | object[]; // 表单项校验规则
  colProps?: ColProps; //
  isFull?: boolean;
  suffix?: string;
}

export interface FormProps {
  model?: Recordable; // 表单数据对象
  schemas?: FormSchema[]; // 动态生成表单
  layout?: string; // 表单的布局方式，包括水平、垂直、多列
  size: string; // 表单控件的尺寸
  labelColProps: ColProps; // 标签元素布局选项。
  wrapperColProps: ColProps; // 表单控件布局选项。
  labelAlign: 'left' | 'right'; // 标签的对齐方向
  disabled: string; // 是否禁用表单
  rules: Record<string, FieldRule | FieldRule[]>; // 表单项校验规则
  autoLabelWidth: boolean; // (+v2.13.0)是否开启自动标签宽度，仅在 layout="horizontal" 下生效。
  isFull: boolean;
  showActionButtonGroup?: boolean;
  showResetButton?: boolean;
  resetButtonOptions?: Partial<ButtonProps>;
  showSubmitButton?: boolean;
  showAdvancedButton?: boolean;
  submitButtonOptions?: Partial<ButtonProps>;
  submitButtonText?: string;
  resetButtonText?: string;
  rowProps?: RowProps;
  resetFunc?: () => Promise<void>;
  submitFunc?: () => Promise<void>;
  submitOnReset?: boolean;
  baseRowStyle?: CSSProperties;
}

export interface FormActionType {
  submit: () => Promise<any>;
  setProps: (formProps: Partial<FormProps>) => Promise<void>;
  setFieldsValue: <T>(values: T) => Promise<void>;
  clearValidate: (name?: string | string[]) => Promise<void>;
  getFieldsValue: () => Recordable;
  resetFields: () => Promise<void>;
  validate: (nameList?: any[]) => Promise<any>;
}

export type RegisterFn = (formInstance: FormActionType) => void;

export type UseFormReturnType = [RegisterFn, FormActionType];
