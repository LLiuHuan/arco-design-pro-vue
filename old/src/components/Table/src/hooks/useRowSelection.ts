import { computed, ComputedRef, Ref, ref, unref } from 'vue';
import { TableRowSelection } from '@arco-design/web-vue';
import { isFunction } from '@/utils/common';
import { BasicTableProps } from '../types/table';

export function useRowSelection(
  propsRef: ComputedRef<BasicTableProps>,
  tableElRef: Ref<ComponentRef>,
  emit: EmitType,
) {
  const selectedRowKeysRef = ref<(string | number)[]>([]);

  /**
   * @description 获取行选择配置
   * @description Get row selection configuration
   */
  const getRowSelectionRef = computed((): TableRowSelection | undefined => {
    if (!unref(propsRef)?.rowSelection) {
      return undefined;
    }
    return unref(propsRef).rowSelection;
  });

  /**
   * @description 处理行选择
   * @description Handle row selection
   * @param rowKeys 选择的行keys
   */
  function handleRowSelection(rowKeys: (string | number)[]) {
    selectedRowKeysRef.value = rowKeys;
  }

  /**
   * @description 清空已选择的行keys
   * @description Clear selected row keys
   */
  function clearSelectedRowKeys() {
    selectedRowKeysRef.value = [];

    const { selectAll } = unref(tableElRef);
    if (selectAll && isFunction(selectAll)) {
      selectAll(false);
    }
    emit('selectChange', []);
  }

  /**
   * @description 删除行选择
   * @description Delete row selection
   * @param rowKey
   */
  function deleteRowSelection(rowKey: string | number) {
    const index = unref(selectedRowKeysRef).findIndex((key) => key === rowKey);
    if (index > -1) {
      selectedRowKeysRef.value.splice(index, 1);
    }
  }

  /**
   * @description 获取已选择的行keys
   * @description Get selected row keys
   */
  const getSelectRowKeys = computed(() => {
    return unref(selectedRowKeysRef);
  });

  /**
   * @description 获取行选择配置
   * @description Get row selection configuration
   */
  function getRowSelection() {
    return unref(getRowSelectionRef)!;
  }

  return {
    getRowSelection,
    getRowSelectionRef,
    getSelectRowKeys,

    handleRowSelection,

    clearSelectedRowKeys,
    deleteRowSelection,
  };
}
