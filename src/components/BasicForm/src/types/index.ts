import { VNode } from 'vue';

export type ComponentType =
  | VNode
  | 'AInput'
  | 'AAInput'
  | 'AInputGroup'
  | 'AInputPassword'
  | 'AInputSearch'
  | 'AInputNumber'
  | 'AInputTag'
  | 'ASelect'
  | 'ATreeSelect'
  | 'ARadio'
  | 'ARadioGroup'
  | 'ACheckbox'
  | 'ACheckboxGroup'
  | 'AAutoComplete'
  | 'ACascader'
  | 'ADatePicker'
  | 'AMonthPicker'
  | 'ARangePicker'
  | 'AWeekPicker'
  | 'ATimePicker'
  | 'ASwitch'
  | 'AUpload'
  | 'ASlider'
  | 'ARate';
