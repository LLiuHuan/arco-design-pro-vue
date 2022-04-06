<template>
  <div class="search-box">
    <BasicForm @register="register" @submit="submit" @reset="reset" />
  </div>
  <div class="table-box">
    <a-space class="btn-list pb-3">
      <a-button type="outline" @click="openModel('addApi')">新增</a-button>
      <a-popconfirm @ok="onDelete" content="确定要删除吗？">
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
        <a-table-column title="ID" data-index="ID" />
        <a-table-column title="API路径" data-index="path" />
        <a-table-column title="API分组" data-index="apiGroup" />
        <a-table-column title="API简介" data-index="description" />
        <a-table-column title="请求" data-index="method">
          <template #cell="{ record }">
            <div> {{ methodFiletr(record.method) }} </div>
          </template>
        </a-table-column>
        <a-table-column title="操作">
          <template #cell="{ record }">
            <a-button type="text" @click="editApi(record)">编辑</a-button>
            <a-popconfirm
              content="此操作将永久删除所有角色下该api, 是否继续?"
              okText="确定"
              cancelText="取消"
              @ok="removeApi(record)"
            >
              <a-button type="text">删除</a-button>
            </a-popconfirm>
          </template>
        </a-table-column>
      </template>
    </a-table>
  </div>

  <a-modal width="auto" v-model:visible="model.visible" :mask-closable="false">
    <template #title> {{ model.title }} </template>
    <div class="pb-4">
      <a-alert type="warning">新增API，需要在角色管理内配置权限才可使用</a-alert>
    </div>
    <a-form ref="modelForm" :model="model.form" :rules="model.rules">
      <a-form-item field="path" label="路径">
        <a-input v-model="model.form.path" placeholder="请输入api路径" />
      </a-form-item>
      <a-form-item field="method" label="请求">
        <a-select
          v-model:model-value="model.form.method"
          :style="{ width: '100%' }"
          placeholder="请选择api请求"
        >
          <a-option
            v-for="(item, index) in methodOptions"
            :key="index"
            :label="`${item.label}`"
            :value="item.value"
          />
        </a-select>
      </a-form-item>
      <a-form-item field="apiGroup" label="api分组">
        <a-input v-model="model.form.apiGroup" placeholder="请输入api分组" />
      </a-form-item>
      <a-form-item field="description" label="api简介">
        <a-input v-model="model.form.description" placeholder="请输入api简介" />
      </a-form-item>
    </a-form>
    <template #footer>
      <a-space>
        <a-button @click="closeModel">取 消</a-button>
        <a-button type="primary" @click="enterModel">确 定</a-button>
      </a-space>
    </template>
  </a-modal>
</template>

