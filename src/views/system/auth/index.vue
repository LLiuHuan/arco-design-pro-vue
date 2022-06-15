<template>
  <div>
    <div class="container-main">
      <div class="toolbar">
        <div>
          <!--          v-permission="{ action: ['menu:auth:add'], effect: 'disabled' }"-->
          <a-button type="primary" @click="addAuthority('0')">添加</a-button>
        </div>
      </div>
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
      >
        <template #columns>
          <a-table-column title="角色ID" data-index="authorityId" />
          <a-table-column title="角色名称" data-index="authorityName" />
          <a-table-column title="操作">
            <template #cell="{ record }">
              <a-button type="text" @click="openDrawer(record)">设置权限</a-button>
              <a-button type="text" @click="addAuthority(record.authorityId)">新增子角色</a-button>
              <a-button type="text" @click="copyAuthority(record)">拷贝</a-button>
              <a-button type="text" @click="editAuthority(record)">编辑</a-button>
              <a-popconfirm
                content="此操作将永久删除该角色, 是否继续?"
                position="bottom"
                @ok="deleteAuth(record)"
              >
                <a-button type="text">删除</a-button>
              </a-popconfirm>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </div>

    <a-drawer
      v-if="drawer"
      :visible="drawer"
      @cancel="closeDrawer"
      title="设置角色权限"
      :width="600"
      :footer="false"
      unmountOnClose
    >
      <a-tabs type="text" lazy-load>
        <a-tab-pane key="menus" title="角色菜单">
          <menus :row="activeRow" />
        </a-tab-pane>
        <a-tab-pane key="api" title="角色Api">
          <Apis :row="activeRow" />
        </a-tab-pane>
      </a-tabs>
    </a-drawer>

    <OperationModel
      ref="operationModel"
      v-model:model-title="model.modelTitle"
      v-model:model-type="model.modelType"
      :row="model.form"
      :table-data="table.data"
      @close="closeModel"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, onBeforeMount, reactive, ref, toRefs } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import { deleteAuthority, getAuthorityList } from '@/api/system/auth';
  import { authorityInfo } from '@/api/system/auth-types';
  import Menus from './components/menus.vue';
  import Apis from './components/apis.vue';
  import OperationModel from './components/operationModel.vue';

  export default defineComponent({
    name: 'SystemAuth',
    components: {
      Menus,
      Apis,
      OperationModel,
    },
    setup() {
      const operationModel = ref();
      const state = reactive({
        table: {
          data: ref<Array<authorityInfo>>([]),
          page: 0,
          pageSize: 0,
          total: 0,
          loading: false,
        },
        pageInfo: {
          page: 1,
          pageSize: 10,
        },
        drawer: false,
        activeRow: ref({}),
        model: {
          modelTitle: '添加角色',
          modelType: 'add',
          tableData: [],
          form: {
            authorityId: '',
            authorityName: '',
            parentId: '0',
          },
        },
      });

      const getAllAuthList = async () => {
        const res = await getAuthorityList(state.pageInfo);
        [state.table.data, state.table.page, state.table.pageSize, state.table.total] = [
          res.list,
          res.page,
          res.pageSize,
          res.total,
        ];
      };

      // 修改页数
      const setPage = (page: number) => {
        state.pageInfo.page = page;

        getAllAuthList();
      };

      // 修改每页数量
      const setPageSize = (pageSize: number) => {
        state.pageInfo.pageSize = pageSize;

        getAllAuthList();
      };

      const initialize = async () => {
        state.table.loading = true;
        setTimeout(() => {
          getAllAuthList().then(() => {
            state.table.loading = false;
          });
        }, 500);
      };

      const openDrawer = (row) => {
        state.drawer = true;
        state.activeRow = row;
      };

      const closeDrawer = () => {
        state.drawer = false;
      };

      const closeModel = () => {
        initialize();
      };

      const addAuthority = (pid) => {
        [state.model.modelTitle, state.model.modelType, state.model.form.parentId] = [
          '新增角色',
          'add',
          pid,
        ];
        operationModel.value.openModel();
      };

      const editAuthority = (data) => {
        [state.model.modelTitle, state.model.modelType, state.model.form] = [
          '编辑角色',
          'edit',
          data,
        ];

        operationModel.value.openModel();
      };

      const copyAuthority = (data) => {
        [state.model.modelTitle, state.model.modelType, state.model.form] = [
          '拷贝角色',
          'copy',
          data,
        ];

        operationModel.value.openModel();
      };

      const deleteAuth = (data) => {
        deleteAuthority({ authorityId: data.authorityId }).then(() => {
          Message.success('删除成功!');

          if (state.table.data.length === 1 && state.table.page > 1) {
            state.table.page--;
          }
          initialize();
        });
      };

      onBeforeMount(() => {
        initialize();
      });

      return {
        operationModel,
        ...toRefs(state),
        setPage,
        setPageSize,

        openDrawer,
        closeDrawer,

        closeModel,
        addAuthority,
        editAuthority,
        copyAuthority,
        deleteAuth,
      };
    },
  });
</script>

<style lang="less" scoped>
  .container-main {
    padding: 20px;
    background-color: var(--color-bg-2);
  }

  .toolbar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
  }

  :deep(.arco-tabs-nav) {
    padding: 0;
    border-bottom: 0;
  }
</style>
