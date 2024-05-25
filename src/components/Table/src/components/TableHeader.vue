<template>
  <div class="w-full">
    <slot v-if="$slots.tableTitle" name="tableTitle"></slot>
    <div v-if="showSelectionBar" class="m-5px">
      <TableSelectionBar
        :clear-selected-row-keys="props.clearSelectedRowKeys!"
        :count="props.count"
      ></TableSelectionBar>
    </div>
    <div class="flex items-center">
      <TableTitle
        v-if="!$slots.tableTitle && title"
        v-bind="getProps"
      ></TableTitle>

      <div class="flex-auto flex justify-end items-center [&>*]:m-8px">
        <slot name="toolbar"></slot>
        <ADivider
          v-if="$slots.toolbar && showTableSetting"
          direction="vertical"
        ></ADivider>
        <TableSettingComponent
          v-if="showTableSetting"
          :setting="tableSetting"
          @columns-change="handleColumnChange"
        ></TableSettingComponent>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import TableSettingComponent from './settings/index.vue';
  import TableTitle from './TableTitle.vue';
  import TableSelectionBar from './TableSelectionBar.vue';
  import {
    ColumnChangeParam,
    TableActionType,
    TableSetting,
  } from '../types/table';

  interface Props {
    // 标题
    title?: string | ((data: any) => string);
    // 标题帮助信息
    titleHelpMessage?: string | string[];
    // 标题前是否显示块
    span?: boolean;
    // 普通标题
    normal?: boolean;
    // 表格设置配置
    tableSetting?: TableSetting;
    // 显示表格设置
    showTableSetting?: boolean;
    // 显示选中条的数量
    showSelectionBar?: boolean;
    // 清除选中的行
    clearSelectedRowKeys?: TableActionType['clearSelectedRowKeys'];
    // 选中的数量
    count?: number;
  }

  const props = withDefaults(defineProps<Props>(), {
    showTableSetting: true,
  });
  const emit = defineEmits(['columnsChange']);

  const getProps = computed(() => {
    return { ...props };
  });

  /**
   * @description 表格列设置
   * @description Column change event
   * @param data
   */
  function handleColumnChange(data: ColumnChangeParam[]) {
    emit('columnsChange', data);
  }
</script>

<style lang="less" scoped></style>