<script lang="ts">
  import { defineComponent, onBeforeMount, reactive, ref, toRefs } from 'vue';
  import {
    createApi,
    deleteApi,
    deleteApisByIds,
    getApiById,
    getApiList,
    updateApi,
  } from '@/api/system/api';
  import { Message } from '@arco-design/web-vue';
  import { BasicForm, FormSchema, useForm } from '@/components/BasicForm';
  export default defineComponent({
    name: 'SystemApi',
    components: {
      BasicForm,
    },
    setup() {
      const modelForm = ref();
      const methodOptions = [
        {
          value: 'POST',
          label: '创建(POST)',
          type: 'success',
        },
        {
          value: 'GET',
          label: '查看(GET)',
          type: '',
        },
        {
          value: 'PUT',
          label: '更新(PUT)',
          type: 'warning',
        },
        {
          value: 'DELETE',
          label: '删除(DELETE)',
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
          selectKeys: [],
        },
        pageInfo: {
          page: 1,
          pageSize: 10,
        },
        model: {
          visible: false,
          title: '',
          type: '',
          form: {
            path: '',
            apiGroup: '',
            method: '',
            description: '',
          },
          rules: {
            path: [{ required: true, message: '请输入api路径', trigger: 'blur' }],
            apiGroup: [{ required: true, message: '请输入组名称', trigger: 'blur' }],
            method: [{ required: true, message: '请选择请求方式', trigger: 'blur' }],
            description: [{ required: true, message: '请输入api介绍', trigger: 'blur' }],
          },
        },
        search: {},
      });

      const schemas: FormSchema[] = [
        {
          field: 'path',
          labelMessage: '这是一个提示',
          component: 'Input',
          label: '路径',
          componentProps: {
            placeholder: '请输入路径',
          },
          gridItemProps: { span: 8 },
        },
        {
          field: 'description',
          component: 'Input',
          label: '描述',
          componentProps: {
            placeholder: '请输入描述',
          },
          gridItemProps: { span: 8 },
        },
        {
          field: 'apiGroup',
          component: 'Input',
          label: 'API组',
          componentProps: {
            placeholder: '请输入API组',
          },
          gridItemProps: { span: 8 },
        },
        {
          field: 'method',
          component: 'Select',
          label: '请求',
          componentProps: {
            placeholder: '请选择请求',
            options: methodOptions,
          },
          gridItemProps: { span: 8 },
        },
      ];

      const [register, {}] = useForm({
        formProps: { layout: 'inline' },
        gridProps: { cols: 24 },
        schemas,
      });

      const listApi = async () => {
        state.table.loading = true;

        const res = await getApiList({ ...state.pageInfo, ...state.search });
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

      // region 添加和修改
      const openModel = (type: string) => {
        switch (type) {
          case 'addApi':
            state.model.title = '新增Api';
            break;
          case 'edit':
            state.model.title = '编辑Api';
            break;
          default:
            break;
        }

        state.model.type = type;
        state.model.visible = true;
      };

      const editApi = async (row) => {
        const data = await getApiById(row.ID);
        state.model.form = data.api;
        openModel('edit');
      };

      const removeApi = async (row) => {
        await deleteApi(row);
        Message.success('删除成功!');

        if (state.table.data.length === 1 && state.pageInfo.page > 1) {
          state.pageInfo.page--;
        }
        await listApi();
      };

      const initForm = () => {
        modelForm.value.resetFields();
        modelForm.value.clearValidate();
        state.model.form = {
          path: '',
          apiGroup: '',
          method: '',
          description: '',
        };
      };
      const closeModel = () => {
        initForm();
        state.model.visible = false;
      };

      const enterModel = async () => {
        modelForm.value.validate().then(async (res) => {
          if (res) {
            return;
          }

          switch (state.model.type) {
            case 'addApi':
              {
                await createApi(state.model.form);
                Message.success('添加成功');
                await listApi();
                closeModel();
              }

              break;
            case 'edit':
              {
                await updateApi(state.model.form);
                Message.success('修改成功');
                await listApi();
                closeModel();
              }
              break;
            default:
              // eslint-disable-next-line no-lone-blocks
              {
                Message.error('未知操作');
              }
              break;
          }
        });
      };
      // endregion

      const onDelete = async () => {
        const res = await deleteApisByIds({ ids: state.table.selectKeys });
        if (res) {
          Message.success('删除成功！');
          const { data, selectKeys } = state.table;
          if (data.length === selectKeys.length && state.pageInfo.page > 1) {
            state.pageInfo.page--;
          }
          await listApi();
        }
      };

      const submit = (value) => {
        state.pageInfo.page = 1;
        state.pageInfo.pageSize = 10;
        state.search = value;
        listApi();
      };

      const reset = () => {
        state.search = {};
      };

      onBeforeMount(() => {
        listApi();
      });

      return {
        modelForm,
        ...toRefs(state),
        methodOptions,
        setPage,
        setPageSize,

        methodFiletr,

        editApi,
        removeApi,

        openModel,
        closeModel,
        enterModel,
        onDelete,

        register,
        submit,
        reset,
      };
    },
  });
</script>

<style scoped></style>
