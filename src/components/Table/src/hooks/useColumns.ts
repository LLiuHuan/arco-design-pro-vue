import {
  computed,
  ComputedRef,
  h,
  reactive,
  ref,
  toRaw,
  unref,
  watch,
} from 'vue';
import { cloneDeep } from 'lodash-es';
import { isArray, isBoolean, isEqual, isString } from '@/utils/common';
import { useI18n } from '@/hooks/web/useI18n';
import { PaginationProps } from '@arco-design/web-vue';
import { BasicHelp } from '@/components/Basic';
import {
  ACTION_COLUMN_FLAG,
  DEFAULT_ALIGN,
  DEFAULT_CURRENT,
  DEFAULT_PAGE_SIZE,
  INDEX_COLUMN_FLAG,
} from '../const';
import { BasicColumn, BasicTableProps, GetColumnsParams } from '../types/table';

/**
 * @description 如果props传了ellipsis,则需要将所有columns都添加ellipsis属性
 * @param item
 * @param ellipsis
 */
function handleItem(item: BasicColumn, ellipsis: boolean) {
  const { children } = item;
  item.align = item.align || DEFAULT_ALIGN;
  if (ellipsis) {
    if (!isBoolean(item.ellipsis)) {
      Object.assign(item, {
        ellipsis,
      });
    }
  }
  if (children && children.length) {
    // eslint-disable-next-line no-use-before-define
    handleChildren(children, ellipsis);
  }
}

/**
 * @description 同上，处理子节点
 * @param childrenItem
 * @param ellipsis
 */
function handleChildren(
  childrenItem: BasicColumn[] | undefined,
  ellipsis: boolean,
) {
  if (!childrenItem) return;
  childrenItem.forEach((item) => {
    const { children } = item;
    handleItem(item, ellipsis);
    handleChildren(children, ellipsis);
  });
}

/**
 * @description 处理序号列
 * @param propsRef 列配置
 * @param paginationRef
 * @param columns 列数据
 */
function handleIndexColumn(
  propsRef: ComputedRef<BasicTableProps>,
  paginationRef: ComputedRef<boolean | PaginationProps>,
  columns: BasicColumn[],
) {
  const { t } = useI18n();

  const { showIndexColumn, indexColumnProps } = unref(propsRef);

  let pushIndexColumns = false;
  columns.forEach(() => {
    const indIndex = columns.findIndex(
      (column) => column.flag === INDEX_COLUMN_FLAG,
    );
    if (showIndexColumn) {
      pushIndexColumns = indIndex === -1;
    } else if (!showIndexColumn && indIndex !== -1) {
      columns.splice(indIndex, 1);
    }
  });

  if (!pushIndexColumns) return;

  const isFixedLeft = columns.some((item) => item.fixed === 'left');

  columns.unshift({
    flag: INDEX_COLUMN_FLAG,
    width: 60,
    title: t('component.table.index'),
    align: 'center',
    render: ({ rowIndex }) => {
      const getPagination = unref(paginationRef);
      if (isBoolean(getPagination)) {
        return `${rowIndex + 1}`;
      }
      const { current = DEFAULT_CURRENT, pageSize = DEFAULT_PAGE_SIZE } =
        getPagination;
      return ((current < 1 ? 1 : current) - 1) * pageSize + rowIndex + 1;
    },
    ...(isFixedLeft
      ? {
          fixed: 'left',
        }
      : {}),
    ...indexColumnProps,
  });
}

/**
 * @description 处理固定列
 * @description Process fixed columns
 * @param columns
 */
function sortFixedColumn(columns: BasicColumn[]) {
  const fixedLeftColumns: BasicColumn[] = [];
  const fixedRightColumns: BasicColumn[] = [];
  const defColumns: BasicColumn[] = [];

  for (const column of columns) {
    if (column.fixed === 'left') {
      fixedLeftColumns.push(column);
    } else if (column.fixed === 'right') {
      fixedRightColumns.push(column);
    } else {
      defColumns.push(column);
    }
  }
  // 筛选逻辑
  const filterFunc = (item: BasicColumn) => !item.hidden;
  // 筛选首层显示列（1级表头）
  const viewColumns = [
    ...fixedLeftColumns,
    ...defColumns,
    ...fixedRightColumns,
  ].filter(filterFunc);
  // 筛选>=2级表头（深度优先）
  const list = [...viewColumns];
  while (list.length) {
    const current = list[0];
    if (Array.isArray(current.children)) {
      current.children = current.children.filter(filterFunc);
      list.shift();
      list.unshift(...current.children);
    } else {
      list.shift();
    }
  }
  return viewColumns;
}

