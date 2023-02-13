<!--<template>-->
<!--  <div>-->
<!--    <a-row class="grid-row" :gutter="12">-->
<!--      <a-col :span="10">-->
<!--        <a-card>-->
<!--          <template #title>-->
<!--            <a-space>-->
<!--              <a-dropdown trigger="hover">-->
<!--                <a-button type="outline">-->
<!--                  操作菜单-->
<!--                  <icon-down />-->
<!--                </a-button>-->
<!--                <template #content>-->
<!--                  <a-doption @click="addBaseMenu('添加顶级菜单')">添加顶级菜单</a-doption>-->
<!--                  <a-doption-->
<!--                    v-if="form.menu_type !== 3"-->
<!--                    @click="-->
<!--                      addBaseMenu(-->
<!--                        '添加子' +-->
<!--                          (form?.menu_type ? menuTypeMap[form?.menu_type] + '：' : '菜单：') +-->
<!--                          treeItemTitle-->
<!--                      )-->
<!--                    "-->
<!--                    :disabled="parentId === 0"-->
<!--                    >添加子{{ form?.menu_type ? menuTypeMap[form?.menu_type] : '菜单' }}-->
<!--                    {{ treeItemTitle ? ': ' + treeItemTitle : '' }}-->
<!--                  </a-doption>-->
<!--                  <a-doption @click="removeBaseMenus" :disabled="parentId === 0"-->
<!--                    >删除选中菜单-->
<!--                  </a-doption>-->
<!--                </template>-->
<!--              </a-dropdown>-->
<!--              <a-button type="outline" @click="toggleExpanded">-->
<!--                <icon-align-left />-->
<!--                {{ expandedKeys.length > 0 ? '全部收起' : '全部展开' }}-->
<!--              </a-button>-->
<!--            </a-space>-->
<!--          </template>-->
<!--          <a-input-search-->
<!--            style="margin-bottom: 8px"-->
<!--            v-model="searchKey"-->
<!--            placeholder="请输入菜单名称搜索"-->
<!--          />-->
<!--          <a-tree-->
<!--            :data="treeData"-->
<!--            :show-line="true"-->
<!--            :blockNode="true"-->
<!--            v-model:expanded-keys="expandedKeys"-->
<!--            @select="getEditMenu"-->
<!--          >-->
<!--            <template #title="nodeData">-->
<!--              <template v-if="getMatchIndex(nodeData?.title) < 0">{{ nodeData?.title }}</template>-->
<!--              <span v-else>-->
<!--                {{ nodeData?.title?.substr(0, getMatchIndex(nodeData?.title)) }}-->
<!--                <span style="color: var(&#45;&#45;color-primary-light-4)">-->
<!--                  {{-->
<!--                    nodeData?.title?.substr(getMatchIndex(nodeData?.title), searchKey.length)-->
<!--                  }} </span-->
<!--                >{{ nodeData?.title?.substr(getMatchIndex(nodeData?.title) + searchKey.length) }}-->
<!--              </span>-->
<!--            </template>-->
<!--          </a-tree>-->
<!--        </a-card>-->
<!--      </a-col>-->
<!--      <a-col :span="14">-->
<!--        <a-card>-->
<!--          <template #title>-->
<!--            <IconEdit />-->
<!--            编辑菜单<span v-if="isForm">: {{ treeItemTitle }}</span>-->
<!--          </template>-->
<!--          <a-space direction="vertical" fill>-->
<!--            <a-alert closable>从菜单列表选择一项后，进行编辑</a-alert>-->
<!--            <a-form ref="menuFormRef" v-if="isForm" :model="form">-->
<!--              <a-form-item field="menu_type" label="菜单类型">-->
<!--                <a-radio-group v-model:model-value="form.menu_type" type="button">-->
<!--                  <a-radio :value="1" disabled>目录</a-radio>-->
<!--                  <a-radio :value="2" disabled>菜单</a-radio>-->
<!--                  <a-radio :value="3" disabled>按钮</a-radio>-->
<!--                </a-radio-group>-->
<!--              </a-form-item>-->
<!--              <a-form-item-->
<!--                field="name"-->
<!--                label="路由Name"-->
<!--                :rules="{ required: true, message: '请输入路由Name', trigger: 'blur' }"-->
<!--              >-->
<!--                <a-input v-model="form.name" placeholder="路由名称，唯一英文id" />-->
<!--              </a-form-item>-->
<!--              <a-form-item-->
<!--                v-if="form.menu_type !== 3"-->
<!--                field="path"-->
<!--                label="路由Path"-->
<!--                :rules="{ required: true, message: '请输入路由Path', trigger: 'blur' }"-->
<!--              >-->
<!--                <a-input v-model="form.path" placeholder="不需要输入上级路由，例：menu" />-->
<!--              </a-form-item>-->
<!--              <a-form-item-->
<!--                field="meta.title"-->
<!--                label="展示名称"-->
<!--                :rules="{ required: true, message: '请输入展示名称', trigger: 'blur' }"-->
<!--              >-->
<!--                <a-input-->
<!--                  v-model="form.meta.title"-->
<!--                  placeholder="i18n前端国际化 menu.system.menu，不需要就中文"-->
<!--                />-->
<!--              </a-form-item>-->
<!--              <a-form-item v-if="form.menu_type !== 3" field="component" label="文件路径">-->
<!--                <a-input-->
<!--                  v-model="form.component"-->
<!--                  placeholder="views下的文件路径, /system/menu/index.vue"-->
<!--                />-->
<!--              </a-form-item>-->
<!--              <a-form-item-->
<!--                v-if="form.menu_type === 1"-->
<!--                field="redirect"-->
<!--                label="重定向"-->
<!--                :rules="{ required: true, message: '请输入重定向', trigger: 'blur' }"-->
<!--              >-->
<!--                <a-input v-model="form.redirect" placeholder="顶级菜单需要重定向到一个子级菜单" />-->
<!--              </a-form-item>-->
<!--              <a-form-item-->
<!--                v-if="form.menu_type !== 3"-->
<!--                field="parentId"-->
<!--                label="上级菜单"-->
<!--                :rules="{ required: true, message: '请选择上级菜单', trigger: 'blur' }"-->
<!--              >-->
<!--                <a-tree-select-->
<!--                  v-model:model-value="form.parentId"-->
<!--                  :data="menuOption"-->
<!--                  placeholder="请选择上级菜单"-->
<!--                />-->
<!--              </a-form-item>-->
<!--              <a-form-item-->
<!--                field="sort"-->
<!--                label="排序标记"-->
<!--                :rules="{-->
<!--                  required: true,-->
<!--                  message: '请输入排序标记',-->
<!--                  trigger: 'blur',-->
<!--                  type: 'number',-->
<!--                }"-->
<!--              >-->
<!--                <a-input-number v-model="form.sort" placeholder="请输入排序" />-->
<!--              </a-form-item>-->
<!--              <a-form-item v-if="form.menu_type !== 3" field="icon" label="图标">-->
<!--                <arco-icon v-model:icon-value="form.meta.icon" placeholder="请选择图标" />-->
<!--              </a-form-item>-->
<!--              <a-form-item-->
<!--                field="meta.permissions"-->
<!--                label="权限标识"-->
<!--                :rules="{ required: true, message: '请输入权限标识', trigger: 'blur' }"-->
<!--              >-->
<!--                <a-input v-model="form.meta.permissions" placeholder="请输入权限标识" />-->
<!--              </a-form-item>-->
<!--              <a-row :gutter="16">-->
<!--                <a-col :span="12">-->
<!--                  <a-form-item field="meta.keepAlive" label="缓存路由" label-col-flex="120px">-->
<!--                    <a-switch v-model:model-value="form.meta.keepAlive" type="round">-->
<!--                      <template #checked> 打开</template>-->
<!--                      <template #unchecked> 关闭</template>-->
<!--                    </a-switch>-->
<!--                  </a-form-item>-->
<!--                </a-col>-->
<!--                <a-col :span="12">-->
<!--                  <a-form-item field="hidden" label="是否显示" label-col-flex="80px">-->
<!--                    <a-switch v-model:model-value="form.hidden">-->
<!--                      <template #checked> 显示</template>-->
<!--                      <template #unchecked> 隐藏</template>-->
<!--                    </a-switch>-->
<!--                  </a-form-item>-->
<!--                </a-col>-->
<!--              </a-row>-->
<!--              <a-form-item>-->
<!--                <a-button type="primary" @click="editMenu">保存修改</a-button>-->
<!--              </a-form-item>-->
<!--            </a-form>-->
<!--          </a-space>-->
<!--        </a-card>-->
<!--      </a-col>-->
<!--    </a-row>-->
<!--  </div>-->
<!--  <create-menu-->
<!--    ref="addMenu"-->
<!--    v-model:title="drawerTitle"-->
<!--    v-model:parent-id="parentId"-->
<!--    :menu-option="menuOption"-->
<!--    v-model:menu-type="menu_type"-->
<!--    @close="getTableData"-->
<!--  />-->
<!--</template>-->

