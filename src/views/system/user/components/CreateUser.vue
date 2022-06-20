<!--<template>-->
<!--  <a-modal-->
<!--    :visible="userModel"-->
<!--    title="新增用户"-->
<!--    @ok="enterAddUser"-->
<!--    @cancel="closeAddUser"-->
<!--    okText="添加"-->
<!--    cancelText="取消"-->
<!--    :ok-loading="okLoading"-->
<!--    :modal-style="{ width: '50%' }"-->
<!--    unmountOnClose-->
<!--  >-->
<!--    <a-form ref="userModel" :model="userForm">-->
<!--      <a-form-item field="username" label="用户名">-->
<!--        <a-input v-model="userForm.username" placeholder="用户名" />-->
<!--      </a-form-item>-->
<!--      <a-form-item field="password" label="密码">-->
<!--        <a-input-password v-model="userForm.password" placeholder="密码" allow-clear />-->
<!--      </a-form-item>-->
<!--      <a-form-item field="nickName" label="别名">-->
<!--        <a-input v-model="userForm.nickName" placeholder="别名" />-->
<!--      </a-form-item>-->
<!--      <a-form-item field="authorityId" label="角色" placeholder="选择角色">-->
<!--        <a-cascader-->
<!--          v-model:model-value="userForm.authorityIds"-->
<!--          :options="authorityData"-->
<!--          :format-label="formatLabel"-->
<!--          multiple-->
<!--          check-strictly-->
<!--          allow-search-->
<!--        />-->
<!--      </a-form-item>-->
<!--      <a-form-item label="头像" label-width="80px">-->
<!--        <div style="display: inline-block" @click="openHeaderChange">-->
<!--          <img-->
<!--            v-if="userForm.headerImg"-->
<!--            class="header-img-box"-->
<!--            :src="-->
<!--              userForm.headerImg && userForm.headerImg.slice(0, 4) !== 'http'-->
<!--                ? path + userForm.headerImg-->
<!--                : userForm.headerImg-->
<!--            "-->
<!--            alt="头像"-->
<!--          />-->
<!--          <div v-else class="header-img-box">从媒体库选择</div>-->
<!--        </div>-->
<!--      </a-form-item>-->
<!--    </a-form>-->
<!--  </a-modal>-->
<!--  <ChooseImg ref="chooseImg" :target="userForm" :target-key="`headerImg`" />-->
<!--</template>-->

<!--<script lang="ts">-->
<!--  import { defineComponent, reactive, ref, toRefs } from 'vue';-->
<!--  import { Message } from '@arco-design/web-vue';-->
<!--  import { ChooseImg } from '@/components/ChooseImg';-->
<!--  import { register } from '@/api/system/user';-->

<!--  const path = import.meta.env.VITE_BASE_API;-->

<!--  export default defineComponent({-->
<!--    name: 'AddAndUpdate',-->
<!--    components: {-->
<!--      ChooseImg,-->
<!--    },-->
<!--    props: {-->
<!--      userModel: {-->
<!--        type: Boolean,-->
<!--        default: false,-->
<!--      },-->
<!--      authorityData: {-->
<!--        type: Array,-->
<!--        required: true,-->
<!--      },-->
<!--    },-->
<!--    emits: ['update:userModel', 'get-all-user-list'],-->
<!--    setup(_, { emit }) {-->
<!--      const chooseImg = ref();-->
<!--      const state = reactive({-->
<!--        okLoading: ref(false),-->
<!--        userForm: ref({-->
<!--          username: '',-->
<!--          password: '',-->
<!--          nickName: '',-->
<!--          authorityIds: [],-->
<!--          headerImg: '',-->
<!--        }),-->
<!--        visible: ref(false),-->
<!--        path,-->
<!--      });-->
<!--      const enterAddUser = () => {-->
<!--        register(state.userForm).then(() => {-->
<!--          Message.success('创建成功');-->
<!--          closeAddUser();-->
<!--          emit('get-all-user-list');-->
<!--        });-->
<!--      };-->

<!--      const closeAddUser = () => {-->
<!--        emit('update:userModel', false);-->
<!--      };-->

<!--      // 格式化用户组-->
<!--      const formatLabel = (options) => {-->
<!--        const labels = options.map((option) => option.label);-->
<!--        return labels[labels.length - 1];-->
<!--      };-->

<!--      const openHeaderChange = () => {-->
<!--        chooseImg.value.open();-->
<!--      };-->

<!--      return {-->
<!--        ...toRefs(state),-->
<!--        enterAddUser,-->
<!--        closeAddUser,-->
<!--        formatLabel,-->
<!--        openHeaderChange,-->
<!--        chooseImg,-->
<!--      };-->
<!--    },-->
<!--  });-->
<!--</script>-->

<!--<style scoped>-->
<!--  @import './styles/index.less';-->
<!--</style>-->
