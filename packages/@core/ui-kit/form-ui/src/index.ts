/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 11:33:35
 * @LastEditTime: 2025-05-27 11:39:39
 * @LastEditors: LLiuHuan
 */
export { setupArcoForm } from './config';

export type {
  ArcoFormProps,
  FormSchema as ArcoFormSchema,
  BaseFormComponentType,
  ExtendedFormApi,
} from './types';

export * from './use-arco-form';
// export { default as ArcoForm } from './arco-form.vue';
export * as z from 'zod';
