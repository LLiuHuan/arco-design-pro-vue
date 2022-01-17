<template>
  <a-form v-bind="getBindValue" :model="formModel" ref="formElRef">
    <a-row v-bind="getGrid">
      <a-col v-bind="schema.colProps" v-for="schema in getSchema" :key="schema.field">
        <a-form-item :label="schema.label" :field="schema.field">
          <!--标签名右侧温馨提示-->
          <template #label v-if="schema.labelMessage">
            {{ schema.label }}
            <a-trigger class="label-trigger" position="top">
              <IconQuestionCircle />
              <template #content>
                <div class="pb-2">
                  {{ schema.labelMessage }}
                </div>
              </template>
            </a-trigger>
          </template>

          <!--判断插槽-->
          <template v-if="schema.slot">
            <slot
              :name="schema.slot"
              :model="formModel"
              :field="schema.field"
              :value="formModel[schema.field]"
            ></slot>
          </template>

          <!--ACheckbox-->
          <template v-else-if="schema.component === 'ACheckbox'">
            <a-checkbox-group v-model:value="formModel[schema.field]">
              <a-space>
                <a-checkbox
                  v-for="item in schema.componentProps.options"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                />
              </a-space>
            </a-checkbox-group>
          </template>

          <!--ARadioGroup-->
          <template v-else-if="schema.component === 'ARadioGroup'">
            <a-radio-group v-model:value="formModel[schema.field]">
              <a-space>
                <a-radio
                  v-for="item in schema.componentProps.options"
                  :key="item.value"
                  :value="item.value"
                >
                  {{ item.label }}
                </a-radio>
              </a-space>
            </a-radio-group>
          </template>

          <!--动态渲染表单组件-->
          <component
            v-else
            v-bind="getComponentProps(schema)"
            :is="schema.component"
            v-model="formModel[schema.field]"
            :class="{ isFull: schema.isFull !== false && getProps.isFull }"
          />

          <!--组件后面的内容-->
          <template v-if="schema.suffix">
            <slot
              :name="schema.suffix"
              :model="formModel"
              :field="schema.field"
              :value="formModel[schema.field]"
            ></slot>
          </template>
        </a-form-item>
      </a-col>
      <!--提交 重置 展开 收起 按钮-->
      <a-col
        :span="isInline ? 0 : 24"
        :suffix="!!isInline"
        #="{ overflow }"
        v-if="getProps.showActionButtonGroup"
      >
        <a-space align="center" wrap>
          <a-button
            v-if="getProps.showSubmitButton"
            v-bind="getSubmitBtnOptions"
            @click="handleSubmit"
            :loading="loadingSub"
            >{{ getProps.submitButtonText }}</a-button
          >
          <a-button
            v-if="getProps.showResetButton"
            v-bind="getResetBtnOptions"
            @click="resetFields"
            >{{ getProps.resetButtonText }}</a-button
          >
          <!--          <a-button-->
          <!--            type="text"-->
          <!--            v-if="isInline && getProps.showAdvancedButton"-->
          <!--            @click="unfoldToggle"-->
          <!--          >-->
          <!--            <template #icon>-->
          <!--              <IconDown v-if="overflow" :size="14" />-->
          <!--              <IconUp v-else :size="14" />-->
          <!--            </template>-->
          <!--            {{ overflow ? '展开' : '收起' }}-->
          <!--          </a-button>-->
        </a-space>
      </a-col>
    </a-row>
  </a-form>
</template>

