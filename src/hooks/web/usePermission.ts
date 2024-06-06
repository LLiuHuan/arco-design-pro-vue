import { RoleEnum } from '@/enums/authEnum';
import { useAppStore } from '@/store/modules/app';
import { useAuthStore } from '@/store/modules/auth';
import { PermissionModeEnum } from '@/enums';
import { isArray } from '@/utils/common';
import { intersection } from 'lodash-es';

export function usePermission() {
  const appStore = useAppStore();
  const authStore = useAuthStore();

  /**
   * Determine whether there is permission
   * 判断是否有权限
   * @param value
   * @param def
   */
  const hasPermission = (
    value?: RoleEnum | RoleEnum[] | string | string[],
    def = true,
  ) => {
    // 默认显示
    if (!value) {
      return def;
    }

    // 看一下是前端权限还是后端权限
    const permMode = appStore.getProjectConfig.permissionMode;

    // 前端权限
    if ([PermissionModeEnum.ROLE].includes(permMode)) {
      if (!isArray(value)) {
        return authStore.getRoleList?.includes(value as RoleEnum);
      }
      return (
        (intersection(value, authStore.getRoleList) as RoleEnum[]).length > 0
      );
    }

    // 后端权限
    if (PermissionModeEnum.BACK === permMode) {
      // const allCodeList = permissionStore.getPermCodeList as string[];
      // if (!isArray(value)) {
      //   const splits = ['||', '&&'];
      //   const splitName = splits.find((item) => value.includes(item));
      //   if (splitName) {
      //     const splitCodes = value.split(splitName);
      //     return splitName === splits[0]
      //       ? intersection(splitCodes, allCodeList).length > 0
      //       : intersection(splitCodes, allCodeList).length ===
      //           splitCodes.length;
      //   }
      //   return allCodeList.includes(value);
      // }
      // return (intersection(value, allCodeList) as string[]).length > 0;
    }
    return true;
  };
  return {
    hasPermission,
  };
}
