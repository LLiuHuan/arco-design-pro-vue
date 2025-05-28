/*
 * @Description: 国际化类型
 * @Author: LLiuHuan
 * @Date: 2025-05-22 17:15:20
 * @LastEditTime: 2025-05-22 17:16:41
 * @LastEditors: LLiuHuan
 */
export type SupportedLanguagesType = 'en-US' | 'zh-CN';

export type ImportLocaleFn = () => Promise<{ default: Record<string, string> }>;

export type LoadMessageFn = (
  lang: SupportedLanguagesType,
) => Promise<Record<string, string> | undefined>;

export interface LocaleSetupOptions {
  /**
   * 默认语言
   * @default zh-CN
   */
  defaultLocale?: SupportedLanguagesType;
  /**
   * 加载消息函数
   * @param lang
   * @returns
   */
  loadMessages?: LoadMessageFn;
  /**
   * 未找到时是否提示警告
   */
  missingWarn?: boolean;
}
