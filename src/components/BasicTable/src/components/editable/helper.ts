import { ComponentType } from '../../types/componentType';

/**
 * @description: 生成placeholder
 */
export function createPlaceholderMessage(component: ComponentType) {
  if (component === 'Input') return '请输入';
  if (
    ['Picker', 'Select', 'Checkbox', 'Radio', 'Switch', 'DatePicker', 'TimePicker'].includes(
      component
    )
  )
    return '请选择';
  return '';
}
