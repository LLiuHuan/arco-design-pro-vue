// import type { PropType } from 'vue';
// import TableProps from '@arco-design/web-vue/es/table/table';
// import { propTypes } from '@/utils/propTypes';
// import { BasicColumn } from './types/table';
//
// export const basicProps = {
//   ...TableProps.props, // 这里继承原 UI 组件的 props
//   title: {
//     type: String,
//     default: null,
//   },
//   titleTooltip: {
//     type: String,
//     default: null,
//   },
//   dataSource: {
//     type: [Object],
//     default: () => [],
//   },
//   columns: {
//     type: [Array] as PropType<BasicColumn[]>,
//     default: () => [],
//     required: true,
//   },
//   beforeRequest: {
//     type: Function as PropType<(...arg: any[]) => void | Promise<any>>,
//     default: null,
//   },
//   request: {
//     type: Function as PropType<(...arg: any[]) => Promise<any>>,
//     default: null,
//   },
//   afterRequest: {
//     type: Function as PropType<(...arg: any[]) => void | Promise<any>>,
//     default: null,
//   },
//   // pagination: {
//   //   type: [Object, Boolean],
//   //   default: () => {},
//   // },
//   // 废弃
//   showPagination: {
//     type: [String, Boolean],
//     default: 'auto',
//   },
//   actionColumn: {
//     type: Object as PropType<BasicColumn>,
//     default: null,
//   },
//   canResize: propTypes.bool.def(true),
//   resizeHeightOffset: propTypes.number.def(0),
// };
