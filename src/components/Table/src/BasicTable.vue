<template>
  <div ref="wrapRef">
    <TableHeader v-bind="getHeaderProps">
      <template v-if="$slots.tableTitle" #tableTitle>
        <slot name="tableTitle"></slot>
      </template>
      <template v-if="$slots.toolbar" #toolbar>
        <slot name="toolbar"></slot>
      </template>
    </TableHeader>
    <ATable
      ref="tableElRef"
      v-bind="getBindValues"
      @selection-change="onSelectChange"
      @page-change="onPageChange"
      @page-size-change="onPageSizeChange"
    >
      <template v-for="item in Object.keys($slots)" :key="item" #[item]="data">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </ATable>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, toRaw, unref, useAttrs } from 'vue';
  import { usePagination } from '@/components/Table/src/hooks/usePagination';
  import { useColumns } from './hooks/useColumns';
  import TableHeader from './components/TableHeader.vue';
  import { BasicTableProps, TableActionType } from './types/table';
  import { createTableContext } from './hooks/useTableContext';
  import { useLoading } from './hooks/useLoading';
  import { useRowSelection } from './hooks/useRowSelection';

  const wrapRef = ref(null);
  const tableElRef = ref(null);

  const props = defineProps<BasicTableProps>();
  const innerPropsRef = ref<Partial<BasicTableProps>>();
  const emit = defineEmits(['register', 'selectChange', 'reload']);
  const attrs = useAttrs();
  // const slots = useSlots();

  const getProps = computed(() => {
    return { ...props, ...unref(innerPropsRef) } as BasicTableProps;
  });

  function setProps(tableProps: Partial<BasicTableProps>) {
    innerPropsRef.value = { ...unref(innerPropsRef), ...tableProps };
  }

  const { getLoading, setLoading } = useLoading(getProps);

  // Pagination
  const {
    getPaginationInfo,
    getPagination,
    setPagination,
    getShowPagination,
    setShowPagination,
  } = usePagination(getProps);

  const onPageChange = (page: number) => {
    setPagination({ current: page });
  };

  const onPageSizeChange = (pageSize: number) => {
    setPagination({ pageSize });
  };

  // Columns
  const { getColumns, setColumns, getViewColumns } = useColumns(
    getProps,
    getPaginationInfo,
  );

  const getBindValues = computed(() => {
    const propsData: any = {
      ...attrs,
      ...unref(getProps),
      loading: unref(getLoading),
      columns: toRaw(unref(getViewColumns)),
      pagination: toRaw(unref(getPaginationInfo)),
    };

    return propsData;
  });

  // Table row selection
  const {
    getRowSelection,
    getSelectRowKeys,
    handleRowSelection,
    clearSelectedRowKeys,
  } = useRowSelection(getProps, tableElRef, emit);

  // 表格配置
  const getHeaderProps = computed(() => {
    return {
      tableElRef,
      title: props.title,
      tableSetting: props.tableSetting,
      showTableSetting: props.showTableSetting,
      titleHelpMessage: props.titleHelpMessage,
      showSelectionBar: props.showSelectionBar,
      count: unref(getSelectRowKeys).length,
      clearSelectedRowKeys,
    };
  });

  const onSelectChange = (selectedRowKeys: string[] | number[]) => {
    handleRowSelection(selectedRowKeys);
    emit('selectChange', selectedRowKeys);
  };

  const tableAction: TableActionType = {
    setColumns,
    getColumns,
    setProps,
    setLoading,
    getPaginationRef: getPagination,
    setPagination,
    getShowPagination,
    setShowPagination,
    getRowSelection,
    clearSelectedRowKeys,
    reload: () => {
      emit('reload');
    },
    getSize: () => {
      return unref(getBindValues).size || 'medium';
    },
    emit,
  };

  createTableContext({ ...tableAction, wrapRef, getBindValues });

  emit('register', tableAction);

  defineExpose({ tableElRef, ...tableAction });
</script>

<style lang="less" scoped></style>
