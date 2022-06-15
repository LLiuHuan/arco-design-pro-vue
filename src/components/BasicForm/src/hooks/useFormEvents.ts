import type { ComputedRef, Ref } from 'vue';
import { toRaw, unref } from 'vue';
import { isFunction } from '@/utils';
import type { FormSchema } from '../types/form';
import { BaseFormProps } from '../types/form';

declare type EmitType = (event: string, ...args: any[]) => void;

interface UseFormActionContext {
  emit: EmitType;
  getProps: ComputedRef<BaseFormProps>;
  getSchema: ComputedRef<FormSchema[]>;
  formModel: Ref<Recordable>;
  formElRef: Ref;
  defaultFormModel: Recordable;
  loadingSub: Ref<boolean>;
  handleFormValues: Function;
}

export function useFormEvents({
  emit,
  getProps,
  formModel,
  getSchema,
  formElRef,
  defaultFormModel,
  loadingSub,
  handleFormValues,
}: UseFormActionContext) {
  // 验证
  async function validate() {
    return unref(formElRef)?.validate();
  }

  // 提交
  async function handleSubmit(e?: Event): Promise<void> {
    e && e.preventDefault();
    loadingSub.value = true;
    const { submitFunc } = unref(getProps);
    if (submitFunc && isFunction(submitFunc)) {
      await submitFunc();
      return;
    }
    const formEl = unref(formElRef);
    if (!formEl) {
      loadingSub.value = false;
      return;
    }
    try {
      validate().then((res) => {
        if (res) {
          loadingSub.value = false;
          return;
        }
        loadingSub.value = false;
        emit('submit', formModel);
      });
    } catch (error) {
      loadingSub.value = false;
    }
  }

  // 清空校验
  async function clearValidate() {
    unref(formElRef)?.clearValidate();
  }

  // 重置
  async function resetFields(): Promise<void> {
    const { resetFunc, submitOnReset } = unref(getProps);
    resetFunc && isFunction(resetFunc) && (await resetFunc());

    const formEl = unref(formElRef);
    if (!formEl) return;
    Object.keys(formModel.value).forEach((key) => {
      formModel.value[key] = unref(defaultFormModel)[key] || '';
    });
    await clearValidate();
    const fromValues = handleFormValues(toRaw(unref(formModel.value)));
    emit('reset', fromValues);
    submitOnReset && (await handleSubmit());
  }

  // 获取表单值
  function getFieldsValue(): Recordable {
    const formEl = unref(formElRef);
    if (!formEl) return {};
    return handleFormValues(toRaw(unref(formModel)));
  }

  // 设置表单字段值
  async function setFieldsValue(values: Recordable): Promise<void> {
    const fields = unref(getSchema)
      .map((item) => item.field)
      .filter(Boolean);

    Object.keys(values).forEach((key) => {
      const value = values[key];
      if (fields.includes(key)) {
        formModel[key] = value;
      }
    });
  }

  return {
    handleSubmit,
    validate,
    resetFields,
    getFieldsValue,
    clearValidate,
    setFieldsValue,
  };
}
