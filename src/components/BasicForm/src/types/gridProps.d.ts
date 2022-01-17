import { GridRowGutter } from '@arco-design/web-vue/es/grid/interface';

// TODO: 临时使用，因为现在还没有提供Grid的Props
export type RowProps = {
  gutter?:
    | number
    | Partial<Record<'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs', number>>
    | GridRowGutter[];
  justify?: 'start' | 'center' | 'end' | 'space-around' | 'space-between';
  align?: 'start' | 'center' | 'end' | 'stretch';
  div?: boolean;
  wrap?: boolean;
};

export type ColProps = {
  span?: number;
  offset?: number;
  order?: number;
  xs?: number | { [key: string]: any };
  sm?: number | { [key: string]: any };
  md?: number | { [key: string]: any };
  lg?: number | { [key: string]: any };
  xl?: number | { [key: string]: any };
  xxl?: number | { [key: string]: any };
  flex?: number | string | 'initial' | 'auto' | 'none';
};