<!--<script lang="ts">-->
<!--  import { computed, defineComponent, onMounted, reactive, ref, toRefs } from 'vue';-->
<!--  import { Message } from '@arco-design/web-vue';-->
<!--  import { useI18n } from 'vue-i18n';-->
<!--  import { TreeType } from '@/views/system/menu/menu-types';-->
<!--  import { deleteBaseMenus, getBaseMenuById, getMenuList, updateBaseMenu } from '@/api/system/menu';-->
<!--  import { MenuTypes } from '@/api/system/menu-types';-->
<!--  import { ArcoIcon } from '@/components/ArcoIcons';-->
<!--  import CreateMenu from '@/views/system/menu/components/CreateMenu.vue';-->

<!--  export default defineComponent({-->
<!--    name: 'SystemMenu',-->
<!--    components: {-->
<!--      CreateMenu,-->
<!--      ArcoIcon,-->
<!--    },-->
<!--    setup() {-->
<!--      const menuFormRef = ref();-->
<!--      const { t } = useI18n();-->
<!--      const searchKey = ref('');-->
<!--      const addMenu = ref();-->
<!--      const menuTypeMap = {-->
<!--        1: '菜单',-->
<!--        2: '按钮',-->
<!--      };-->
<!--      const state = reactive({-->
<!--        originTreeData: [] as Array<TreeType>,-->
<!--        pageInfo: {-->
<!--          page: 1,-->
<!--          pageSize: 999,-->
<!--        },-->
<!--        form: ref<MenuTypes>({-->
<!--          meta: {-->
<!--            icon: '',-->
<!--          },-->
<!--        } as MenuTypes),-->
<!--        isForm: false,-->
<!--        menuOption: [-->
<!--          {-->
<!--            key: '0',-->
<!--            title: '根菜单',-->
<!--          },-->
<!--        ],-->
<!--        allExpandedKeys: ref<Array<string>>([]),-->
<!--        expandedKeys: ref<Array<string>>([]),-->

<!--        parentId: ref<number>(0),-->
<!--        treeItemTitle: ref(''),-->
<!--        drawerTitle: '',-->
<!--        menu_type: 1,-->
<!--      });-->

<!--      const treeTitle = (title: string): string => {-->
<!--        return title.indexOf('menu.') === -1 ? title : t(title);-->
<!--      };-->

<!--      const isHttp = (path: string): boolean => {-->
<!--        return path.indexOf('http://') != -1 || path.indexOf('https://') != -1;-->
<!--      };-->

<!--      // region 处理tree 菜单树-->

<!--      // 处理搜索菜单时的数据-->
<!--      const treeData = computed(() => {-->
<!--        if (!searchKey.value) return state.originTreeData;-->
<!--        return searchData(searchKey.value);-->
<!--      });-->

<!--      // 搜索菜单数据-->
<!--      function searchData(keyword) {-->
<!--        const loop = (data) => {-->
<!--          const result = [] as Array<TreeType>;-->
<!--          data.forEach((item: TreeType) => {-->
<!--            if (item.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {-->
<!--              result.push({ ...item });-->
<!--            } else if (item.children) {-->
<!--              const filterData = loop(item.children);-->
<!--              if (filterData.length) {-->
<!--                result.push({-->
<!--                  ...item,-->
<!--                  children: filterData,-->
<!--                });-->
<!--              }-->
<!--            }-->
<!--          });-->
<!--          return result;-->
<!--        };-->

<!--        return loop(state.originTreeData);-->
<!--      }-->

<!--      // 搜索到的菜单index-->
<!--      function getMatchIndex(title) {-->
<!--        if (!searchKey.value) return -1;-->
<!--        return title.toLowerCase().indexOf(searchKey.value.toLowerCase());-->
<!--      }-->

<!--      // 将data数据转为tree所需数据-->
<!--      function tableToTree(table: any) {-->
<!--        const result = [] as Array<TreeType>;-->

<!--        table.forEach((item: any) => {-->
<!--          if (!item.children) {-->
<!--            result.push({-->
<!--              key: item.ID,-->
<!--              title: isHttp(item.path) ? item.meta.title : treeTitle(item.meta.title),-->
<!--            });-->
<!--          } else {-->
<!--            // eslint-disable-next-line @typescript-eslint/no-unused-vars-->
<!--            const filterData = tableToTree(item.children);-->
<!--            result.push({-->
<!--              key: item.ID,-->
<!--              title: isHttp(item.path) ? item.meta.title : treeTitle(item.meta.title),-->
<!--              children: filterData,-->
<!--            });-->
<!--            state.allExpandedKeys.push(item.ID);-->
<!--          }-->
<!--        });-->
<!--        return result;-->
<!--      }-->

<!--      // 获取菜单树数据-->
<!--      const getTableData = async () => {-->
<!--        const data = await getMenuList(state.pageInfo);-->
<!--        state.originTreeData = tableToTree(data.list)-->
<!--          ? tableToTree(data.list)-->
<!--          : ([] as Array<TreeType>);-->
<!--      };-->

<!--      // endregion-->

<!--      // region 处理菜单数据-->

<!--      const getEditMenu = async (_, { node }) => {-->
<!--        state.isForm = true;-->
<!--        const res = await getBaseMenuById({ id: node.key });-->
<!--        state.form = res.menu;-->
<!--        state.parentId = node.key;-->
<!--        state.treeItemTitle = isHttp(state.form.path)-->
<!--          ? state.form.meta.title-->
<!--          : treeTitle(state.form.meta.title);-->
<!--        setOptions();-->
<!--      };-->

<!--      const setOptions = () => {-->
<!--        state.menuOption = [-->
<!--          {-->
<!--            key: '0',-->
<!--            title: '根目录',-->
<!--          },-->
<!--        ];-->
<!--        setMenuOptions(state.originTreeData, state.menuOption, false);-->
<!--      };-->
<!--      const setMenuOptions = (menuData, optionsData, disabled) => {-->
<!--        menuData &&-->
<!--          menuData.forEach((item) => {-->
<!--            if (item.children && item.children.length) {-->
<!--              const option = {-->
<!--                title: item.title,-->
<!--                key: item.key,-->
<!--                disabled: disabled || item.key === state.form.ID,-->
<!--                children: [],-->
<!--              };-->
<!--              setMenuOptions(-->
<!--                item.children,-->
<!--                option.children,-->
<!--                disabled || item.key === state.form.ID-->
<!--              );-->
<!--              optionsData.push(option);-->
<!--            } else {-->
<!--              const option = {-->
<!--                title: item.title,-->
<!--                key: item.key,-->
<!--                disabled: disabled || item.key === state.form.ID,-->
<!--              };-->
<!--              optionsData.push(option);-->
<!--            }-->
<!--          });-->
<!--      };-->

<!--      const editMenu = () => {-->
<!--        menuFormRef.value.validate().then((res) => {-->
<!--          if (res) {-->
<!--            return;-->
<!--          }-->

<!--          updateBaseMenu(state.form).then(() => {-->
<!--            Message.success('修改成功！');-->
<!--            getTableData();-->
<!--          });-->
<!--        });-->
<!--      };-->

<!--      const toggleExpanded = () => {-->
<!--        state.expandedKeys = state.expandedKeys.length ? [] : state.allExpandedKeys;-->
<!--      };-->

<!--      // endregion-->

<!--      const addBaseMenu = (title: string) => {-->
<!--        state.drawerTitle = title;-->
<!--        state.menu_type = title === '添加顶级菜单' ? 1 : state.form.menu_type + 1;-->
<!--        addMenu.value.open();-->
<!--      };-->

<!--      const removeBaseMenus = () => {-->
<!--        deleteBaseMenus({ id: state.parentId }).then(() => {-->
<!--          Message.success('删除成功！');-->
<!--          getTableData();-->
<!--        });-->
<!--      };-->

<!--      onMounted(() => {-->
<!--        getTableData();-->
<!--      });-->

<!--      return {-->
<!--        ...toRefs(state),-->
<!--        menuFormRef,-->
<!--        treeData,-->
<!--        searchKey,-->
<!--        menuTypeMap,-->
<!--        getMatchIndex,-->
<!--        getEditMenu,-->
<!--        editMenu,-->
<!--        toggleExpanded,-->
<!--        getTableData,-->

<!--        addMenu,-->
<!--        addBaseMenu,-->
<!--        removeBaseMenus,-->
<!--      };-->
<!--    },-->
<!--  });-->
<!--</script>-->

<!--<style lang="less" scoped>-->
<!--  .grid-row {-->
<!--    margin-left: 0 !important;-->
<!--    margin-right: 0 !important;-->
<!--  }-->
<!--</style>-->

<template>
  <div> 暂无 </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped></style>
