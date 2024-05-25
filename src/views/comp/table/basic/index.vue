<template>
  <div>
    <ACard>
      <BasicTable
        ref="basicTableRef"
        v-model:selected-keys="selectedKeys"
        :columns="columns"
        :data="data"
        :loading="loading"
        :pagination="true"
        :row-selection="rowSelection"
        :scroll="{ x: 2000 }"
        :show-selection-bar="true"
        :table-setting="{}"
        show-table-setting
        span
        stripe
        title="基础表格"
        title-help-message="温馨提醒"
        @selection-change="sele"
      >
        <template #toolbar>
          <AButton type="primary" @click="toggleLoading"> 开启loading</AButton>
          <AButton type="primary" @click="exportAll"> 展开全部</AButton>
        </template>
        <template #optional="{ record }">
          <a-button
            @click="$modal.info({ title: 'Name', content: record.name })"
            >view
          </a-button>
        </template>
      </BasicTable>
    </ACard>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, unref } from 'vue';
  import { BasicTable } from '@/components/Table';
  import { ComponentRef } from '~/types/global';

  const basicTableRef = ref<ComponentRef>(null);
  const loading = ref(false);

  const selectedKeys = ref([]);

  const rowSelection = reactive({
    type: 'checkbox',
    fixed: true,
    showCheckedAll: true,
  });

  defineOptions({ name: 'CompTableBasic' });

  const sele = (keys: any) => {
    console.log('basic', keys);

    // selectedKeys.value = keys;
  };

  const exportAll = () => {
    console.log('exportAll');
    if (unref(basicTableRef)) {
      console.log(unref(basicTableRef));
      const { tableElRef } = unref(basicTableRef);
      tableElRef?.expandAll();
    }
  };
  //
  // const sele1 = (rowKeys: any) => {
  //   console.log('rowKeys', rowKeys);
  // };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      helpMessage: '123 helpMessage',
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      helpMessage: ['123 helpMessage', '456 helpMessage'],
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Optional',
      slotName: 'optional',
      fixed: 'right',
      width: 150,
    },
  ];
  const data = [
    {
      key: '1',
      name: 'Jane Doe',
      salary: 23000,
      address: '32 Park Road, London',
      email: 'jane.doe@example.com',
      children: [
        {
          key: '2',
          name: 'Alisa Ross',
          salary: 25000,
          address: '35 Park Road, London',
          email: 'alisa.ross@example.com',
          children: [
            {
              key: '3',
              name: 'Ed Hellen',
              salary: 17000,
              address: '42 Park Road, London',
              email: 'ed.hellen@example.com',
            },
            {
              key: '4',
              name: 'William Smith',
              salary: 27000,
              address: '62 Park Road, London',
              email: 'william.smith@example.com',
            },
          ],
        },
        {
          key: '5',
          name: 'Alisa Ross',
          salary: 25000,
          address: '35 Park Road, London',
          email: 'alisa.ross@example.com',
        },
      ],
    },
    {
      key: '6',
      name: 'Alisa Ross',
      salary: 25000,
      address: '35 Park Road, London',
      email: 'alisa.ross@example.com',
    },
    {
      key: '7',
      name: 'Kevin Sandra',
      salary: 22000,
      address: '31 Park Road, London',
      email: 'kevin.sandra@example.com',
    },
    {
      key: '8',
      name: 'Ed Hellen',
      salary: 17000,
      address: '42 Park Road, London',
      email: 'ed.hellen@example.com',
    },
    {
      key: '9',
      name: 'William Smith',
      salary: 27000,
      address: '62 Park Road, London',
      email: 'william.smith@example.com',
      children: [],
    },
  ];

  const toggleLoading = () => {
    console.log('loading');
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
    }, 3000);
  };
</script>

<style lang="less" scoped></style>
