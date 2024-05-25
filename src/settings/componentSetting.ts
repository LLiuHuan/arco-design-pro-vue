import { Size } from '@arco-design/web-vue';

interface ComponentSetting {
  table: {
    defaultCurrent: number;
    defaultPageSize: number;
    pageSizeOptions: number[];
    defaultSize: Size;
    defaultBufferSize: number;
    defaultAutoAdjust: boolean;
  };
}

export default {
  table: {
    defaultCurrent: 1,
    defaultPageSize: 10,
    pageSizeOptions: [10, 20, 50, 100],
    defaultSize: 'small',
    defaultBufferSize: 2,
    defaultAutoAdjust: true,
  },
} as ComponentSetting;
