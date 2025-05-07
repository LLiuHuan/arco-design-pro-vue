import { PropType } from 'vue';
import { propTypes } from '@/utils/vue/propTypes';

export const formProps = {
  // 表单数据对象
  // Form data object
  model: {
    type: Object as PropType<Recordable>,
    default: () => ({}),
  },
  layout: propTypes
    .oneOf(['horizontal', 'vertical', 'inline'])
    .def('horizontal'),
};
