/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:37:08
 * @LastEditTime: 2025-08-12 15:20:00
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
      // naive-ui组件的空值为null,不能是undefined，否则重置表单时不生效
      emptyStateValue: null,
      baseModelPropName: 'value',
      modelPropNameMap: {
        Checkbox: 'checked',
        Radio: 'checked',
        Upload: 'fileList',
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
