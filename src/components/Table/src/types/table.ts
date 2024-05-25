import {
  PaginationProps,
  Size,
  TableColumnData,
  TableRowSelection,
} from '@arco-design/web-vue';
import { EmitType } from '~/types/global';
import { RoleEnum } from '@/enums/authEnum';

export interface GetColumnsParams {
  ignoreIndex?: boolean;
  ignoreAction?: boolean;
  sort?: boolean;
}

export interface ColumnOptionsType {
  value: string;
  label: string;
  column: {
    hidden?: boolean;
  };
  fixed?: 'left' | 'right';
}

export type ColumnChangeParam = {
  dataIndex: string;
  fixed?: 'left' | 'right';
  visible: boolean;
};

export interface BasicColumn extends TableColumnData {
  // 是否显示
  hidden?: boolean;
  // 标签
  flag?: 'INDEX' | 'DEFAULT' | 'CHECKBOX' | 'RADIO' | 'ACTION';

  helpMessage?: string | string[];

  // 权限编码控制是否显示
  auth?: RoleEnum | RoleEnum[] | string | string[];
  // 业务控制是否显示
  ifShow?: boolean | ((column: BasicColumn) => boolean);
}

export interface TableSetting {
  redo?: boolean;
  size?: boolean;
  setting?: boolean;
  settingCache?: boolean;
  fullScreen?: boolean;
}

export interface BasicTableProps {
  title?: string;
  titleHelpMessage?: string | string[];
  span?: boolean;
  loading?: boolean;
  stripe?: boolean;

  // 显示表格设置
  showTableSetting?: boolean;
  // 表格设置项
  tableSetting?: TableSetting;

  // 列配置
  columns: BasicColumn[];
  // 是否显示序号列
  showIndexColumn?: boolean;
  // 序号列配置
  indexColumnProps?: BasicColumn;
  actionColumn?: BasicColumn;
  // 文本超过宽度是否显示。。。
  ellipsis?: boolean;

  // 分页配置
  pagination?: boolean | PaginationProps;
  // 分页选择器的位置
  pagePosition?: 'tl' | 'top' | 'tr' | 'bl' | 'bottom' | 'br';

  // 表格行选择器配置
  rowSelection?: TableRowSelection;
  selectedKeys?: (string | number)[];

  // 表格大小
  size?: Size;

  // 是否显示已选中数量
  showSelectionBar?: boolean;
}

export interface TableActionType {
  getColumns: (opt?: GetColumnsParams) => BasicColumn[];
  setColumns: (columns: BasicColumn[]) => void;
  setProps: (props: Partial<BasicTableProps>) => void;
  setLoading: (loading: boolean) => void;
  getPaginationRef: () => PaginationProps | boolean;
  setPagination: (info: PaginationProps | boolean) => void;
  getShowPagination: () => boolean;
  setShowPagination: (show: boolean) => void;

  getRowSelection: () => TableRowSelection;
  clearSelectedRowKeys: () => void;

  getSize: () => Size;

  reload: () => void;
  emit?: EmitType;
}
