import { ResponsiveValue } from '@arco-design/web-vue/es/grid/interface';

// TODO: 直接引入会提示？？？？
/**
 * The following dependencies are imported but could not be resolved:
 *
 *   @arco-design/web-vue/es/grid/interface (imported by /Users/liuhuan/Project/54cc.cc/lliuhuan/arco-design-pro-vue/src/components/BasicForm/src/BasicForm.vue?id=0)
 *
 * Are they installed?
 */
export interface GridProps {
  cols: number | ResponsiveValue;
  rowGap: number | ResponsiveValue;
  colGap: number | ResponsiveValue;
  collapsed: boolean;
  collapsedRows: number;
}
