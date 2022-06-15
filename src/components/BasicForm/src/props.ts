import { PropType } from 'vue';
import { ButtonProps } from '@arco-design/web-vue/es/button';
import { GridProps } from '@arco-design/web-vue/es/grid/interface';
import { propTypes } from '@/utils/propTypes';
import { FormProps, FormSchema } from '@/components/BasicForm/src/types/form';

export const basicProps = {
  // 表单配置规则
  schemas: {
    type: [Array] as PropType<FormSchema[]>,
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
  showActionButtonGroup: propTypes.bool.def(true),
  // 显示重置按钮
  showResetButton: propTypes.bool.def(true),
  // 重置按钮配置
  resetButtonOptions: Object as PropType<Partial<ButtonProps>>,
  // 显示确认按钮
  showSubmitButton: propTypes.bool.def(true),
  // 确认按钮配置
  submitButtonOptions: Object as PropType<Partial<ButtonProps>>,
  // 展开收起按钮
  showAdvancedButton: propTypes.bool.def(true),
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
