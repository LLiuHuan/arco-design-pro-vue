<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-07-31 22:05:18
 * @LastEditTime: 2025-07-31 22:07:53
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import type { VxeGridProps } from '#/adapter/vxe-table';

import { Page } from '@arco/common-ui';

import { Button } from '@arco-design/web-vue';

import { useArcoVxeGrid } from '#/adapter/vxe-table';

import { MOCK_TREE_TABLE_DATA } from './table-data';

interface RowType {
  date: string;
  id: number;
  name: string;
  parentId: null | number;
  size: number;
  type: string;
}

const gridOptions: VxeGridProps<RowType> = {
  columns: [
    { type: 'seq', width: 70 },
    { field: 'name', minWidth: 300, title: 'Name', treeNode: true },
    { field: 'size', title: 'Size' },
    { field: 'type', title: 'Type' },
    { field: 'date', title: 'Date' },
  ],
  data: MOCK_TREE_TABLE_DATA,
  pagerConfig: {
    enabled: false,
  },
  treeConfig: {
    parentField: 'parentId',
    rowField: 'id',
    transform: true,
  },
};

const [Grid, gridApi] = useArcoVxeGrid({ gridOptions });

const expandAll = () => {
  gridApi.grid?.setAllTreeExpand(true);
};

const collapseAll = () => {
  gridApi.grid?.setAllTreeExpand(false);
};
</script>

<template>
  <Page>
    <Grid table-title="数据列表" table-title-help="提示">
      <template #toolbar-tools>
        <Button class="mr-2" type="primary" @click="expandAll">
          展开全部
        </Button>
        <Button type="primary" @click="collapseAll"> 折叠全部 </Button>
      </template>
    </Grid>
  </Page>
</template>
