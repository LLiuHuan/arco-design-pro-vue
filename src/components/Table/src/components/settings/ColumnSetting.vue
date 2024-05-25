<template>
  <APopover
    content-class=""
    position="bl"
    trigger="click"
    @popup-visible-change="onOpenChange"
  >
    <template #title>
      <div class="flex justify-between items-center">
        <ASpace class="pr-10px nowrap-hidden">
          <ACheckbox
            v-model:model-value="isColumnAllSelected"
            :indeterminate="indeterminate"
            @change="onColumnAllSelectChange"
          >
            {{ $t('component.table.settingColumnShow') }}
          </ACheckbox>
          <ACheckbox
            v-model:model-value="isIndexColumnShow"
            @change="onIndexColumnShowChange"
          >
            {{ $t('component.table.settingIndexColumnShow') }}
          </ACheckbox>
          <ACheckbox
            v-if="defaultRowSelection"
            v-model:model-value="isRowSelectionShow"
            @change="onRowSelectionShowChange"
          >
            {{ $t('component.table.settingSelectColumnShow') }}
          </ACheckbox>
        </ASpace>

        <AButton class="neutral-btn" size="mini" type="outline">
          {{ $t('common.resetText') }}
        </AButton>
      </div>
    </template>

    <template #content>
      <AScrollbar>
        <ACheckboxGroup
          v-model:model-value="columnCheckedOptions"
          class="w-full"
        >
          <div ref="draggableRef">
            <div
              v-for="item in columnOptions"
              :key="item.value"
              :data-no="item.value"
              class="cursor-pointer h-36px flex-y-center px-6px rd-4px hover:(bg-[rgba(var(--primary-6))] bg-opacity-20) flex justify-between items-center"
            >
              <div>
                <IconDragDotVertical />
                <ACheckbox :value="item.value">
                  {{ item.label }}
                </ACheckbox>
              </div>

              <div>
                <ATooltip :content="$t('component.table.settingFixedLeft')">
                  <IconToLeft
                    :class="[
                      item.fixed === 'left'
                        ? '!text-[rgba(var(--primary-6))]'
                        : '',
                    ]"
                    @click="onColumnFixedChange(item, 'left')"
                  />
                </ATooltip>
                <ADivider direction="vertical" />
                <ATooltip :content="$t('component.table.settingFixedRight')">
                  <IconToRight
                    :class="[
                      item.fixed === 'right'
                        ? '!text-[rgba(var(--primary-6))]'
                        : '',
                    ]"
                    @click="onColumnFixedChange(item, 'right')"
                  />
                </ATooltip>
              </div>
            </div>
          </div>
        </ACheckboxGroup>
      </AScrollbar>
    </template>
    <ATooltip :content="$t('component.table.settingColumn')" position="top">
      <div>
        <SvgIcon
          class="cursor-pointer"
          icon="lets-icons:setting-line"
          size="20"
        />
      </div>
    </ATooltip>
  </APopover>
</template>

