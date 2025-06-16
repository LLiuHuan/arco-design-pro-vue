/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 15:34:53
 * @LastEditTime: 2025-05-27 15:34:57
 * @LastEditors: LLiuHuan
 */
import { defineOverridesPreferences } from '@arco/preferences';

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
