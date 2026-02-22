/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-12-16 12:38:20
 * @LastEditTime: 2026-02-23 00:06:33
 * @LastEditors: LLiuHuan
 */
import type { BasicUserInfo } from '@qin/types';

export interface Props {
  title?: string;
  userInfo: BasicUserInfo | null;
  tabs: {
    label: string;
    value: string;
  }[];
}

export interface FormSchemaItem {
  description: string;
  fieldName: string;
  label: string;
  value: boolean;
}

export interface SettingProps {
  formSchema: FormSchemaItem[];
}
