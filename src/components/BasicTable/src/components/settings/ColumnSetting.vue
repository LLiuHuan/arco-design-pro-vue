<template>
  <a-tooltip>
    <template #content> <span>列设置</span> </template>
    <div class="cursor-pointer table-toolbar-right-icon">
      <a-popover trigger="click" :width="230" class="toolbar-popover" position="bl">
        <template #content>
          <div class="table-toolbar-inner-popover-title">
            <a-space>
              <a-checkbox v-model:model-value="checkAll" @change="onCheckAll">列展示</a-checkbox>
              <a-checkbox v-model:model-value="selection" @change="onSelection">勾选列</a-checkbox>
              <a-button text type="info" size="small" class="mt-1" @click="resetColumns"
                >重置</a-button
              >
            </a-space>
          </div>
          <a-divider />
          <div class="table-toolbar-inner">
            <a-checkbox-group v-model:model-value="checkList" @change="onChange">
              <Draggable
                v-model="columnsList"
                animation="300"
                item-key="title"
                filter=".no-draggable"
                :move="onMove"
                @end="draggableEnd"
              >
                <template #item="{ element }">
                  <div
                    class="table-toolbar-inner-checkbox"
                    :class="{
                      'table-toolbar-inner-checkbox-dark': true,
                      'no-draggable': element.draggable === false,
                    }"
                  >
                    <span
                      class="drag-icon"
                      :class="{ 'drag-icoa-hidden': element.draggable === false }"
                    >
                      <icon-drag-arrow :size="18" />
                    </span>
                    <a-checkbox v-model:value="element.dataIndex">
                      {{ element.title }}
                    </a-checkbox>
                    <div class="fixed-item">
                      <a-tooltip>
                        <template #content>
                          <span>固定到左侧</span>
                        </template>
                        <icon-to-left
                          size="18"
                          :color="element.fixed === 'left' ? '#2080f0' : undefined"
                          class="cursor-pointer"
                          @click="fixedColumn(element, 'left')"
                        />
                      </a-tooltip>
                      <a-divider direction="vertical" />
                      <a-tooltip>
                        <template #content>
                          <span>固定到右侧</span>
                        </template>
                        <icon-to-right
                          size="18"
                          :color="element.fixed === 'right' ? '#2080f0' : undefined"
                          class="cursor-pointer"
                          @click="fixedColumn(element, 'right')"
                        />
                      </a-tooltip>
                    </div>
                  </div>
                </template>
              </Draggable>
            </a-checkbox-group>
          </div>
        </template>
        <icon-settings :size="18" />
      </a-popover>
    </div>
  </a-tooltip>
</template>

