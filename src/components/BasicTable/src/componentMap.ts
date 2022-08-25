// import type { Component } from 'vue';
// import {
//   Input,
//   Select,
//   Checkbox,
//   InputNumber,
//   Switch,
//   DatePicker,
//   TimePicker,
// } from '@arco-design/web-vue';
// import type { ComponentType } from './types/componentType';
//
// export enum EventEnum {
//   Input = 'on-input',
//   InputNumber = 'on-input',
//   Select = 'on-update:value',
//   Switch = 'on-update:value',
//   Checkbox = 'on-update:value',
//   DatePicker = 'on-update:value',
//   TimePicker = 'on-update:value',
// }
//
// const componentMap = new Map<ComponentType, Component>();
//
// componentMap.set('Input', Input);
// componentMap.set('InputNumber', InputNumber);
// componentMap.set('Select', Select);
// componentMap.set('Switch', Switch);
// componentMap.set('Checkbox', Checkbox);
// componentMap.set('DatePicker', DatePicker);
// componentMap.set('TimePicker', TimePicker);
//
// export function add(compName: ComponentType, component: Component) {
//   componentMap.set(compName, component);
// }
//
// export function del(compName: ComponentType) {
//   componentMap.delete(compName);
// }
//
// export { componentMap };
