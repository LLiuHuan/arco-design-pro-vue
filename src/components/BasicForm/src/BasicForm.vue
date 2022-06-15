<template>
  <a-form v-bind="getBindValue" :model="formModel" ref="formElRef">
    <a-grid v-bind="getGrid">
      <a-grid-item v-bind="schema.gridItemProps" v-for="(schema, index) in getSchema" :key="index">
        <a-form-item v-bind="schema">
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
                  v-for="(item, index) in schema.componentProps?.options"
                  :key="index"
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
                  v-for="(item, index) in schema.componentProps?.options"
                  :key="index"
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
            :class="{ isFull: schema.isFull !== false }"
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
      </a-grid-item>
      <!--提交 重置 展开 收起 按钮-->
      <a-grid-item
        :span="isInline ? getSchema[0].gridItemProps?.span : 24"
        #="{ overflow }"
        :suffix="!!isInline"
        v-if="showActionButtonGroup"
      >
        <a-space class="pl-7" align="center" wrap>
          <a-button
            v-if="showSubmitButton"
            v-bind="getSubmitBtnOptions"
            @click="handleSubmit"
            :loading="loadingSub"
            >{{ submitButtonText }}
          </a-button>
          <a-button v-if="showResetButton" v-bind="getResetBtnOptions" @click="resetFields"
            >{{ resetButtonText }}
          </a-button>
          <a-button
            type="text"
            v-if="isInline && getProps.showAdvancedButton"
            @click="unfoldToggle"
          >
            <template #icon>
              <IconDown v-if="overflow" :size="14" />
              <IconUp v-else :size="14" />
            </template>
            {{ overflow ? '展开' : '收起' }}
          </a-button>
        </a-space>
      </a-grid-item>
    </a-grid>
  </a-form>
</template>

<script lang="ts">
  import { computed, defineComponent, onMounted, ref, unref, watch } from 'vue';
  import {
    AutoComplete,
    Cascader,
    Checkbox,
    CheckboxGroup,
    DatePicker,
    Input,
    InputGroup,
    InputNumber,
    InputPassword,
    InputSearch,
    InputTag,
    MonthPicker,
    Radio,
    RadioGroup,
    RangePicker,
    Rate,
    Select,
    Slider,
    Switch,
    TimePicker,
    TreeSelect,
    Upload,
    WeekPicker,
  } from '@arco-design/web-vue';
  import { IconDown, IconQuestionCircle, IconUp } from '@arco-design/web-vue/es/icon';
  import { deepMerge } from '@/utils';
  import {
    BaseFormProps,
    FormActionType,
    FormProps,
    FormSchema,
  } from '@/components/BasicForm/src/types/form';
  import { basicProps } from '@/components/BasicForm/src/props';
  import { useFormValues } from '@/components/BasicForm/src/hooks/useFormValues';
  import { isArray } from '@/utils/is';
  import { useFormEvents } from '@/components/BasicForm/src/hooks/useFormEvents';
  import { createPlaceholderMessage } from '@/components/BasicForm/src/helper';
  import { GridProps } from './types/grid';

  export default defineComponent({
    name: 'BasicForm',
    components: {
      IconQuestionCircle,
      IconDown,
      IconUp,
      Input,
      InputGroup,
      InputPassword,
      InputSearch,
      InputNumber,
      InputTag,
      Select,
      TreeSelect,
      Radio,
      RadioGroup,
      Checkbox,
      CheckboxGroup,
      AutoComplete,
      Cascader,
      DatePicker,
      MonthPicker,
      RangePicker,
      WeekPicker,
      TimePicker,
      Switch,
      Upload,
      Slider,
      Rate,
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

      // 获取并拼接props内容
      const getProps = computed((): BaseFormProps => {
        const baseFormProps = { ...props, ...unref(propsRef) } as BaseFormProps;
        const rulesObj: any = {
          rules: {},
        };
        const schemas: any = baseFormProps.schemas || [];
        schemas.forEach((item) => {
          if (item.rules && isArray(item.rules)) {
            rulesObj.rules[item.field] = item.rules;
          }
        });
        return { ...baseFormProps, ...unref(rulesObj) };
      });

      // 获取确定按钮样式
      const getSubmitBtnOptions = computed(() => {
        return {
          size: unref(getProps).formProps?.size ? unref(getProps).formProps?.size : 'medium',
          type: 'primary',
          ...unref(getProps).submitButtonOptions,
        };
      });

      // 获取重置按钮样式
      const getResetBtnOptions = computed(() => {
        return {
          size: unref(getProps).formProps?.size ? unref(getProps).formProps?.size : 'medium',
          ...unref(getProps).resetButtonOptions,
        };
      });

      const isInline = computed(() => {
        const { formProps } = unref(getProps);
        return formProps?.layout === 'inline';
      });

      // 获取grid的row的样式
      const getGrid = computed((): Partial<GridProps> | undefined => {
        const { gridProps } = unref(getProps);
        if (gridProps) {
          return {
            ...gridProps,
            collapsed: isInline.value ? gridCollapsed.value : false,
          };
        }
        return undefined;
      });

      // 获取动态渲染表单的props
      function getComponentProps(schema) {
        const compProps = schema.componentProps ?? {};
        const { component } = schema;
        return {
          allowClear: true,
          placeholder: createPlaceholderMessage(unref(component)),
          ...compProps,
        };
      }

      // 获取form表单的props
      const getBindValue = computed(
        () => ({ ...attrs, ...props.formProps, ...unref(getProps) } as Recordable)
      );

      // 获取动态表单
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

      // 使用 formValues Hooks
      const { handleFormValues, initDefault } = useFormValues({
        // getProps,
        defaultFormModel,
        getSchema,
        formModel,
      });

      // 使用 formEvents Hooks
      const { handleSubmit, validate, resetFields, getFieldsValue, clearValidate, setFieldsValue } =
        useFormEvents({
          emit,
          getProps,
          formModel,
          getSchema,
          formElRef,
          defaultFormModel,
          loadingSub,
          handleFormValues,
        });

      // 展开折叠
      function unfoldToggle() {
        gridCollapsed.value = !gridCollapsed.value;
      }

      // 写入props
      async function setProps(formProps: Partial<FormProps>): Promise<void> {
        propsRef.value = deepMerge(unref(propsRef) || {}, formProps);
      }

      // formActionType
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
