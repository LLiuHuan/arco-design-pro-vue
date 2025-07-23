/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:37:08
 * @LastEditTime: 2025-07-24 02:19:13
 * @LastEditors: LLiuHuan
 */
import type {
  ComponentRecordType,
  GenerateMenuAndRoutesOptions,
} from '@arco/types';

import { generateAccessible } from '@arco/access';
import { preferences } from '@arco/preferences';

import { message } from '#/adapter/naive';
import MenuAPI from '#/api/core/menu';
import { BasicLayout, IFrameView } from '#/layouts';
import { $t } from '#/locales';

const forbiddenComponent = () => import('#/views/_core/fallback/forbidden.vue');

async function generateAccess(options: GenerateMenuAndRoutesOptions) {
  const pageMap: ComponentRecordType = import.meta.glob('../views/**/*.vue');

  const layoutMap: ComponentRecordType = {
    BasicLayout,
    IFrameView,
  };

  return await generateAccessible(preferences.app.accessMode, {
    ...options,
    fetchMenuListAsync: async () => {
      message.loading(`${$t('common.loadingMenu')}...`, {
        duration: 1.5,
      });
      return await MenuAPI.getMenusApi();
    },
    // 可以指定没有权限跳转403页面
    forbiddenComponent,
    // 如果 route.meta.menuVisibleWithForbidden = true
    layoutMap,
    pageMap,
  });
}

export { generateAccess };
