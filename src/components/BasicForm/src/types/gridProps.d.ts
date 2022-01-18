// TODO: 临时使用，因为现在还没有提供Col的Props
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
