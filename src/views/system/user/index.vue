<template>
  <div>
    <div class="container-main">
      <div class="toolbar">
        <div>
          <a-button
            type="primary"
            @click="addUser"
            v-permission="{ action: ['system.user.add'], effect: 'disabled' }"
            >添加
          </a-button>
        </div>
      </div>
      <a-table
        :data="data"
        :pagination="{
          current: page,
          onPageSize: pageSize,
          size: 'medium',
          total: total,
          showTotal: true,
          showPageSize: true,
        }"
        :loading="tableLoading"
        @page-change="setPage"
        @page-size-change="setPageSize"
      >
        <template #columns>
          <a-table-column ellipsis title="头像" data-index="headerImg" :width="100">
            <template #cell="{ record }">
              <custom-pic style="margin-top: 8px" :pic-src="record.headerImg" />
            </template>
          </a-table-column>
          <a-table-column title="UUID" data-index="uuid" />
          <a-table-column title="用户名" data-index="userName" />
          <a-table-column title="昵称" data-index="nickName" />
          <a-table-column title="用户角色" data-index="nickName" :width="250">
            <template #cell="{ record }">
              <a-cascader
                v-model:model-value="record.authorityIds"
                v-model:options="authorityData"
                :format-label="formatLabel"
                :max-tag-count="1"
                @blur="changeAuthority(record)"
                multiple
                check-strictly
                allow-search
                :disabled="!hasPermission(['system.user.auth'])"
              />
            </template>
          </a-table-column>
          <a-table-column title="操作">
            <template #cell="{ record }">
              <a-popconfirm
                content="确定删除此用户吗?"
                okText="确定"
                cancelText="取消"
                @ok="delUserInfo(record.ID)"
              >
                <a-button
                  v-permission="{ action: ['system.user.del'], effect: 'disabled' }"
                  type="primary"
                >
                  <template #icon>
                    <icon-delete />
                  </template>
                  <template #default>删除</template>
                </a-button>
              </a-popconfirm>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </div>

    <create-user
      v-model:user-model="addUserModel"
      :authority-data="authorityData"
      @get-all-user-list="getAllUserList"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, onBeforeMount, reactive, ref, toRefs } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import { delUser, getUserList, setUserAuthorities } from '@/api/system/user';
  import { getAuthorityList } from '@/api/system/auth';
  import { UserInfo } from '@/api/system/user-types';
  import { CustomPic } from '@/components/CustomPic';
  import { usePermission } from '@/hooks/web/usePermission';
  import { CreateUser } from './components';

  export default defineComponent({
    name: 'SystemUser',
    components: {
      CustomPic,
      CreateUser,
    },
    setup() {
      const state = reactive({
        data: ref<Array<UserInfo>>([]),
        page: 0,
        pageSize: 0,
        total: 0,
        pageInfo: {
          page: 1,
          pageSize: 10,
        },
        authorityData: ref([]),
        addUserModel: ref(false),
        tableLoading: ref(false),
      });
      const { hasPermission } = usePermission();

      // 查询全部用户信息
      const getAllUserList = async () => {
        const userList = await getUserList(state.pageInfo);
        setAuthorityIds(userList.list);
        [state.data, state.page, state.pageSize, state.total] = [
          userList.list,
          userList.page,
          userList.pageSize,
          userList.total,
        ];
      };

      // 获取权限列表
      const getAllAuthorityList = async () => {
        const authority = await getAuthorityList({ page: 1, pageSize: 999 });
        setAuthorityOptions(authority.list, state.authorityData);
      };

      // 修改页数
      const setPage = (page: number) => {
        state.pageInfo.page = page;

        getAllUserList();
      };

      // 修改每页数量
      const setPageSize = (pageSize: number) => {
        state.pageInfo.pageSize = pageSize;

        getAllUserList();
      };

      // 删除用户
      const delUserInfo = (id: number) => {
        delUser({ id }).then(() => {
          Message.success('删除成功');
          getAllUserList();
        });
      };

      // 处理authority
      const setAuthorityOptions = (AuthorityData, optionsData) => {
        AuthorityData &&
          AuthorityData.forEach((item) => {
            if (item.children && item.children.length) {
              const option = {
                value: item.authorityId,
                label: item.authorityName,
                children: [],
              };
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              setAuthorityOptions(item.children, option.children);
              optionsData.push(option);
            } else {
              const option = {
                value: item.authorityId,
                label: item.authorityName,
              };
              optionsData.push(option);
            }
          });
      };

      // 生成用户权限组
      const setAuthorityIds = (tableData) => {
        tableData &&
          tableData.forEach((user) => {
            user.authorityIds =
              user.authorities &&
              user.authorities.map((i) => {
                return i.authorityId;
              });
          });
      };

      // 设置用户权限组
      const changeAuthority = async (row) => {
        await setUserAuthorities({
          ID: row.ID,
          authorityIds: row.authorityIds,
        }).then(() => {
          Message.success('修改成功');
        });
      };

      // 格式化用户组
      const formatLabel = (options) => {
        const labels = options.map((option) => option.label);
        return labels[labels.length - 1];
      };

      const addUser = () => {
        state.addUserModel = true;
      };

      const initialize = async () => {
        state.tableLoading = true;
        await getAllAuthorityList();
        await getAllUserList();
        state.tableLoading = false;
      };

      onBeforeMount(() => {
        initialize();
      });

      return {
        ...toRefs(state),

        setPage,
        setPageSize,
        delUserInfo,
        changeAuthority,
        formatLabel,

        addUser,
        getAllUserList,
        hasPermission,
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
</style>
