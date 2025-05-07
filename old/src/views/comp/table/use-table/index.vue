<!--<template>-->
<!--  <div>-->
<!--    <BasicTable @register="registerTable" />-->
<!--  </div>-->
<!--</template>-->

<!--<script lang="ts" setup>-->
<!--  import { BasicTable, useTable } from '@/components/Table';-->
<!--  import { BasicColumn } from '@/components/Table/src/types/table';-->

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

<!--  // const selectOptions = [-->
<!--  //   { label: 'Jack', value: '1' },-->
<!--  //   { label: 'Lucy', value: '2' },-->
<!--  //   { label: 'disabled', value: '3', disabled: true },-->
<!--  // ];-->
<!--  //-->
<!--  // const data = reactive([-->
<!--  //   {-->
<!--  //     key: '1',-->
<!--  //     name: 'Jane Doe',-->
<!--  //     salary: 23000,-->
<!--  //     address: '32 Park Road, London',-->
<!--  //     email: 'jane.doe@example.com',-->
<!--  //     select: '1',-->
<!--  //   },-->
<!--  //   {-->
<!--  //     key: '2',-->
<!--  //     name: 'Alisa Ross',-->
<!--  //     salary: 25000,-->
<!--  //     address: '35 Park Road, London',-->
<!--  //     email: 'alisa.ross@example.com',-->
<!--  //   },-->
<!--  //   {-->
<!--  //     key: '3',-->
<!--  //     name: 'Kevin Sandra',-->
<!--  //     salary: 22000,-->
<!--  //     address: '31 Park Road, London',-->
<!--  //     email: 'kevin.sandra@example.com',-->
<!--  //   },-->
<!--  //   {-->
<!--  //     key: '4',-->
<!--  //     name: 'Ed Hellen',-->
<!--  //     salary: 17000,-->
<!--  //     address: '42 Park Road, London',-->
<!--  //     email: 'ed.hellen@example.com',-->
<!--  //   },-->
<!--  //   {-->
<!--  //     key: '5',-->
<!--  //     name: 'William Smith',-->
<!--  //     salary: 27000,-->
<!--  //     address: '62 Park Road, London',-->
<!--  //     email: 'william.smith@example.com',-->
<!--  //   },-->
<!--  // ]);-->

<!--  const [registerTable, {}] = useTable({-->
<!--    title: 'useTable示例',-->
<!--    columns,-->
<!--    // data,-->
<!--  });-->
<!--</script>-->

<!--<style lang="less" scoped></style>-->

<template>
  {{ name }}
</template>

<script lang="ts" setup>
  const name = '';
</script>

<style lang="less" scoped></style>
