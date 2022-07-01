import { h, Ref, VNodeChild } from 'vue';
import { TableData } from '@arco-design/web-vue';
// import { TableColumnData } from '@arco-design/web-vue/es/table/interface';
import type { BasicColumn } from '@/components/BasicTable/src/types/table';
import EditableCell from './EditableCell.vue';

// export function renderEditCell(column: BasicColumn) {
export function renderEditCell() {
  return (data: { record: TableData; column: BasicColumn; rowIndex: number }) => {
    const { record, column, rowIndex } = data;
    // eslint-disable-next-line no-underscore-dangle
    const _key = column.dataIndex;
    const value = record[_key || rowIndex];
    record.onEdit = async (edit: boolean, submit = false) => {
      if (!submit) {
        record.editable = edit;
      }

      if (!edit && submit) {
        const res = await record.onSubmitEdit?.();
        if (res) {
          record.editable = false;
          return true;
        }
        return false;
      }
      // cancel
      if (!edit && !submit) {
        record.onCancelEdit?.();
      }
      return true;
    };
    return h(EditableCell, {
      value,
      record,
      column,
      rowIndex,
    }) as VNodeChild;
  };
}

export type EditRecordRow<T = Recordable> = Partial<
  {
    onEdit: (editable: boolean, submit?: boolean) => Promise<boolean>;
    editable: boolean;
    onCancel: Fn;
    onSubmit: Fn;
    submitCbs: Fn[];
    cancelCbs: Fn[];
    validCbs: Fn[];
    editValueRefs: Recordable<Ref>;
  } & T
>;