export function useColumns(
  propsRef: ComputedRef<BasicTableProps>,
  paginationRef: ComputedRef<boolean | PaginationProps>,
) {
  const columnsRef = ref(unref(propsRef).columns);
  const cacheColumns = unref(propsRef).columns;

  /**
   * @description 获取columns
   * @description Get columns
   */
  const getColumnsRef = computed(() => {
    const columns = cloneDeep(unref(columnsRef));

    handleIndexColumn(propsRef, paginationRef, columns);
    if (!columns) {
      return [];
    }
    const { ellipsis } = unref(propsRef);

    columns.forEach((item) => {
      const { slots } = item;

      handleItem(
        item,
        Reflect.has(item, 'ellipsis') ? !!item.ellipsis : !!ellipsis && !slots,
      );
    });
    return columns;
  });

  /**
   * @description 设置columns
   * @description Set columns
   * @param columnList key｜column
   */
  function setColumns(
    columnList: Partial<BasicColumn>[] | (string | string[])[],
  ) {
    const columns = cloneDeep(columnList);
    if (!isArray(columns)) return;

    if (columns.length <= 0) {
      columnsRef.value = [];
      return;
    }

    const firstColumn = columns[0];

    const cacheKeys = cacheColumns.map((item) => item.dataIndex);

    if (!isString(firstColumn) && !isArray(firstColumn)) {
      columnsRef.value = columns as BasicColumn[];
    } else {
      const columnKeys = (columns as (string | string[])[]).map((m) =>
        m.toString(),
      );
      const newColumns: BasicColumn[] = [];
      cacheColumns.forEach((item) => {
        newColumns.push({
          ...item,
          hidden: !columnKeys.includes(
            item.dataIndex?.toString() || (item.title as string),
          ),
        });
      });
      // Sort according to another array
      if (!isEqual(cacheKeys, columns)) {
        newColumns.sort((prev, next) => {
          return (
            columnKeys.indexOf(prev.dataIndex?.toString() as string) -
            columnKeys.indexOf(next.dataIndex?.toString() as string)
          );
        });
      }
      columnsRef.value = newColumns;
    }
  }

  /**
   * @description 获取columns
   * @description Get columns
   * @param opt
   */
  function getColumns(opt?: GetColumnsParams) {
    const { ignoreIndex, ignoreAction, sort } = opt || {};
    let columns = toRaw(unref(getColumnsRef));
    if (ignoreIndex) {
      columns = columns.filter((item) => item.flag !== INDEX_COLUMN_FLAG);
    }
    if (ignoreAction) {
      columns = columns.filter((item) => item.flag !== ACTION_COLUMN_FLAG);
    }

    if (sort) {
      columns = sortFixedColumn(columns);
    }

    return columns;
  }

  const getViewColumns = computed(() => {
    const viewColumns = sortFixedColumn(unref(getColumnsRef));

    const mapFn = (column: BasicColumn) => {
      if (column?.helpMessage) {
        const { title, helpMessage } = column;
        column.title = () => {
          return h('div', [
            h('span', title),
            h(BasicHelp, {
              position: 'top',
              text: helpMessage,
            }),
          ]);
        };
      }
      return reactive(column);
    };

    const columns = cloneDeep(viewColumns);
    return columns.map((column) => {
      // Support table multiple header editable
      if (column.children?.length) {
        column.children = column.children.map(mapFn);
      }

      return mapFn(column);
    });
  });

  watch(
    () => unref(propsRef).columns,
    (columns) => {
      columnsRef.value = columns;
    },
  );

  return {
    getColumns,
    setColumns,
    getViewColumns,
  };
}