<script lang="ts">
  import { computed, defineComponent, onMounted, reactive, ref, unref, watch } from 'vue';
  import { FormActionType, FormProps, FormSchema } from '@/components/BasicForm/src/types/form';
  import { IconQuestionCircle, IconDown, IconUp } from '@arco-design/web-vue/es/icon';
  import { basicProps } from '@/components/BasicForm/src/props';
  import { useFormValues } from '@/components/BasicForm/src/hooks/useFormValues';
  import { isArray } from '@/utils/is';
  import { useFormEvents } from '@/components/BasicForm/src/hooks/useFormEvents';
  import { deepMerge } from '@/utils';
  import { createPlaceholderMessage } from '@/components/BasicForm/src/helper';
  import { RowProps } from '@/components/BasicForm/src/types/gridProps';
  export default defineComponent({
    name: 'BasicForm',
    components: {
      IconQuestionCircle,
      IconDown,
      IconUp,
    },
    props: {
      ...basicProps,
    },
    emits: ['reset', 'submit', 'register'],
    setup(props, { emit, attrs }) {
      const defaultFormModel = ref<Recordable>({});
      const formModel = ref<Recordable>({});
      const propsRef = ref<Partial<FormProps>>({});
      const schemaRef = ref(null);
      const formElRef = ref(null);
      const gridCollapsed = ref(true);
      const loadingSub = ref(false);
      const isUpdateDefaultRef = ref(false);

      const getSubmitBtnOptions = computed(() => {
        return Object.assign(
          {
            size: props.size,
            type: 'primary',
          },
          props.submitButtonOptions
        );
      });

      const getResetBtnOptions = computed(() => {
        return Object.assign(
          {
            size: props.size,
          },
          props.resetButtonOptions
        );
      });

      const isInline = computed(() => {
        const { layout } = unref(getProps);
        return layout === 'inline';
      });

      const getGrid = computed((): RowProps | undefined => {
        const { rowProps } = unref(getProps);
        if (rowProps) {
          return {
            ...rowProps,
            // collapsed: isInline.value ? gridCollapsed.value : false,
          };
        }
        return undefined;
      });

      function getComponentProps(schema) {
        const compProps = schema.componentProps ?? {};
        const component = schema.component;
        return {
          allowClear: true,
          placeholder: createPlaceholderMessage(unref(component)),
          ...compProps,
        };
      }

      const getProps = computed((): FormProps => {
        const formProps = { ...props, ...unref(propsRef) } as FormProps;
        const rulesObj: any = {
          rules: {},
        };
        const schemas: any = formProps.schemas || [];
        schemas.forEach((item) => {
          if (item.rules && isArray(item.rules)) {
            rulesObj.rules[item.field] = item.rules;
          }
        });
        return { ...formProps, ...unref(rulesObj) };
      });

      const getBindValue = computed(
        () => ({ ...attrs, ...props, ...unref(getProps) } as Recordable)
      );

      const getSchema = computed((): FormSchema[] => {
        const schemas: FormSchema[] = unref(schemaRef) || (unref(getProps).schemas as any);
        for (const schema of schemas) {
          const { defaultValue } = schema;
          // handle date type
          // dateItemType.includes(component as string)
          if (defaultValue) {
            schema.defaultValue = defaultValue;
          }
        }
        return schemas as FormSchema[];
      });

      const { handleFormValues, initDefault } = useFormValues({
        // getProps,
        defaultFormModel,
        getSchema,
        formModel,
      });

      const { handleSubmit, validate, resetFields, getFieldsValue, clearValidate, setFieldsValue } =
        useFormEvents({
          emit,
          getProps,
          formModel,
          getSchema,
          formElRef: formElRef,
          defaultFormModel,
          loadingSub,
          handleFormValues,
        });

      function unfoldToggle() {
        gridCollapsed.value = !gridCollapsed.value;
      }

      async function setProps(formProps: Partial<FormProps>): Promise<void> {
        propsRef.value = deepMerge(unref(propsRef) || {}, formProps);
      }

      const formActionType: Partial<FormActionType> = {
        getFieldsValue,
        setFieldsValue,
        resetFields,
        validate,
        clearValidate,
        setProps,
        submit: handleSubmit,
      };

      watch(
        () => getSchema.value,
        (schema) => {
          console.log('1111', isUpdateDefaultRef);
          if (unref(isUpdateDefaultRef)) {
            return;
          }
          if (schema?.length) {
            initDefault();
            isUpdateDefaultRef.value = true;
          }
        }
      );

      onMounted(() => {
        initDefault();
        emit('register', formActionType);
      });

      return {
        formElRef,
        getBindValue,
        getGrid,
        formModel,
        getSchema,
        getProps,
        isInline,
        unfoldToggle,
        loadingSub,
        handleSubmit,
        resetFields,
        getComponentProps,
        getSubmitBtnOptions,
        getResetBtnOptions,
      };
    },
  });
</script>

<style scoped></style>
