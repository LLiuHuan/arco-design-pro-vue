<template>
  <a-drawer
    :visible="visible"
    ok-text="提交"
    cancel-text="取消"
    @cancel="close"
    @ok="enterMenu"
    :width="width"
    unmountOnClose
  >
    <template #title> {{ title }} </template>
    <div>
      <a-form ref="addMenuForm" :model="form" :rules="rules">
        <a-form-item field="menu_type" label="菜单类型">
          <a-radio-group v-model:model-value="form.menu_type" type="button">
            <a-radio :value="1">目录</a-radio>
            <a-radio :value="2">菜单</a-radio>
            <a-radio :value="3">按钮</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item field="name" label="路由Name">
          <a-input v-model="form.name" placeholder="路由名称，相当于路由Key 不可重复 为权限标识" />
        </a-form-item>
        <a-form-item v-if="form.menu_type !== 3" field="path" label="路由Path">
          <a-input v-model="form.path" placeholder="不需要输入上级路由，例：menu" />
        </a-form-item>
        <a-form-item field="meta.title" label="展示名称">
          <a-input
            v-model="form.meta.title"
            placeholder="i18n前端国际化 menu.system.menu，不需要就中文"
          />
        </a-form-item>
        <a-form-item v-if="form.menu_type !== 3" field="component" label="文件路径">
          <a-input
            v-model="form.component"
            placeholder="views下的文件路径, /system/menu/index.vue"
          />
        </a-form-item>
        <a-form-item v-if="form.menu_type === 1" field="redirect" label="重定向">
          <a-input v-model="form.redirect" placeholder="顶级菜单需要重定向到一个子级菜单" />
        </a-form-item>
        <a-form-item v-if="form.menu_type !== 3" field="parentId" label="上级菜单">
          <a-tree-select
            v-model:model-value="form.parentId"
            :data="menuOption"
            placeholder="请选择上级菜单"
          />
        </a-form-item>
        <a-form-item field="sort" label="排序标记">
          <a-input-number v-model="form.sort" placeholder="请输入排序" />
        </a-form-item>
        <a-form-item v-if="form.menu_type !== 3" field="icon" label="图标">
          <arco-icon v-model:icon-value="form.meta.icon" placeholder="请选择图标" />
        </a-form-item>
        <a-form-item v-if="form.menu_type === 3" field="permission" label="权限标识">
          <a-input v-model="form.meta.permissions" placeholder="请输入权限标识" />
        </a-form-item>
        <a-form-item field="hidden" label="是否显示">
          <a-switch v-model:model-value="form.hidden">
            <template #checked> 显示 </template>
            <template #unchecked> 隐藏 </template>
          </a-switch>
        </a-form-item>
      </a-form>
    </div>
  </a-drawer>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, toRefs } from 'vue';
  import { MenuTypes, MetaType } from '@/api/system/menu-types';
  import { ArcoIcon } from '@/components/ArcoIcons';
  import { addBaseMenu } from '@/api/system/menu';
  import { Message } from '@arco-design/web-vue';

  export default defineComponent({
    name: 'CreateMenu',
    components: {
      ArcoIcon,
    },
    props: {
      title: {
        type: String,
        default: '添加顶级菜单',
      },
      width: {
        type: Number,
        default: 650,
      },
      parentId: {
        type: Number,
        default: 0,
      },
      menuOption: {
        type: Array,
        required: true,
      },
      menuType: {
        type: Number,
        default: 1,
      },
    },
    emits: ['close'],
    setup(props, { emit }) {
      const addMenuForm = ref();
      const state = reactive({
        visible: false,
        form: ref<MenuTypes>({
          meta: {
            keepAlive: false,
            defaultMenu: false,
            title: '',
            icon: '',
            closeTab: false,
          },
        } as MenuTypes),
        rules: {
          name: { required: true, message: '请输入路由Name', trigger: 'blur' },
          path: { required: true, message: '请输入路由Path', trigger: 'blur' },
          'meta.title': { required: true, message: '请输入展示名称', trigger: 'blur' },
          redirect: { required: true, message: '请输入重定向', trigger: 'blur' },
          parentId: { required: true, message: '请选择上级菜单', trigger: 'blur' },
          sort: { required: true, message: '请输入排序标记', trigger: 'blur', type: 'number' },
          'meta.permissions': { required: true, message: '请输入权限标识', trigger: 'blur' },
        },
      });

      const open = async () => {
        addMenuForm.value && addMenuForm.value.resetFields();
        state.form = {
          meta: {
            keepAlive: false,
            defaultMenu: false,
            title: '',
            icon: '',
            closeTab: false,
          },
        } as MenuTypes;
        state.visible = true;
        setTimeout(() => {
          state.form.menu_type = props.menuType;
        }, 100);
      };

      const close = () => {
        state.visible = false;
      };

      const enterMenu = () => {
        state.form.parentId = String(props.parentId);
        addMenuForm.value.validate().then((res) => {
          if (res) {
            return;
          }

          addBaseMenu(state.form).then(() => {
            Message.success('添加成功');
            close();
            emit('close');
          });
        });
      };

      return {
        ...toRefs(state),
        addMenuForm,
        open,
        close,
        enterMenu,
      };
    },
  });
</script>

<style scoped></style>
