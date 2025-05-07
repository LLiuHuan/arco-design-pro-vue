<!--<template>-->
<!--  <div>-->
<!--    <ACard>-->
<!--      <BasicTable-->
<!--        ref="basicTableRef"-->
<!--        v-model:selected-keys="selectedKeys"-->
<!--        :columns="columns"-->
<!--        :data="data"-->
<!--        :loading="loading"-->
<!--        :pagination="true"-->
<!--        :row-selection="rowSelection"-->
<!--        :scroll="{ x: 2000 }"-->
<!--        :show-selection-bar="true"-->
<!--        :table-setting="{}"-->
<!--        show-table-setting-->
<!--        span-->
<!--        stripe-->
<!--        title="基础表格"-->
<!--        title-help-message="温馨提醒"-->
<!--        @selection-change="sele"-->
<!--      >-->
<!--        <template #toolbar>-->
<!--          <AButton type="primary" @click="toggleLoading"> 开启loading</AButton>-->
<!--          <AButton type="primary" @click="exportAll"> 展开全部</AButton>-->
<!--        </template>-->

<!--        <template #name="{ record }">-->
<!--          <EditableCell v-model:value="record.name" />-->
<!--        </template>-->

<!--        <template #salary="{ record }">-->
<!--          <EditableCell-->
<!--            v-model:value="record.salary"-->
<!--            :number-props="{ step: 100 }"-->
<!--            type="inputNumber"-->
<!--          />-->
<!--        </template>-->
<!--        <template #switch="{ record }">-->
<!--          <EditableCell v-model:value="record.switch" type="switch" />-->
<!--        </template>-->
<!--        <template #select="{ record }">-->
<!--          <EditableCell-->
<!--            v-model:value="record.select"-->
<!--            :select-props="{ options: selectOptions }"-->
<!--            type="select"-->
<!--          />-->
<!--        </template>-->

<!--        <template #optional="{ record }">-->
<!--          <a-button-->
<!--            @click="$modal.info({ title: 'Name', content: record.name })"-->
<!--            >view-->
<!--          </a-button>-->
<!--        </template>-->
<!--      </BasicTable>-->
<!--    </ACard>-->
<!--  </div>-->
<!--</template>-->

<!--<script lang="ts" setup>-->
<!--  import { reactive, ref, unref } from 'vue';-->
<!--  import { BasicTable, EditableCell } from '@/components/Table';-->
<!--  import { TableRowSelection } from '@arco-design/web-vue';-->
<!--  import { BasicColumn } from '@/components/Table/src/types/table';-->

<!--  const basicTableRef = ref<ComponentRef>(null);-->
<!--  const loading = ref(false);-->

<!--  const selectedKeys = ref([]);-->

<!--  const rowSelection = reactive<TableRowSelection>({-->
<!--    type: 'checkbox',-->
<!--    fixed: true,-->
<!--    showCheckedAll: true,-->
<!--  });-->

<!--  defineOptions({ name: 'CompTableBasic' });-->

<!--  const sele = (keys: any) => {-->
<!--    console.log('basic', keys);-->

<!--    // selectedKeys.value = keys;-->
<!--  };-->

<!--  const exportAll = () => {-->
<!--    if (unref(basicTableRef)) {-->
<!--      const { tableElRef } = unref(basicTableRef);-->
<!--      tableElRef?.expandAll();-->
<!--    }-->
<!--  };-->
<!--  //-->
<!--  // const sele1 = (rowKeys: any) => {-->
<!--  //   console.log('rowKeys', rowKeys);-->
<!--  // };-->

<!--  const columns: BasicColumn[] = [-->
<!--    {-->
<!--      title: 'Name',-->
<!--      dataIndex: 'name',-->
<!--      slotName: 'name',-->
<!--      helpMessage: '123 helpMessage',-->
<!--    },-->
<!--    {-->
<!--      title: 'Salary',-->
<!--      dataIndex: 'salary',-->
<!--      slotName: 'salary',-->
<!--      helpMessage: ['123 helpMessage', '456 helpMessage'],-->
<!--    },-->
<!--    {-->
<!--      title: 'Address',-->
<!--      dataIndex: 'address',-->
<!--    },-->
<!--    {-->
<!--      title: 'Email',-->
<!--      dataIndex: 'email',-->
<!--    },-->
<!--    {-->
<!--      title: 'Switch',-->
<!--      dataIndex: 'switch',-->
<!--      slotName: 'switch',-->
<!--    },-->
<!--    {-->
<!--      title: 'select',-->
<!--      dataIndex: 'select',-->
<!--      slotName: 'select',-->
<!--    },-->
<!--    {-->
<!--      title: 'Optional',-->
<!--      slotName: 'optional',-->
<!--      fixed: 'right',-->
<!--      width: 150,-->
<!--    },-->
<!--  ];-->

<!--  const selectOptions = [-->
<!--    { label: 'Jack', value: '1' },-->
<!--    { label: 'Lucy', value: '2' },-->
<!--    { label: 'disabled', value: '3', disabled: true },-->
<!--  ];-->

<!--  const data = reactive([-->
<!--    {-->
<!--      key: '1',-->
<!--      name: 'Jane Doe',-->
<!--      salary: 23000,-->
<!--      address: '32 Park Road, London',-->
<!--      email: 'jane.doe@example.com',-->
<!--      switch: false,-->
<!--      select: '1',-->
<!--    },-->
<!--  ]);-->

<!--  const toggleLoading = () => {-->
<!--    loading.value = true;-->
<!--    setTimeout(() => {-->
<!--      loading.value = false;-->
<!--    }, 3000);-->
<!--  };-->
<!--</script>-->

<!--<style lang="less" scoped></style>-->

<template>
  {{ name }}
</template>

<script lang="ts" setup>
  const name = '';
</script>

<style lang="less" scoped></style>
