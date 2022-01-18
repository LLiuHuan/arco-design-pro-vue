<template>
  <div class="search-box">
    <BasicForm @register="register" @submit="submit" @reset="reset" />
  </div>

  <div class="table-box">
    <a-space class="btn-list pb-3">
      <a-popconfirm @ok="onDeleteIds" content="确定要删除吗？">
        <a-button type="outline">删除</a-button>
      </a-popconfirm>
    </a-space>

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
      @selection-change="(keys) => (table.selectKeys = keys)"
    >
      <template #columns>
        <a-table-column title="操作人" data-index="userName">
          <template #cell="{ record }">
            <div>{{ record.user.userName }}({{ record.user.nickName }})</div>
          </template>
        </a-table-column>
        <a-table-column title="日期" data-index="CreatedAt">
          <template #cell="{ record }">{{ record.CreatedAt }}</template>
        </a-table-column>
        <a-table-column title="状态码" data-index="status">
          <template #cell="{ record }">
            <div>
              <a-tag v-if="record.status === 200" color="green">{{ record.status }}</a-tag>
              <a-tag v-else color="red">{{ record.status }}</a-tag>
            </div>
          </template>
        </a-table-column>
        <a-table-column title="请求IP" data-index="ip" width="120" />
        <a-table-column title="请求方法" data-index="method" width="120" />
        <a-table-column title="请求路径" data-index="path" width="240" />
        <a-table-column title="请求" data-index="body">
          <template #cell="{ record }">
            <div>
              <a-popover v-if="record.body" position="left" trigger="click">
                <IconExclamationCircle />
                <template #content>
                  <div class="popover-box">
                    <pre>{{ fmtBody(record.body) }}</pre>
                  </div>
                </template>
              </a-popover>
              <span v-else>无</span>
            </div>
          </template>
        </a-table-column>
        <a-table-column title="响应" data-index="resp">
          <template #cell="{ record }">
            <div>
              <a-popover v-if="record.resp" position="left" trigger="click">
                <IconExclamationCircle />
                <template #content>
                  <div class="popover-box">
                    <pre>{{ fmtBody(record.resp) }}</pre>
                  </div>
                </template>
              </a-popover>
              <span v-else>无</span>
            </div>
          </template>
        </a-table-column>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onBeforeMount, reactive, ref, toRefs } from 'vue';
  import {
    deleteSysOperationRecordByIds,
    getSysOperationRecordList,
  } from '@/api/system/operation-record';
  import { IconExclamationCircle } from '@arco-design/web-vue/es/icon';
  import { BasicForm, FormSchema, useForm } from '@/components/BasicForm';
  import { Message } from '@arco-design/web-vue';

  export default defineComponent({
    name: 'OperationRecord',
    components: {
      IconExclamationCircle,
      BasicForm,
    },
    setup() {
      const state = reactive({
        table: {
          data: ref([]),
          page: 0,
          pageSize: 0,
          total: 0,
          loading: false,
          selectKeys: [],
        },
        pageInfo: {
          page: 1,
          pageSize: 10,
        },
        search: {},
      });

      const listOperationRecord = async () => {
        state.table.loading = true;

        const res = await getSysOperationRecordList({ ...state.pageInfo, ...state.search });
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

        listOperationRecord();
      };

      // 修改每页数量
      const setPageSize = (pageSize: number) => {
        state.pageInfo.pageSize = pageSize;

        listOperationRecord();
      };

      const fmtBody = (value) => {
        try {
          return JSON.parse(value);
        } catch (err) {
          return value;
        }
      };

      const schemas: FormSchema[] = [
        {
          field: 'method',
          component: 'AInput',
          label: '请求方法',
          componentProps: {
            placeholder: '请输入请求方法',
          },
          gridItemProps: { span: 8 },
        },
        {
          field: 'path',
          component: 'AInput',
          label: '请求路径',
          componentProps: {
            placeholder: '请输入请求路径',
          },
          gridItemProps: { span: 8 },
        },
        {
          field: 'status',
          component: 'AInput',
          label: '结果状态码',
          componentProps: {
            placeholder: '请输入结果状态码',
          },
          gridItemProps: { span: 8 },
          labelColProps: { span: 6 },
          wrapperColProps: { span: 14 },
        },
      ];

      const [register, {}] = useForm({
        formProps: { layout: 'inline' },
        gridProps: { cols: 24 },
        schemas,
      });

      const submit = (value) => {
        state.pageInfo.page = 1;
        state.pageInfo.pageSize = 10;
        state.search = value;
        listOperationRecord();
      };

      const reset = () => {
        state.search = {};
      };

      const onDeleteIds = async () => {
        const res = await deleteSysOperationRecordByIds({ ids: state.table.selectKeys });
        if (res) {
          Message.success('删除成功！');
          const { data, selectKeys } = state.table;
          if (data.length === selectKeys.length && state.pageInfo.page > 1) {
            state.pageInfo.page--;
          }
          await listOperationRecord();
        }
      };

      onBeforeMount(() => {
        listOperationRecord();
      });

      return {
        ...toRefs(state),
        setPage,
        setPageSize,

        fmtBody,

        register,
        submit,
        reset,

        onDeleteIds,
      };
    },
  });
</script>

<style lang="less" scoped>
  .popover-box {
    background: #112435;
    color: #f08047;
    height: 600px;
    width: 420px;
    overflow: auto;
  }
  .popover-box::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
</style>
