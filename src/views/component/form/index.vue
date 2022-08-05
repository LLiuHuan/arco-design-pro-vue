<template>
  <div>
    <h1>Form</h1>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped></style>

<!--<template>-->
<!--  <div>-->
<!--    <a-card :bordered="false">-->
<!--      <BasicForm @register="register" @submit="submit" @reset="reset" />-->
<!--    </a-card>-->
<!--    <a-card :bordered="false">-->
<!--      {{ selectedRowKeys }}-->
<!--      <BasicTable-->
<!--        title="哈哈哈"-->
<!--        titleTooltip="提示啊"-->
<!--        size="12"-->
<!--        :columns="columns"-->
<!--        :request="data"-->
<!--        row-key="id"-->
<!--        :pagination="{ total: 2 }"-->
<!--        @update:selected-keys="test"-->
<!--      >-->
<!--        <template #leftOperation>-->
<!--          <a-button type="primary">添加</a-button>-->
<!--        </template>-->
<!--      </BasicTable>-->
<!--    </a-card>-->

<!--    <a-space direction="vertical" size="large" fill>-->
<!--      <div>-->
<!--        <span>OnlyCurrent: </span>-->
<!--        <a-switch v-model="rowSelection.onlyCurrent" />-->
<!--      </div>-->
<!--      <a-table-->
<!--        row-key="name"-->
<!--        :columns="columns1"-->
<!--        :data="data1"-->
<!--        :row-selection="rowSelection1"-->
<!--        v-model:selectedKeys="selectedKeys"-->
<!--        :pagination="pagination1"-->
<!--      />-->
<!--    </a-space>-->
<!--  </div>-->
<!--</template>-->

<!--<script lang="ts" setup>-->
<!--  import { h, reactive, ref } from 'vue';-->
<!--  import { Tag } from '@arco-design/web-vue';-->
<!--  import { BasicForm, FormSchema, useForm } from '@/components/BasicForm';-->
<!--  import { BasicTable } from '@/components/BasicTable';-->

<!--  const selectedRowKeys = ref([1, 2]);-->

<!--  const test = (keys: any[]) => {-->
<!--    selectedRowKeys.value = keys;-->
<!--  };-->
<!--  const methodOptions = [-->
<!--    {-->
<!--      value: 'POST',-->
<!--      label: '创建(POST)',-->
<!--      type: 'success',-->
<!--    },-->
<!--    {-->
<!--      value: 'GET',-->
<!--      label: '查看(GET)',-->
<!--      type: '',-->
<!--    },-->
<!--    {-->
<!--      value: 'PUT',-->
<!--      label: '更新(PUT)',-->
<!--      type: 'warning',-->
<!--    },-->
<!--    {-->
<!--      value: 'DELETE',-->
<!--      label: '删除(DELETE)',-->
<!--      type: 'danger',-->
<!--    },-->
<!--  ];-->

<!--  const state = reactive({-->
<!--    table: {-->
<!--      data: ref([]),-->
<!--      page: 0,-->
<!--      pageSize: 0,-->
<!--      total: 0,-->
<!--      loading: false,-->
<!--      selectKeys: [],-->
<!--    },-->
<!--    pageInfo: {-->
<!--      page: 1,-->
<!--      pageSize: 10,-->
<!--    },-->
<!--    model: {-->
<!--      visible: false,-->
<!--      title: '',-->
<!--      type: '',-->
<!--      form: {-->
<!--        path: '',-->
<!--        apiGroup: '',-->
<!--        method: '',-->
<!--        description: '',-->
<!--      },-->
<!--      rules: {-->
<!--        path: [{ required: true, message: '请输入api路径', trigger: 'blur' }],-->
<!--        apiGroup: [{ required: true, message: '请输入组名称', trigger: 'blur' }],-->
<!--        method: [{ required: true, message: '请选择请求方式', trigger: 'blur' }],-->
<!--        description: [{ required: true, message: '请输入api介绍', trigger: 'blur' }],-->
<!--      },-->
<!--    },-->
<!--    search: {},-->
<!--  });-->

<!--  const schemas: FormSchema[] = [-->
<!--    {-->
<!--      field: 'path',-->
<!--      labelMessage: '这是一个提示',-->
<!--      component: 'AInput',-->
<!--      label: '路径',-->
<!--      componentProps: {-->
<!--        placeholder: '请输入路径',-->
<!--      },-->
<!--      gridItemProps: { span: 8 },-->
<!--    },-->
<!--    {-->
<!--      field: 'description',-->
<!--      component: 'AInput',-->
<!--      label: '描述',-->
<!--      componentProps: {-->
<!--        placeholder: '请输入描述',-->
<!--      },-->
<!--      gridItemProps: { span: 8 },-->
<!--    },-->
<!--    {-->
<!--      field: 'apiGroup',-->
<!--      component: 'AInput',-->
<!--      label: 'API组',-->
<!--      componentProps: {-->
<!--        placeholder: '请输入API组',-->
<!--      },-->
<!--      gridItemProps: { span: 8 },-->
<!--    },-->
<!--    {-->
<!--      field: 'method',-->
<!--      component: 'ASelect',-->
<!--      label: '请求',-->
<!--      componentProps: {-->
<!--        placeholder: '请选择请求',-->
<!--        options: methodOptions,-->
<!--      },-->
<!--      gridItemProps: { span: 8 },-->
<!--    },-->
<!--  ];-->

<!--  // eslint-disable-next-line no-empty-pattern-->
<!--  const [register, {}] = useForm({-->
<!--    formProps: { layout: 'inline' },-->
<!--    gridProps: { cols: 24 },-->
<!--    schemas,-->
<!--  });-->

