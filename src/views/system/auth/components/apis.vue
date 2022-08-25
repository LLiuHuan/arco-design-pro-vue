<!--<template>-->
<!--  <div>-->
<!--    <a-space direction="vertical" fill>-->
<!--      <a-button class="" @click="authApiEnter">确定</a-button>-->
<!--      <a-tree-->
<!--        ref="apiTree"-->
<!--        :checkable="true"-->
<!--        v-model:checked-keys="apiTreeIds"-->
<!--        :fieldNames="{-->
<!--          key: 'key',-->
<!--          title: 'description',-->
<!--        }"-->
<!--        :data="apiTreeData"-->
<!--        :show-line="true"-->
<!--        :blockNode="true"-->
<!--        checked-strategy="child"-->
<!--      />-->
<!--    </a-space>-->
<!--  </div>-->
<!--</template>-->

<!--<script lang="ts">-->
<!--  import { defineComponent, onBeforeMount, reactive, ref, toRefs } from 'vue';-->
<!--  import { Message } from '@arco-design/web-vue';-->
<!--  import { getPolicyPathByAuthorityId, UpdateCasbin } from '@/api/system/casbin';-->
<!--  import { getApiAllList } from '@/api/system/api';-->
<!--  import { ApiTypes } from '@/api/system/api-types';-->
<!--  import { casbinType } from '@/views/system/auth/components/types';-->

<!--  export default defineComponent({-->
<!--    name: 'AuthApis',-->
<!--    props: {-->
<!--      row: {-->
<!--        required: true,-->
<!--        type: Object,-->
<!--      },-->
<!--    },-->
<!--    setup(props) {-->
<!--      const apiTree = ref();-->
<!--      const state = reactive({-->
<!--        apiTreeData: ref<Array<Object>>([]),-->
<!--        apiTreeIds: ref<Array<String>>([]),-->
<!--        activeUserId: ref(),-->
<!--      });-->

<!--      const initialize = async () => {-->
<!--        const res2 = await getApiAllList();-->
<!--        state.apiTreeData = buildApiTree(res2.apis);-->

<!--        state.activeUserId = props.row.authorityId;-->
<!--        const res = await getPolicyPathByAuthorityId(props.row.authorityId);-->
<!--        const { paths } = res;-->
<!--        paths &&-->
<!--          paths.forEach((item) => {-->
<!--            state.apiTreeIds.push(`p:${item.path}m:${item.method}`);-->
<!--          });-->
<!--      };-->

<!--      // 创建api树方法-->
<!--      const buildApiTree = (apis) => {-->
<!--        const apiObj = {};-->
<!--        apis &&-->
<!--          apis.forEach((item) => {-->
<!--            if (Object.prototype.hasOwnProperty.call(apiObj, item.apiGroup)) {-->
<!--              apiObj[item.apiGroup].push(item);-->
<!--            } else {-->
<!--              Object.assign(apiObj, { [item.apiGroup]: [item] });-->
<!--            }-->
<!--          });-->
<!--        const apiTree: Array<Object> = [];-->
<!--        for (const key in apiObj) {-->
<!--          const treeNode = {-->
<!--            ID: key,-->
<!--            key,-->
<!--            description: `${key}组`,-->
<!--            children: apiObj[key],-->
<!--          };-->
<!--          apiTree.push(treeNode);-->
<!--        }-->
<!--        return apiTree;-->
<!--      };-->

<!--      function tableToTree(table: any) {-->
<!--        const result = [] as Array<ApiTypes>;-->

<!--        table.forEach((item: any) => {-->
<!--          if (!item.children) {-->
<!--            if (state.apiTreeIds.includes(item.key)) {-->
<!--              result.push(item);-->
<!--            } else if (state.apiTreeIds == []) {-->
<!--              result.push(item);-->
<!--            }-->
<!--          } else {-->
<!--            // eslint-disable-next-line @typescript-eslint/no-unused-vars-->
<!--            item.children = tableToTree(item.children);-->
<!--            if (item.children.length > 0) {-->
<!--              result.push(...item.children);-->
<!--            }-->
<!--          }-->
<!--        });-->
<!--        return result;-->
<!--      }-->

<!--      // 关联关系确定-->
<!--      const authApiEnter = async () => {-->
<!--        const checkArr = tableToTree(state.apiTreeData);-->

<!--        const casbinInfos = [] as casbinType[];-->
<!--        checkArr &&-->
<!--          checkArr.forEach((item) => {-->
<!--            const casbinInfo: casbinType = {-->
<!--              path: item.path,-->
<!--              method: item.method,-->
<!--            };-->
<!--            casbinInfos.push(casbinInfo);-->
<!--          });-->
<!--        await UpdateCasbin({-->
<!--          authorityId: state.activeUserId,-->
<!--          casbinInfos,-->
<!--        }).then(() => {-->
<!--          Message.success('api设置成功');-->
<!--          initialize();-->
<!--        });-->
<!--      };-->

<!--      onBeforeMount(() => {-->
<!--        initialize();-->
<!--      });-->

<!--      return {-->
<!--        apiTree,-->
<!--        ...toRefs(state),-->
<!--        authApiEnter,-->
<!--      };-->
<!--    },-->
<!--  });-->
<!--</script>-->

<!--<style scoped></style>-->
