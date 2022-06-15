<template>
  <a-modal
    :visible="visible"
    @ok="enterModel"
    @cancel="closeModel"
    okText="确定"
    cancelText="取消"
    unmountOnClose
  >
    <template #title> {{ modelTitle }}</template>
    <a-form ref="authForm" :model="form">
      <a-form-item field="parentId" label="父级角色">
        <a-cascader
          v-model:model-value="form.parentId"
          v-model:options="AuthorityOption"
          placeholder="请选择父级角色"
          :format-label="formatLabel"
          :disabled="modelType === 'add'"
          style="width: 100%"
          allow-search
          check-strictly
        />
      </a-form-item>
      <a-form-item field="authorityId" label="角色ID">
        <a-input
          v-model="form.authorityId"
          :disabled="modelType === 'edit'"
          placeholder="请输入角色ID"
        />
      </a-form-item>
      <a-form-item field="authorityName" label="角色名称">
        <a-input v-model="form.authorityName" placeholder="请输入角色名称" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import { copyAuthority, createAuthority, updateAuthority } from '@/api/system/auth';
  import { authorityInfo, UpdAuthority } from '@/api/system/auth-types';

  export default defineComponent({
    name: 'OperationModel',
    props: {
      modelTitle: {
        type: String,
        default: '新增角色',
      },
      modelType: {
        type: String,
        default: 'add',
      },
      tableData: {
        type: Object,
      },
      row: {
        type: Object,
        default: {
          authorityId: '',
          authorityName: '',
          parentId: '0',
        } as Object,
      },
    },
    emits: ['close'],
    setup(props, { emit }) {
      const state: {
        visible: boolean;
        form: UpdAuthority;
        AuthorityOption: Array<Object>;
        copyForm: authorityInfo;
      } = reactive({
        visible: false,
        form: {
          authorityId: '',
          authorityName: '',
          parentId: '0',
        },
        AuthorityOption: [
          {
            value: '0',
            label: '根角色',
          },
        ],
        copyForm: {
          authorityId: '',
          authorityName: '',
          parentId: '',
        },
      });

      // 格式化label
      const formatLabel = (options) => {
        const labels = options.map((option) => option.label);
        return labels[labels.length - 1];
      };

      // region 设置父级角色
      const setOptions = () => {
        state.AuthorityOption = [
          {
            value: '0',
            label: '根角色',
          },
        ];
        setAuthorityOptions(props.tableData, state.AuthorityOption, false);
      };

      const setAuthorityOptions = (AuthorityData, optionsData, disabled) => {
        state.form.authorityId = String(state.form.authorityId);
        AuthorityData &&
          AuthorityData.forEach((item) => {
            if (item.children && item.children.length) {
              const option = {
                value: item.authorityId,
                label: item.authorityName,
                disabled: disabled || item.authorityId === state.form.authorityId,
                children: [],
              };
              setAuthorityOptions(
                item.children,
                option.children,
                disabled || item.authorityId === state.form.authorityId
              );
              optionsData.push(option);
            } else {
              const option = {
                value: item.authorityId,
                label: item.authorityName,
                disabled: disabled || item.authorityId === state.form.authorityId,
              };
              optionsData.push(option);
            }
          });
      };
      // endregion

      const initForm = () => {
        state.form = {
          authorityId: '',
          authorityName: '',
          parentId: '0',
        };
      };

      const openModel = () => {
        setTimeout(() => {
          switch (props.modelType) {
            case 'add':
              {
                state.form.parentId = props.row.parentId;
              }
              break;
            case 'edit':
              {
                for (const key in state.form) {
                  state.form[key] = props.row[key];
                }
              }
              break;
            case 'copy':
              {
                for (const key in state.form) {
                  state.form[key] = props.row[key];
                }
                state.copyForm = props.row as authorityInfo;
              }
              break;
          }
          setOptions();
          state.visible = true;
        }, 100);
      };

      const closeModel = () => {
        initForm();
        state.visible = false;
      };

      const enterModel = () => {
        if (state.form.authorityId === '0') {
          Message.error('角色id不能为0');
          return false;
        }

        switch (props.modelType) {
          case 'add':
            {
              createAuthority(state.form).then(() => {
                Message.success('添加成功!');
              });
            }
            break;
          case 'edit':
            {
              updateAuthority(state.form).then(() => {
                Message.success('添加成功!');
              });
            }
            break;
          case 'copy': {
            const data: {
              authority: authorityInfo;
              oldAuthorityId: string;
            } = {
              authority: {
                authorityId: '',
                authorityName: '',
                parentId: '',
              },
              oldAuthorityId: '0',
            };
            data.authority.authorityId = state.form.authorityId;
            data.authority.authorityName = state.form.authorityName;
            data.authority.parentId = state.form.parentId;
            if (!state.copyForm) {
              Message.error('参数异常，请刷新后重试');
            }
            data.authority.dataAuthorityId = state.copyForm.dataAuthorityId;
            data.oldAuthorityId = state.copyForm.authorityId;
            copyAuthority(data).then(() => {
              Message.success('复制成功！');
            });
          }
        }

        initForm();
        state.visible = false;
        emit('close');
      };

      return {
        ...toRefs(state),
        formatLabel,
        openModel,
        closeModel,
        enterModel,
      };
    },
  });
</script>

<style scoped></style>
