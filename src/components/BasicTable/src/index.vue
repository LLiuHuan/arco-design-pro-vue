<template>
  <div class="table-toolbar">
    <!--顶部左侧区域-->
    <div class="flex items-center table-toolbar-left">
      <template v-if="title">
        <div class="table-toolbar-left-title pr-20px">
          {{ title }}
          <a-tooltip v-if="titleTooltip">
            <icon-question-circle size="18" class="ml-1 text-gray-400 cursor-pointer" />
            <template #content>
              {{ titleTooltip }}
            </template>
          </a-tooltip>
        </div>
      </template>
      <slot name="leftOperation"></slot>
    </div>

    <div class="flex items-center table-toolbar-right">
      <!--顶部右侧区域-->
      <slot name="toolbar"></slot>

      <!--刷新-->
      <a-tooltip>
        <template #content>
          <span>刷新</span>
        </template>
        <div class="table-toolbar-right-icon" @click="reload">
          <icon-refresh :size="18" />
        </div>
      </a-tooltip>

      <!--      &lt;!&ndash;密度&ndash;&gt;-->
      <!--      <n-tooltip trigger="hover">-->
      <!--        <template #trigger>-->
      <!--          <div class="table-toolbar-right-icon">-->
      <!--            <n-dropdown-->
      <!--              @select="densitySelect"-->
      <!--              trigger="click"-->
      <!--              :options="densityOptions"-->
      <!--              v-model:value="tableSize"-->
      <!--            >-->
      <!--              <n-icon size="18">-->
      <!--                <ColumnHeightOutlined />-->
      <!--              </n-icon>-->
      <!--            </n-dropdown>-->
      <!--          </div>-->
      <!--        </template>-->
      <!--        <span>密度</span>-->
      <!--      </n-tooltip>-->

      <!--表格设置单独抽离成组件-->
      <ColumnSetting :selection="selection" @update:selection="onSelection" />
    </div>
  </div>
  <div class="s-table">
    <a-table
      ref="tableElRef"
      v-bind="getBindValues"
      :pagination="pagination"
      @selection-change="updateCheckedRowKeys"
    >
      <!--      @update:page="updatePage"-->
      <!--      @update:page-size="updatePageSize"-->
      <template #[item]="data" v-for="item in Object.keys($slots)" :key="item">
        <slot :name="item" v-bind="data"></slot>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
  import {
    ref,
    defineComponent,
    reactive,
    unref,
    toRaw,
    computed,
    toRefs,
    onMounted,
    nextTick,
  } from 'vue';
  // import { ReloadOutlined, ColumnHeightOutlined, QuestionCircleOutlined } from '@vicons/antd';
  // import { getViewportOffset, isBoolean } from '@/utils';
  // import { useWindowSizeFn } from '@/hooks/event/useWindowSizeFn';
  import { createTableContext } from './hooks/useTableContext';
  import ColumnSetting from './components/settings/ColumnSetting.vue';
  import { useLoading } from './hooks/useLoading';
  import { useColumns } from './hooks/useColumns';
  import { useDataSource } from './hooks/useDataSource';
  import { usePagination } from './hooks/usePagination';
  import { basicProps } from './props';
  import { BasicTableProps } from './types/table';

  // const densityOptions = [
  //   {
  //     type: 'menu',
  //     label: '紧凑',
  //     key: 'small',
  //   },
  //   {
  //     type: 'menu',
  //     label: '默认',
  //     key: 'medium',
  //   },
  //   {
  //     type: 'menu',
  //     label: '宽松',
  //     key: 'large',
  //   },
  // ];

  export default defineComponent({
    components: {
      ColumnSetting,
    },
    props: {
      ...basicProps,
    },
    emits: [
      'fetch-success',
      'fetch-error',
      'update:checked-row-keys',
      'update:selected-keys',
      'update:selectedKeys',
      'edit-end',
      'edit-cancel',
      'edit-row-end',
      'edit-change',
      'select',
    ],
    setup(props, { emit }) {
      const deviceHeight = ref(150);
      // table Ref
      const tableElRef = ref<ComponentRef>(null);
      const wrapRef = ref<Nullable<HTMLDivElement>>(null);
      // // let paginationEl: HTMLElement | null;
      //
      const tableData = ref<Recordable[]>([]);
      const innerPropsRef = ref<Partial<BasicTableProps>>();

      const getProps = computed(() => {
        return { ...props, ...unref(innerPropsRef) } as BasicTableProps;
      });

      const { getLoading, setLoading } = useLoading(getProps);

      const { getPaginationInfo, setPagination } = usePagination(getProps);

      const { getDataSourceRef, getDataSource, getRowKey, reload } = useDataSource(
        getProps,
        {
          getPaginationInfo,
          setPagination,
          tableData,
          setLoading,
        },
        emit
      );

      const { getPageColumns, setColumns, getColumns, getCacheColumns, setCacheColumnsField } =
        useColumns(getProps);

      const state = reactive({
        tableSize: unref(getProps as any).size || 'medium',
        isColumnSetting: false,
        selection: false,
      });

      // // 页码切换
      // function updatePage(page) {
      //   setPagination({ page });
      //   reload();
      // }
      //
      // // 分页数量切换
      // function updatePageSize(size) {
      //   setPagination({ page: 1, pageSize: size });
      //   reload();
      // }
      //
      // // 密度切换
      // function densitySelect(e) {
      //   state.tableSize = e;
      // }
      //
      // 选中行
      function updateCheckedRowKeys(rowKeys: any[]) {
        console.log(rowKeys);
        emit('update:selected-keys', rowKeys);
      }

      // 获取表格大小
      const getTableSize = computed(() => state.tableSize);

      // 组装表格信息
      const getBindValues = computed(() => {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const tableData = unref(getDataSourceRef);
        const maxHeight = tableData.length ? `${unref(deviceHeight)}px` : 'auto';
        return {
          ...unref(getProps),
          loading: unref(getLoading),
          rowKey: unref(getRowKey),
          columns: toRaw(unref(getPageColumns)),
          data: tableData,
          size: unref(getTableSize),
          remote: true,
          'max-height': maxHeight,
        };
      });

      console.log(getBindValues);

      // 获取分页信息
      const pagination = computed(() => toRaw(unref(getPaginationInfo)));

      function setProps(props: Partial<BasicTableProps>) {
        innerPropsRef.value = { ...unref(innerPropsRef), ...props };
      }

      const onSelection = (selection: boolean) => {
        state.selection = selection;

        if (selection) {
          setProps({
            rowSelection: {
              type: 'checkbox',
              showCheckedAll: true,
              onlyCurrent: false,
            },
          });
        } else {
          delete innerPropsRef.value?.rowSelection;
        }
      };

      const tableAction = {
        reload,
        setColumns,
        setLoading,
        setProps,
        getColumns,
        getPageColumns,
        getCacheColumns,
        setCacheColumnsField,
        emit,
      };
      //
      // const getCanResize = computed(() => {
      //   const { canResize } = unref(getProps);
      //   return canResize;
      // });
      //
      // async function computeTableHeight() {
      //   const table = unref(tableElRef);
      //   if (!table) return;
      //   if (!unref(getCanResize)) return;
      //   const tableEl: any = table?.$el;
      //   const headEl = tableEl.querySelector('.n-data-table-thead ');
      //   const { bottomIncludeBody } = getViewportOffset(headEl);
      //   const headerH = 64;
      //   let paginationH = 2;
      //   const marginH = 24;
      //   if (!isBoolean(pagination)) {
      //     paginationEl = tableEl.querySelector('.n-data-table__pagination') as HTMLElement;
      //     if (paginationEl) {
      //       const { offsetHeight } = paginationEl;
      //       paginationH += offsetHeight || 0;
      //     } else {
      //       paginationH += 28;
      //     }
      //   }
      //   let height =
      //     bottomIncludeBody - (headerH + paginationH + marginH + (props.resizeHeightOffset || 0));
      //   const { maxHeight } = props;
      //   height = maxHeight && maxHeight < height ? maxHeight : height;
      //   deviceHeight.value = height;
      // }
      //
      // useWindowSizeFn(computeTableHeight, 280);
      //
      // onMounted(() => {
      //   nextTick(() => {
      //     computeTableHeight();
      //   });
      // });
      //
      createTableContext({ ...tableAction, wrapRef, getBindValues });

      return {
        ...toRefs(state),
        tableElRef,
        getBindValues,
        // getDataSource,
        // densityOptions,
        reload,
        // densitySelect,
        // updatePage,
        // updatePageSize,
        pagination,
        tableAction,
        onSelection,
        updateCheckedRowKeys,
      };
    },
  });
</script>
<style lang="less" scoped>
  .table-toolbar {
    display: flex;
    justify-content: space-between;
    padding: 0 0 16px 0;

    &-left {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex: 1;

      &-title {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 16px;
        font-weight: 600;
      }
    }

    &-right {
      display: flex;
      justify-content: flex-end;
      flex: 1;

      &-icon {
        margin-left: 12px;
        font-size: 16px;
        cursor: pointer;
        color: var(--text-color);

        :hover {
          color: #1890ff;
        }
      }
    }
  }

  .table-toolbar-inner-popover-title {
    padding: 2px 0;
  }
</style>
