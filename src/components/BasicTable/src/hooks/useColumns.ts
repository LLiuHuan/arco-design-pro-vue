import { ref, Ref, ComputedRef, unref, computed, watch, toRaw, h, VNode } from 'vue';
import { Tooltip, Icon } from '@arco-design/web-vue';
import { IconQuestionCircle } from '@arco-design/web-vue/es/icon';
import { isEqual, cloneDeep } from 'lodash-es';
import { isArray, isString, isBoolean, isFunction } from '@/utils';
import { usePermission } from '@/hooks/web/usePermission';
import { ActionItem } from '@/components/BasicTable';
import { renderEditCell } from '../components/editable';
import type { BasicColumn, BasicTableProps } from '../types/table';

export function useColumns(propsRef: ComputedRef<BasicTableProps>) {
  const columnsRef = ref(unref(propsRef).columns) as unknown as Ref<BasicColumn[]>;
  let cacheColumns = unref(propsRef).columns;

  const getColumnsRef = computed(() => {
    const columns = cloneDeep(unref(columnsRef));

    handleActionColumn(propsRef, columns);
    if (!columns) return [];
    return columns;
  });

  const { hasPermission } = usePermission();

  function isIfShow(action: ActionItem): boolean {
    const { ifShow } = action;

    let isIfShowBool = true;

    if (isBoolean(ifShow)) {
      isIfShowBool = ifShow;
    }
    if (isFunction(ifShow)) {
      isIfShowBool = ifShow(action);
    }
    return isIfShowBool;
  }

  const renderTooltip = (trigger: VNode, content: string) => {
    return h(Tooltip, { content }, [trigger]);
  };

  const getPageColumns = computed(() => {
    const pageColumns = unref(getColumnsRef);
    const columns = cloneDeep(pageColumns);
    return columns
      .filter((column) => {
        return hasPermission(column.auth as string[]) && isIfShow(column);
      })
      .map((column) => {
        // 默认 ellipsis 为true
        column.ellipsis = !column.ellipsis;
        const { edit } = column;
        if (edit) {
          column.render = renderEditCell();
          if (edit) {
            const { title } = column;
            column.title = () => {
              return renderTooltip(
                h('span', {}, [
                  h('span', { style: { 'margin-right': '5px' } }, title),
                  h(
                    Icon,
                    {
                      size: 14,
                    },
                    {
                      default: () => h(IconQuestionCircle),
                    }
                  ),
                ]),
                '该列可编辑'
              );
            };
          }
        }
        return column;
      });
  });

  watch(
    () => unref(propsRef).columns,
    (columns) => {
      console.log(columns);
      columnsRef.value = columns;
      cacheColumns = columns;
    }
  );

  function handleActionColumn(propsRef: ComputedRef<BasicTableProps>, columns: BasicColumn[]) {
    const { actionColumn } = unref(propsRef);
    if (!actionColumn) return;
    !columns.find((col) => col.dataIndex === 'action') &&
      columns.push({
        ...(actionColumn as any),
      });
  }

  // 设置
  function setColumns(columnList: string[]) {
    const columns: any[] = cloneDeep(columnList);
    if (!isArray(columns)) return;

    if (!columns.length) {
      columnsRef.value = [];
      return;
    }
    const cacheKeys = cacheColumns.map((item) => item.dataIndex);
    // 针对拖拽排序
    if (!isString(columns[0])) {
      console.log(columns);
      columnsRef.value = columns;
    } else {
      const newColumns: any[] = [];
      cacheColumns.forEach((item) => {
        if (columnList.includes(item.dataIndex)) {
          newColumns.push({ ...item });
        }
      });
      if (!isEqual(cacheKeys, columns)) {
        newColumns.sort((prev, next) => {
          return cacheKeys.indexOf(prev.dataIndex) - cacheKeys.indexOf(next.dataIndex);
        });
      }
      columnsRef.value = newColumns;
    }
  }

  // 获取
  function getColumns(): BasicColumn[] {
    const columns = toRaw(unref(getColumnsRef));
    return columns.map((item) => {
      return {
        ...item,
        title: item.title,
        dataIndex: item.dataIndex,
        fixed: item.fixed || undefined,
      };
    });
  }

  // 获取原始
  function getCacheColumns(isKey?: boolean): any[] {
    return isKey ? cacheColumns.map((item) => item.dataIndex) : cacheColumns;
  }

  // 更新原始数据单个字段
  function setCacheColumnsField(key: string | undefined, value: Partial<BasicColumn>) {
    if (!key || !value) {
      return;
    }
    cacheColumns.forEach((item) => {
      if (item.dataIndex === key) {
        Object.assign(item, value);
      }
    });
  }

  return {
    getColumnsRef,
    getCacheColumns,
    setCacheColumnsField,
    setColumns,
    getColumns,
    getPageColumns,
  };
}