<script lang="ts" setup>
  import { useDraggable } from 'vue-draggable-plus';
  import { computed, nextTick, ref, unref, useAttrs, watch } from 'vue';
  import { cloneDeep, omit } from 'lodash-es';
  import { SvgIcon } from '@/components/Icon';
  import { TableRowSelection } from '@arco-design/web-vue';
  import { useTableContext } from '../../hooks/useTableContext';
  import {
    BasicColumn,
    ColumnChangeParam,
    ColumnOptionsType,
  } from '../../types/table';
  import { INDEX_COLUMN_FLAG } from '../../const';

  defineOptions({ name: 'ColumnSetting' });
  const emit = defineEmits(['columnsChange']);

  const attrs = useAttrs();
  const table = useTableContext();

  const draggableRef = ref(null);

  let defaultRowSelection: TableRowSelection;

  // 列可选项
  const columnOptions = ref<ColumnOptionsType[]>([]);
  // 已选列
  const columnCheckedOptions = ref<string[]>([]);

  /**
   * @description 全选列
   */
  const isColumnAllSelected = ref<boolean>(false);
  const isRowSelectionShow = ref<boolean>(false);

  /**
   * @description 监听全选列选中状态
   */
  const onColumnAllSelectChange = () => {
    if (columnCheckedOptions.value.length < columnOptions.value.length) {
      columnCheckedOptions.value = columnOptions.value.map((o) => o.value);
    } else {
      columnCheckedOptions.value = [];
    }
  };

  /**
   * @description 半选状态
   */
  const indeterminate = computed(() => {
    return (
      columnCheckedOptions.value.length > 0 &&
      columnCheckedOptions.value.length < columnOptions.value.length
    );
  });

  /**
   * @description 全选状态更新
   */
  const isColumnAllSelectedUpdate = () => {
    isColumnAllSelected.value =
      columnOptions.value.length === columnCheckedOptions.value.length;
  };
  // endregion

  // 更新 showIndexColumn
  const showIndexColumnUpdate = (showIndexColumn: boolean) => {
    // isInnerChange = true;
    table.setProps({
      showIndexColumn,
    });
  };
  // 更新 rowSelection
  const showRowSelectionUpdate = (showRowSelection: boolean) => {
    console.log('showRowSelectionUpdate', showRowSelection);
    table.setProps({
      rowSelection: showRowSelection
        ? {
            ...omit(defaultRowSelection, ['selectedRowKeys']),
            fixed: true,
          }
        : undefined,
    });
  };
  const onRowSelectionShowChange = (value: boolean) => {
    showRowSelectionUpdate(value);
    // // 更新 showRowSelection 缓存
    // props.cache &&
    //   typeof route.name === 'string' &&
    //   tableSettingStore.setShowRowSelection(route.name, e.target.checked);
  };

  // 是否显示序号列
  const isIndexColumnShow = ref<boolean>(false);
  // 序号列更新
  const onIndexColumnShowChange = (value: boolean) => {
    // 更新 showIndexColumn
    showIndexColumnUpdate(value);
    // // 更新 showIndexColumn 缓存
    // props.cache &&
    //   typeof route.name === 'string' &&
    //   tableSettingStore.setShowIndexColumn(route.name, e.target.checked);
  };

  /**
   * @description 设置列数据列表
   * @param columns
   */
  const tableColumnsSet = (columns: BasicColumn[]) => {
    // isInnerChange = true;
    table?.setColumns(columns);

    // 沿用逻辑
    const columnChangeParams: ColumnChangeParam[] = columns.map((col) => ({
      dataIndex: col.dataIndex ? col.dataIndex.toString() : '',
      fixed: col.fixed,
      visible: !col.hidden,
    }));
    emit('columnsChange', columnChangeParams);
  };

  /**
   * @description 更新列方法，处理后调用设置列方法
   */
  const tableColumnsUpdate = () => {
    // 考虑了所有列
    const columns = cloneDeep(table.getColumns());

    // 从左 fixed 最一列开始排序（除了 序号列）
    let count = columns.filter(
      (o) => o.flag !== INDEX_COLUMN_FLAG && o.fixed === 'left',
    ).length;

    // 序号列提前
    if (isIndexColumnShow.value) {
      count += 1;
    }

    // 按 columnOptions 的排序 调整 table.getColumns() 的顺序和值
    for (const opt of columnOptions.value) {
      const colIdx = columns.findIndex((o) => o.dataIndex === opt.value);
      //
      if (colIdx > -1) {
        const target = columns[colIdx];
        target.hidden = opt.column?.hidden;
        target.fixed = opt.fixed;
        columns.splice(colIdx, 1);
        columns.splice((count += 1), 0, target); // 递增插入
      }
    }

    // 是否存在 action
    const actionIndex = columns.findIndex((o) => o.dataIndex === 'action');
    if (actionIndex > -1) {
      const actionCol = columns.splice(actionIndex, 1);
      columns.push(actionCol[0]);
    }

    // 设置列表列
    tableColumnsSet(columns);
  };

  /**
   * @description 监听打开弹窗状态
   * @description 只有打开的时候才会初始化拖拽，要不会找不到draggableRef
   * @param visible
   */
  const onOpenChange = async (visible: boolean) => {
    await nextTick();
    if (unref(draggableRef)) {
      const { start, pause } = useDraggable(draggableRef, columnOptions, {
        animation: 400,
        dataIdAttr: 'data-no',
        onEnd() {
          // 列表列更新
          tableColumnsUpdate();
          // 更新列缓存
          // props.cache && columnOptionsSave();
        },
      });
      if (visible) {
        start();
      } else {
        pause();
      }
    }
  };

  /**
   * @description 列固定状态变化
   * @param opt 列
   * @param type 类型 left | right
   */
  const onColumnFixedChange = (
    opt: ColumnOptionsType,
    type: 'left' | 'right',
  ) => {
    if (type === 'left') {
      if (!opt.fixed || opt.fixed === 'right') {
        opt.fixed = 'left';
      } else {
        opt.fixed = undefined;
      }
    } else if (type === 'right') {
      if (!opt.fixed || opt.fixed === 'left') {
        opt.fixed = 'right';
      } else {
        opt.fixed = undefined;
      }
    }

    // 列表列更新
    tableColumnsUpdate();
    // 更新列缓存
    // props.cache && columnOptionsSave();
  };

  /**
   * @description 列是否显示
   * @param column
   */
  const columnIfShow = (column?: Partial<Omit<BasicColumn, 'children'>>) => {
    if (column) {
      if ('ifShow' in column) {
        if (typeof column.ifShow === 'boolean') {
          return column.ifShow;
        }
        if (column.ifShow) {
          return column.ifShow(column);
        }
      }
      return true;
    }
    return false;
  };

  /**
   * @description 获取数据列
   */
  const getTableColumns = () => {
    return table
      .getColumns({ ignoreIndex: true, ignoreAction: true })
      .filter((col) => columnIfShow(col));
  };

  /**
   * @description 更新已选列
   */
  const columnCheckedOptionsUpdate = () => {
    columnCheckedOptions.value = columnOptions.value
      .filter((o) => !o.column?.hidden)
      .map((o) => o.value);
  };

  // 已选变化
  watch(columnCheckedOptions, () => {
    // 恢复缓存后生效
    // if (isRestored) {
    // 显示
    columnOptions.value
      .filter((o) => columnCheckedOptions.value.includes(o.value))
      .forEach((o) => {
        o.column.hidden = false;
      });
    // 隐藏
    columnOptions.value
      .filter((o) => !columnCheckedOptions.value.includes(o.value))
      .forEach((o) => {
        o.column.hidden = true;
        o.fixed = undefined;
      });
    // 从 列可选项 更新 全选状态
    isColumnAllSelectedUpdate();

    // 列表列更新
    tableColumnsUpdate();
    // 更新列缓存
    // props.cache && columnOptionsSave();
    // }
  });

  const formUpdate = () => {
    // 从 列可选项 更新 已选列
    columnCheckedOptionsUpdate();

    // 从 列可选项 更新 全选状态
    isColumnAllSelectedUpdate();

    // 列表列更新
    tableColumnsUpdate();
  };

  const init = async () => {
    // 获取数据列
    const columns = getTableColumns();

    // 生成 默认值
    const options: ColumnOptionsType[] = [];
    for (const col of columns) {
      // 只缓存 string 类型的列
      options.push({
        label: typeof col.title === 'string' ? col.title : '',
        value: col.dataIndex ?? '',
        column: {
          hidden: col.hidden,
        },
        fixed: col.fixed,
      });
    }

    // 默认值
    defaultRowSelection = table.getRowSelection();

    // 赋值
    columnOptions.value = cloneDeep(options);
    isRowSelectionShow.value = !!defaultRowSelection;

    formUpdate();
  };

  init();
</script>

<style lang="less" scoped></style>
