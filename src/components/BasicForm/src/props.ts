import { PropType } from 'vue';
import { ButtonProps } from '@arco-design/web-vue/es/button';
import { GridProps } from './types/grid';
import { FormProps, FormSchema } from './types/form';

export const basicProps = {
  // 表单配置规则
  schemas: {
    type: [] as PropType<FormSchema[]>,
    default: () => [],
  },
  // 表单设置规则
  formProps: {
    type: Object as PropType<FormProps>,
    default: () => {},
  },
  // grid 配置
  gridProps: Object as PropType<GridProps>,

  // 是否显示操作按钮（查询/重置）
  showActionButtonGroup: true,
  // 显示重置按钮
  showResetButton: true,
  // showResetButton: propTypes.bool.def(true),
  // 重置按钮配置
  resetButtonOptions: Object as PropType<Partial<ButtonProps>>,
  // 显示确认按钮
  showSubmitButton: true,
  // 确认按钮配置
  submitButtonOptions: Object as PropType<Partial<ButtonProps>>,
  // 展开收起按钮
  showAdvancedButton: true,
  // 确认按钮文字
  submitButtonText: {
    type: String,
    default: '查询',
  },
  // 重置按钮文字
  resetButtonText: {
    type: String,
    default: '重置',
  },
};