<script lang="ts">
  import { ref, defineComponent, reactive, unref, toRaw, computed, toRefs, watchEffect } from 'vue';
  import { cloneDeep } from 'lodash-es';
  import Draggable from 'vuedraggable/src/vuedraggable';
  import { useTableContext } from '../../hooks/useTableContext';

  interface Options {
    title: string;
    dataIndex: string;
    fixed?: boolean | 'left' | 'right';
  }

  export default defineComponent({
    name: 'ColumnSetting',
    components: {
      Draggable,
    },
    props: {
      selection: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['update:selection'],
    setup(props, { emit }) {
      const table: any = useTableContext();
      const columnsList = ref<Options[]>([]);
      const cacheColumnsList = ref<Options[]>([]);

      const state = reactive({
        selection: props.selection,
        checkAll: true,
        checkList: [] as string[],
        defaultCheckList: [],
      });

      const getSelection = computed(() => {
        return state.selection;
      });

      watchEffect(() => {
        const columns = table.getColumns();
        if (columns.length) {
          init();
        }
      });

      // 初始化
      function init() {
        const columns: any[] = getColumns();
        const checkList: any = columns.map((item) => item.dataIndex);
        state.checkList = checkList;
        state.defaultCheckList = checkList;
        const newColumns = columns.filter(
          (item) => item.dataIndex !== 'action' && item.title !== '操作'
        );
        if (!columnsList.value.length) {
          columnsList.value = cloneDeep(newColumns);
          cacheColumnsList.value = cloneDeep(newColumns);
        }
      }

      // 切换
      function onChange(checkList: any) {
        setColumns(checkList);
      }

      // 设置
      function setColumns(columns: Options[] | string[]) {
        table.setColumns(columns);
      }

      // 获取
      function getColumns() {
        const newRet: any[] = [];
        table.getColumns().forEach((item: Options) => {
          newRet.push({ ...item });
        });
        return newRet;
      }

      // 重置
      function resetColumns() {
        state.checkList = [...state.defaultCheckList];
        state.checkAll = true;
        const cacheColumnsKeys: any[] = table.getCacheColumns();
        const newColumns = cacheColumnsKeys.map((item) => {
          return {
            ...item,
            fixed: undefined,
          };
        });
        setColumns(newColumns);
        columnsList.value = newColumns;
      }

      // 全选
      function onCheckAll(e: string[]) {
        const checkList = table.getCacheColumns(true);
        if (e) {
          setColumns(checkList);
          state.checkList = checkList;
        } else {
          setColumns([]);
          state.checkList = [];
        }
      }

      // 拖拽排序
      function draggableEnd() {
        const newColumns = toRaw(unref(columnsList));
        columnsList.value = newColumns;
        setColumns(newColumns);

        setColumns(
          newColumns.filter((item: Options) => {
            return state.checkList.includes(item.dataIndex);
          })
        );
      }

      // const rowSelection = reactive({
      //   type: 'checkbox',
      //   selectedRowKeys: table.getCacheColumns(),
      // });
      //
      // 勾选列
      function onSelection(e: boolean) {
        emit('update:selection', e);
        // const checkList = table.getCacheColumns();
        // if (e) {
        //   checkList.unshift({ type: 'selection', key: 'selection' });
        //   setColumns(checkList);
        // } else {
        //   checkList.splice(0, 1);
        //   setColumns(checkList);
        // }
      }

      function onMove(e: any) {
        return e.draggedContext.element.draggable !== false;
      }

      // 固定
      function fixedColumn(item: Options, fixed: boolean | 'left' | 'right') {
        if (!state.checkList.includes(item.dataIndex as never)) return;
        const columns = getColumns();
        const isFixed = item.fixed === fixed ? undefined : fixed;
        const index = columns.findIndex((res) => res.dataIndex === item.dataIndex);
        if (index !== -1) {
          columns[index].fixed = isFixed;
        }
        table.setCacheColumnsField(item.dataIndex, { fixed: isFixed });
        columnsList.value[index].fixed = isFixed;
        setColumns(columns);
      }

      return {
        ...toRefs(state),
        columnsList,
        onChange,
        onCheckAll,
        onSelection,
        onMove,
        resetColumns,
        fixedColumn,
        draggableEnd,
        getSelection,
      };
    },
  });
</script>

<style lang="less">
  .table-toolbar {
    &-inner-popover-title {
      padding: 3px 0;
    }

    &-right {
      &-icon {
        margin-left: 12px;
        font-size: 16px;
        color: var(--text-color);
        cursor: pointer;

        :hover {
          color: #1890ff;
        }
      }
    }
  }

  .table-toolbar-inner {
    &-checkbox {
      display: flex;
      align-items: center;
      padding: 10px 14px;

      &:hover {
        background: #e6f7ff;
      }

      .drag-icon {
        display: inline-flex;
        margin-right: 8px;
        cursor: move;
        &-hidden {
          visibility: hidden;
          cursor: default;
        }
      }

      .fixed-item {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        margin-left: auto;
      }

      .ant-checkbox-wrapper {
        flex: 1;

        &:hover {
          color: #1890ff !important;
        }
      }
    }

    &-checkbox-dark {
      &:hover {
        background: hsla(0, 0%, 100%, 0.08);
      }
    }
  }

  .toolbar-popover {
    .a-popover__content {
      padding: 0;
    }
  }
</style>