<!--  const submit = (value: object) => {-->
<!--    state.pageInfo.page = 1;-->
<!--    state.pageInfo.pageSize = 10;-->
<!--    state.search = value;-->
<!--  };-->

<!--  const reset = () => {-->
<!--    state.search = {};-->
<!--  };-->

<!--  const columns = [-->
<!--    {-->
<!--      title: '名称',-->
<!--      dataIndex: 'name',-->
<!--      width: 100,-->
<!--      // 默认必填校验-->
<!--      // editRule: true,-->
<!--      edit: true,-->
<!--    },-->
<!--    {-->
<!--      title: 'id',-->
<!--      dataIndex: 'id',-->
<!--      width: 100,-->
<!--      sortable: {-->
<!--        sortDirections: ['ascend', 'descend'],-->
<!--      },-->
<!--    },-->
<!--    {-->
<!--      title: '状态',-->
<!--      dataIndex: 'status',-->
<!--      width: 100,-->
<!--      render(data: any) {-->
<!--        const { record } = data;-->
<!--        return h(-->
<!--          Tag,-->
<!--          {-->
<!--            color: record.status ? 'green' : 'red',-->
<!--          },-->
<!--          {-->
<!--            default: () => (record.status ? '启用' : '禁用'),-->
<!--          }-->
<!--        );-->
<!--      },-->
<!--    },-->
<!--  ];-->

<!--  const data = () => {-->
<!--    return new Promise((resolve, reject) => {-->
<!--      setTimeout(() => {-->
<!--        resolve({-->
<!--          page: 1,-->
<!--          pageSize: 20,-->
<!--          list: [-->
<!--            {-->
<!--              id: 1,-->
<!--              name: '张三',-->
<!--              status: true,-->
<!--            },-->
<!--            {-->
<!--              id: 2,-->
<!--              name: '李四',-->
<!--              status: false,-->
<!--            },-->
<!--          ],-->
<!--          total: 2,-->
<!--        });-->
<!--      }, 1000);-->
<!--    });-->
<!--  };-->

<!--  const rowSelection = reactive({-->
<!--    type: 'checkbox',-->
<!--    showCheckedAll: true,-->
<!--    // onlyCurrent: false,-->
<!--    // selectedRowKeys: selectedKeys,-->
<!--  });-->

<!--  const selectedKeys = ref(['1', '2']);-->

<!--  const rowSelection1 = reactive({-->
<!--    type: 'checkbox',-->
<!--    showCheckedAll: true,-->
<!--    onlyCurrent: false,-->
<!--  });-->
<!--  const pagination1 = { pageSize: 5 };-->

<!--  const columns1 = [-->
<!--    {-->
<!--      title: 'Name',-->
<!--      dataIndex: 'name',-->
<!--    },-->
<!--    {-->
<!--      title: 'Salary',-->
<!--      dataIndex: 'salary',-->
<!--    },-->
<!--    {-->
<!--      title: 'Address',-->
<!--      dataIndex: 'address',-->
<!--    },-->
<!--    {-->
<!--      title: 'Email',-->
<!--      dataIndex: 'email',-->
<!--    },-->
<!--  ];-->
<!--  const data1 = reactive([-->
<!--    {-->
<!--      key: '1',-->
<!--      name: 'Jane Doe',-->
<!--      salary: 23000,-->
<!--      address: '32 Park Road, London',-->
<!--      email: 'jane.doe@example.com',-->
<!--    },-->
<!--    {-->
<!--      key: '2',-->
<!--      name: 'Alisa Ross',-->
<!--      salary: 25000,-->
<!--      address: '35 Park Road, London',-->
<!--      email: 'alisa.ross@example.com',-->
<!--    },-->
<!--    {-->
<!--      key: '3',-->
<!--      name: 'Kevin Sandra',-->
<!--      salary: 22000,-->
<!--      address: '31 Park Road, London',-->
<!--      email: 'kevin.sandra@example.com',-->
<!--      disabled: true,-->
<!--    },-->
<!--    {-->
<!--      key: '4',-->
<!--      name: 'Ed Hellen',-->
<!--      salary: 17000,-->
<!--      address: '42 Park Road, London',-->
<!--      email: 'ed.hellen@example.com',-->
<!--    },-->
<!--    {-->
<!--      key: '5',-->
<!--      name: 'William Smith',-->
<!--      salary: 27000,-->
<!--      address: '62 Park Road, London',-->
<!--      email: 'william.smith@example.com',-->
<!--    },-->
<!--    {-->
<!--      key: '6',-->
<!--      name: 'Jane Doe 2',-->
<!--      salary: 15000,-->
<!--      address: '32 Park Road, London',-->
<!--      email: 'jane.doe@example.com',-->
<!--    },-->
<!--    {-->
<!--      key: '7',-->
<!--      name: 'Alisa Ross 2',-->
<!--      salary: 28000,-->
<!--      address: '35 Park Road, London',-->
<!--      email: 'alisa.ross@example.com',-->
<!--    },-->
<!--    {-->
<!--      key: '8',-->
<!--      name: 'Kevin Sandra 2',-->
<!--      salary: 26000,-->
<!--      address: '31 Park Road, London',-->
<!--      email: 'kevin.sandra@example.com',-->
<!--    },-->
<!--    {-->
<!--      key: '9',-->
<!--      name: 'Ed Hellen 2',-->
<!--      salary: 18000,-->
<!--      address: '42 Park Road, London',-->
<!--      email: 'ed.hellen@example.com',-->
<!--    },-->
<!--    {-->
<!--      key: '10',-->
<!--      name: 'William Smith 2',-->
<!--      salary: 12000,-->
<!--      address: '62 Park Road, London',-->
<!--      email: 'william.smith@example.com',-->
<!--    },-->
<!--  ]);-->
<!--</script>-->

<!--<style scoped></style>-->
