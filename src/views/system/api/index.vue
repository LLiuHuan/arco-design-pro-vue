<template>
  <div class="search-box"> 选择区 </div>
  <div class="table-box">
    <a-table
      :data="table.data"
      :pagination="{
        current: table.page,
        onPageSize: table.pageSize,
        size: 'medium',
        total: table.total,
        showTotal: true,
        showPageSize: true,
      }"
      :loading="table.loading"
      @page-change="setPage"
      @page-size-change="setPageSize"
      row-key="ID"
      :row-selection="{
        type: 'checkbox',
        showCheckedAll: true,
      }"
      :bordered="false"
    >
      <template #columns>
        <a-table-column title="ID" data-index="ID" />
        <a-table-column title="API路径" data-index="path" />
        <a-table-column title="API分组" data-index="apiGroup" />
        <a-table-column title="API简介" data-index="description" />
        <a-table-column title="请求" data-index="method">
          <template #cell="{ record }">
            <div> {{ record.method }} / {{ methodFiletr(record.method) }} </div>
          </template>
        </a-table-column>
        <a-table-column title="操作">
          <template #cell="{ record }">
            <a-button>删除</a-button>
          </template>
        </a-table-column>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onBeforeMount, reactive, ref, toRefs } from 'vue';
  import { getApiList } from '@/api/system/api';
  export default defineComponent({
    name: 'SystemApi',
    setup() {
      const methodOptions = [
        {
          value: 'POST',
          label: '创建',
          type: 'success',
        },
        {
          value: 'GET',
          label: '查看',
          type: '',
        },
        {
          value: 'PUT',
          label: '更新',
          type: 'warning',
        },
        {
          value: 'DELETE',
          label: '删除',
          type: 'danger',
        },
      ];

      const state = reactive({
        table: {
          data: ref([]),
          page: 0,
          pageSize: 0,
          total: 0,
          loading: false,
        },
        pageInfo: {
          page: 1,
          pageSize: 10,
        },
      });

      const listApi = async () => {
        state.table.loading = true;

        const res = await getApiList(state.pageInfo);
        [state.table.data, state.table.page, state.table.pageSize, state.table.total] = [
          res.list,
          res.page,
          res.pageSize,
          res.total,
        ];
        state.table.loading = false;
      };

      // 修改页数
      const setPage = (page: number) => {
        state.pageInfo.page = page;

        listApi();
      };

      // 修改每页数量
      const setPageSize = (pageSize: number) => {
        state.pageInfo.pageSize = pageSize;

        listApi();
      };

      const methodFiletr = (value) => {
        const target = methodOptions.filter((item) => item.value === value)[0];
        return target && `${target.label}`;
      };

      onBeforeMount(() => {
        listApi();
      });

      return {
        ...toRefs(state),
        setPage,
        setPageSize,

        methodFiletr,
      };
    },
  });
</script>

<style scoped></style>
