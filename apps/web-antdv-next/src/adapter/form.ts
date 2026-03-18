/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2026-02-19 01:29:54
 * @LastEditTime: 2026-03-18 10:54:17
 * @LastEditors: LLiuHuan
 */
import type { ComponentType } from './component';

import type { QinFormSchema as FormSchema, QinFormProps } from '@qin/common-ui';
import { setupQinForm, useQinForm as useForm, z } from '@qin/common-ui';
import { $t } from '@qin/locales';

async function initSetupQinForm() {
  setupQinForm<ComponentType>({
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

const useQinForm = useForm<ComponentType>;

export { initSetupQinForm, useQinForm, z };

export type QinFormSchema = FormSchema<ComponentType>;
export type { QinFormProps };
