<template>
  <div class="container">
    <div class="container-main">
      <div class="toolbar">
        <div>
          <a-button type="primary">添加</a-button>
        </div>
      </div>
      <a-table :data="data">
        <template #columns>
          <a-table-column ellipsis title="头像" data-index="headerImg" />
          <a-table-column title="UUID" data-index="uuid" />
          <a-table-column title="用户名" data-index="userName" />
          <a-table-column title="昵称" data-index="nickName" />
          <a-table-column title="用户角色" data-index="nickName">
            <template #cell="{ record }">
              <a-cascader
                v-model:model-value="record.authorityIds"
                :options="authorityData"
                :format-label="formatLabel"
                multiple
                check-strictly
                allow-search
              />
            </template>
          </a-table-column>
          <a-table-column title="操作">
            <template #cell="{ record }">
              <a-button type="primary" @click="delUserInfo(record.ID)">
                <template #icon>
                  <icon-delete />
                </template>
                <template #default>删除</template>
              </a-button>
            </template>
          </a-table-column>
        </template>
        <template #footer>
          <a-pagination
            :total="total"
            v-model:current="page"
            :page-size="pageSize"
            @change="setPage"
            @page-size-change="setPageSize"
            size="medium"
            show-total
            show-page-size
          />
        </template>
      </a-table>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onBeforeMount, reactive, ref, toRefs } from 'vue';
  import { delUser, getUserList } from '@/api/system/user';
  import { getAuthorityList } from '@/api/authority';
  import { ResponsePage } from '@/api/types/common/types';
  import { UserInfo } from '@/api/system/user-types';
  import { authorityInfo } from '@/api/authority/authority-types';

  export default defineComponent({
    name: 'SystemUser',
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
        authorityData: [],
      });

      // 查询全部用户信息
      const getAllUserList = () => {
        console.log(state.authorityData);
        getUserList(state.pageInfo).then((res: ResponsePage<UserInfo>) => {
          setAuthorityIds(res.list);
          [state.data, state.page, state.pageSize, state.total] = [
            res.list,
            res.page,
            res.pageSize,
            res.total,
          ];
        });
      };

      // 获取权限列表
      const getAllAuthorityList = () => {
        getAuthorityList({ page: 1, pageSize: 999 }).then((res: ResponsePage<authorityInfo>) => {
          setAuthorityOptions(res.list, state.authorityData);
          console.log(state.authorityData);
        });
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
        delUser({ id }).then((res: any) => {
          console.log(res);
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

      const changeAuthority = (row, flag) => {
        if (flag) {
          return;
        }
        console.log(row);
      };

      const formatLabel = (options) => {
        const labels = options.map((option) => option.label);
        return labels[labels.length - 1];
      };

      onBeforeMount(() => {
        getAllAuthorityList();
        setTimeout(() => {
          getAllUserList();
        }, 100);
      });

      return {
        ...toRefs(state),

        setPage,
        setPageSize,
        delUserInfo,
        changeAuthority,
        formatLabel,
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
