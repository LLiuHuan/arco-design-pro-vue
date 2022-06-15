<template>
  <div>
    <a-space direction="vertical" fill>
      <a-button class="" @click="relation">确定</a-button>
      <a-tree
        ref="menuTree"
        :checkable="true"
        v-model:checked-keys="menuTreeIds"
        :fieldNames="{
          key: 'ID',
          title: 'title',
        }"
        :data="menuTreeData"
        :show-line="true"
        :blockNode="true"
      >
        <template #extra="nodeData">
          <span v-if="nodeData.menu_type !== 3">
            <a-button
              type="text"
              size="mini"
              :style="{ color: defaultRouter === nodeData.path ? '#E6A23C' : '#85ce61' }"
              :disabled="defaultRouter === nodeData.path"
              @click="() => setDefault(nodeData)"
            >
              {{ defaultRouter === nodeData.path ? '首页' : '设为首页' }}
            </a-button>
          </span>
        </template>
      </a-tree>
    </a-space>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onBeforeMount, reactive, ref, toRefs } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import { useI18n } from 'vue-i18n';
  import { addMenuAuthority, getBaseMenuTree, getMenuAuth } from '@/api/system/menu';
  import { MenuTypes } from '@/api/system/menu-types';
  import { updateAuthority } from '@/api/system/auth';

  export default defineComponent({
    name: 'AuthMenus',
    props: {
      row: {
        required: true,
        type: Object,
      },
    },
    setup(props) {
      const menuTree = ref();
      const { t } = useI18n();
      const state = reactive({
        menuTreeData: ref<Array<MenuTypes>>([]),
        menuTreeIds: ref<Array<Number>>([]),
        defaultRouter: ref<string>(props.row.defaultRouter),
      });

      // region 处理菜单树

      const treeTitle = (title: string): string => {
        return title.indexOf('menu.') === -1 ? title : t(title);
      };

      const isHttp = (path: string): boolean => {
        return path.indexOf('http://') != -1 || path.indexOf('https://') != -1;
      };

      const nameToTitle = (data: Array<any>, path = '') => {
        return data.map((item) => {
          item.title = isHttp(item.path) ? item.meta.title : treeTitle(item.meta.title);
          item.path = `/${item.path}`;
          if (path != '') {
            item.path = path + item.path;
          }
          if (item.children) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            item.children = nameToTitle(item.children, item.path);
          }
          return item;
        });
      };

      // 将data数据转为tree所需数据
      const initialize = async () => {
        const res = await getBaseMenuTree();
        state.menuTreeData = nameToTitle(res.menus);

        const res1 = await getMenuAuth({ authorityId: props.row.authorityId });
        const { menus } = res1;

        menus.forEach((item: MenuTypes) => {
          // 防止直接选中父级造成全选
          if (!menus.some((same) => same.parentId === item.menuId)) {
            state.menuTreeIds.push(Number(item.menuId));
          }
        });
      };

      function tableToTree(table: any) {
        const result: Array<any> = [];

        table &&
          table.forEach((item: any) => {
            if (!item.children) {
              if (state.menuTreeIds.includes(item.ID)) {
                result.push(item);
              }
            } else {
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const children = tableToTree(item.children);
              if (children.length > 0) {
                result.push(item);
                result.push(...children);
              }
            }
          });
        return result;
      }

      // endregion

      // region 设置首页

      // TODO: 需要改 defaultRouter
      const setDefault = async (data) => {
        updateAuthority({
          authorityId: props.row.authorityId,
          authorityName: props.row.authorityName,
          parentId: props.row.parentId,
          defaultRouter: data.path,
        }).then(() => {
          Message.success('设置成功');
          initialize();

          state.defaultRouter = data.path;
          // emit('changeRow', 'defaultRouter', res.data.authority.defaultRouter);
        });
      };

      // endregion

      // region 修改树
      // 关联树 确认方法
      const relation = async () => {
        await addMenuAuthority({
          menus: tableToTree(state.menuTreeData),
          authorityId: props.row.authorityId,
        }).then(() => {
          Message.success('菜单设置成功');
          initialize();
        });
      };
      // endregion

      onBeforeMount(() => {
        initialize();
      });

      return {
        menuTree,
        ...toRefs(state),
        setDefault,
        relation,
      };
    },
  });
</script>

<style scoped></style>
