/*
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:37:08
 * @LastEditTime: 2025-07-15 01:57:28
 * @LastEditors: LLiuHuan
 */
import type {
  ArcoFormSchema as FormSchema,
  ArcoFormProps,
} from '@arco/common-ui';

import type { ComponentType } from './component';

import { setupArcoForm, useArcoForm as useForm, z } from '@arco/common-ui';
import { $t } from '@arco/locales';

async function initSetupArcoForm() {
  setupArcoForm<ComponentType>({
    config: {
      // ant design vue组件库默认都是 v-model:value
      baseModelPropName: 'value',

      // 一些组件是 v-model:checked 或者 v-model:fileList
      modelPropNameMap: {
        Checkbox: 'checked',
        Radio: 'checked',
        Switch: 'checked',
        Upload: 'fileList',
      },
    },
    defineRules: {
      // 输入项目必填国际化适配
      required: (value, _params, ctx) => {
        if (value === undefined || value === null || value.length === 0) {
          return $t('ui.formRules.required', [ctx.label]);
        }
        return true;
      },
      // 选择项目必填国际化适配
      selectRequired: (value, _params, ctx) => {
        if (value === undefined || value === null) {
          return $t('ui.formRules.selectRequired', [ctx.label]);
        }
        return true;
      },
    },
  });
}

const useArcoForm = useForm<ComponentType>;

export { initSetupArcoForm, useArcoForm, z };

export type ArcoFormSchema = FormSchema<ComponentType>;
export type { ArcoFormProps };
