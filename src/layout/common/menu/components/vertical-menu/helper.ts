import { MenuModeEnum } from '@/enums';
import { Ref, toRaw, unref } from 'vue';
// import type { App } from '~/types/app';
// import { uniq } from 'lodash-es';
// import { useTimeoutFn } from '@vueuse/core';
// import { useMenuSetting } from '@/hooks/setting';
// import { MenuState } from './types';

// export function useOpenKeys(
//   menuState: MenuState,
//   menus: Ref<App.Menu[]>,
//   mode: Ref<MenuModeEnum>,
//   accordion: Ref<boolean>,
// ) {
//   const { getIsMixSidebar } = useMenuSetting();
//
//   async function setOpenKeys(path: string) {
//     if (mode.value === MenuModeEnum.HORIZONTAL) {
//       return;
//     }
//     const native = unref(getIsMixSidebar);
//     const handle = () => {
//       const menuList = toRaw(menus.value);
//       if (menuList?.length === 0) {
//         menuState.openKeys = [];
//         return;
//       }
//       if (!unref(accordion)) {
//         menuState.openKeys = uniq([
//           ...menuState.openKeys,
//           ...getAllParentPath(menuList, path),
//         ]);
//       } else {
//         menuState.openKeys = getAllParentPath(menuList, path);
//       }
//     };
//     if (native) {
//       handle();
//     } else {
//       useTimeoutFn(handle, 16);
//     }
//   }
//
//   return {
//     setOpenKeys,
//   };
// }
