import { CSSProperties } from 'vue';
import { FieldRule } from '@arco-design/web-vue/es/form/interface';
import { ButtonProps } from '@arco-design/web-vue/es/button';
import { GridItemProps, GridProps } from '@arco-design/web-vue/es/grid/interface';
import { ComponentType } from '@/components/BasicForm';
import { ColProps } from '@/components/BasicForm/src/types/gridProps';

// schema 所需参数
export interface FormSchema {
  field: string; // 表单元素在数据对象中的path（数据项必填）
  label: string; // 标签的文本
  showColon?: boolean; // 是否显示冒号
  noStyle?: boolean; // 是否去除样式
  disabled?: boolean; // 是否禁用
  help?: string; // 帮助文案
  extra?: string; // 额外显示的文案
  required?: boolean; // 是否必须填写
  rules?: FieldRule | FieldRule[]; // 表单项校验规则 （优先级高于 form 的 rules）
  validateStatus?: 'success' | 'warning' | 'error' | 'validating'; // 校验状态
  validateTrigger?: 'change' | 'input' | 'focus' | 'blur'; // 触发校验的事件
  labelColProps?: object; // 标签元素布局选项。参数同 <col> 组件一致
  wrapperColProps?: object; // 表单控件布局选项。参数同 <col> 组件一致
  hideLabel?: boolean; // 是否隐藏标签
  hideAsterisk?: boolean; // 是否隐藏星号
  labelColStyle?: object; // (+v2.10.0) 标签元素布局组件的 style
  wrapperColStyle?: object; // (+v2.10.0) 表单控件布局组件的 style
  rowProps?: object; // (+v2.10.0) 表单项布局选项。参数同 <row> 组件一致
  rowClass?: string | Array<any> | object; // (+v2.10.0) 表单项布局组件的 class
  contentClass?: string | Array<any> | object; // (+v2.10.0) 表单控件包裹层的 class
  contentFlex?: boolean; // (+v2.13.0) 内容层是否开启 flex 布局
  mergeProps?: boolean | ((props: Record<string, any>) => Record<string, any>); // (+v2.13.0) 控制传递到子元素上的 Props。默认包括 disabled、error、size、 events 和 FormItem 上的额外属性
  labelColFlex?: number | string; // (+v2.13.0) 设置标签 Col 组件的 flex 属性。设置时表单 Col 组件的 flex 属性会被设置为 auto。

  labelMessage?: string; // label提示信息
  labelMessageStyle?: object | string; // label提示信息样式
  defaultValue?: any; // 默认值
  component?: ComponentType; // 动态生成的标签
  componentProps?: ComponentProps; // 标签的props
  slot?: string; // 插槽
  // colProps?: ColProps; // 栅格布局props
  gridItemProps?: Partial<GridItemProps>; //  栅格布局props
  isFull?: boolean; // 暂时无用
  suffix?: string; // 暂时无用
}

interface ComponentProps {
  placeholder: string;
  options?: MethodOptions[];
}

interface MethodOptions {
  value: string;
  label: string;
  type: string;
  disabled?: boolean;
}

// form所需参数
export interface FormProps {
  model?: Recordable; // 表单数据对象
  layout?: 'horizontal' | 'vertical' | 'inline'; // 表单的布局方式，包括水平、垂直、多列
  schemas?: FormSchema[]; // 动态生成表单
  size?: 'mini' | 'small' | 'medium' | 'large'; // 表单控件的尺寸
  labelColProps?: ColProps; // 标签元素布局选项。
  wrapperColProps?: ColProps; // 表单控件布局选项。
  labelAlign?: 'left' | 'right'; // 标签的对齐方向
  disabled?: string; // 是否禁用表单
  rules?: Record<string, FieldRule | FieldRule[]>; // 表单项校验规则
  autoLabelWidth?: boolean; // (+v2.13.0)是否开启自动标签宽度，仅在 layout="horizontal" 下生效。
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

export interface BaseFormProps {
  schemas: FormSchema[];
  formProps?: FormProps;
  // rowProps?: RowProps;
  gridProps?: Partial<GridProps>;
  showActionButtonGroup?: boolean;
  showResetButton?: boolean;
  resetButtonOptions?: Partial<ButtonProps>;
  showSubmitButton?: boolean;
  submitButtonOptions?: Partial<ButtonProps>;
  showAdvancedButton?: boolean;
  submitButtonText?: string;
  resetButtonText?: string;
  isFull?: boolean;
  resetFunc?: () => Promise<void>;
  submitFunc?: () => Promise<void>;
  submitOnReset?: boolean;
  baseRowStyle?: CSSProperties;
}

export type RegisterFn = (formInstance: FormActionType) => void;

export type UseFormReturnType = [RegisterFn, FormActionType];
