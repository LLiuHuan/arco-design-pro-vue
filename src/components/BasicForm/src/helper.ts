/**
 * @description: 生成placeholder
 */
import { ComponentType } from '@/components/BasicForm/src/types';

export function createPlaceholderMessage(component: ComponentType) {
  if (component === 'AInput') return '请输入';
  if (
    ['NPicker', 'NSelect', 'NCheckbox', 'NRadio', 'NSwitch', 'NDatePicker', 'NTimePicker'].includes(
      component
    )
  )
    return '请选择';
  return '';
}
