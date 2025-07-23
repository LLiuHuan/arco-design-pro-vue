/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-06-14 23:31:49
 * @LastEditTime: 2025-06-14 23:31:51
 * @LastEditors: LLiuHuan
 */
import type {
  ArcoFormProps,
  ArcoFormSchema as FormSchema,
} from '@arco/common-ui';

import type { ComponentType } from './component';

import { setupArcoForm, useArcoForm as useForm, z } from '@arco/common-ui';
import { $t } from '@arco/locales';

async function initSetupArcoForm() {
  setupArcoForm<ComponentType>({
    config: {
      modelPropNameMap: {
        Upload: 'fileList',
        CheckboxGroup: 'model-value',
      },
    },
    defineRules: {
      required: (value, _params, ctx) => {
        if (value === undefined || value === null || value.length === 0) {
          return $t('ui.formRules.required', [ctx.label]);
        }
        return true;
      },
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
