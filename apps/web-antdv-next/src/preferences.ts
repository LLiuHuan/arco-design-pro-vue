/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2026-02-19 01:29:54
 * @LastEditTime: 2026-02-19 01:37:19
 * @LastEditors: LLiuHuan
 */
import { defineOverridesPreferences } from '@qin/preferences';

/**
 * @description 项目配置文件
 * 只需要覆盖项目中的一部分配置，不需要的配置不用覆盖，会自动使用默认配置
 * !!! 更改配置后请清空缓存，否则可能不生效
 */
export const overridesPreferences = defineOverridesPreferences({
  // overrides
  app: {
    name: import.meta.env.VITE_APP_TITLE,
  },
});
