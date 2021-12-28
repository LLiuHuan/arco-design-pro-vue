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
      <a-form ref="addMenuForm" :model="form">
        <a-form-item field="name" label="路由Name">
          <a-input
            v-model="form.name"
            placeholder="目前使用1i8n的数据，需要为xx.xx 和展示名称一致"
          />
        </a-form-item>
        <a-form-item field="path" label="路由Path">
          <a-input v-model="form.path" placeholder="请输入路由地址，不需要输入上级路由" />
        </a-form-item>
        <a-form-item field="meta.title" label="展示名称">
          <a-input v-model="form.meta.title" placeholder="目前使用1i8n的数据，需要为xx.xx" />
        </a-form-item>
        <a-form-item field="component" label="文件路径">
          <a-input v-model="form.component" placeholder="views下的文件路径" />
        </a-form-item>
        <a-form-item field="redirect" label="重定向">
          <a-input v-model="form.redirect" placeholder="顶级菜单需要重定向到一个子级菜单" />
        </a-form-item>
        <a-form-item field="parentId" label="上级菜单">
          {{ parentId }} - {{ form.parentId }}
        </a-form-item>
        <a-form-item field="sort" label="排序标记">
          <a-input-number v-model="form.sort" placeholder="请输入排序" />
        </a-form-item>
        <a-form-item field="icon" label="图标">
          <arco-icon v-model:icon-value="form.meta.icon" placeholder="请选择图标" />
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
    name: 'AddMenu',
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
        default: 450,
      },
      parentId: {
        type: Number,
        default: 0,
      },
    },
    emits: ['close'],
    setup(props, { emit }) {
      const addMenuForm = ref<HTMLFormElement>();
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
        menuOption: [
          {
            key: '0',
            title: '根菜单',
          },
        ],
      });

      const open = async () => {
        addMenuForm.value && addMenuForm.value.resetFields();
        state.form.meta = {} as MetaType;
        state.visible = true;
      };

      const close = () => {
        state.visible = false;
      };

      const enterMenu = () => {
        state.form.parentId = String(props.parentId);
        addBaseMenu(state.form).then(() => {
          Message.success('添加成功');
          close();
          emit('close');
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
