// import { App } from '~/types/app';
// import { RouteParams } from 'vue-router';
// import { toRaw } from 'vue';
//
// /**
//  * config menu with given params
//  */
// const menuParamRegex = /(?::)([\s\S]+?)((?=\/)|$)/g;
//
// export function configureDynamicParamsMenu(
//   menu: App.Menu,
//   params: RouteParams,
// ) {
//   const { meta, routePath } = toRaw(menu);
//   let realPath = routePath || meta?.dynamicPath;
//   const matchArr = realPath.match(menuParamRegex);
//
//   matchArr?.forEach((it: string) => {
//     const realIt = it.substring(1);
//     if (params[realIt]) {
//       realPath = realPath.replace(
//         `:${realIt}`,
//         params[realIt] as string,
//       ) as any;
//     }
//   });
//   // save original param path.
//   if (!paramPath && matchArr && matchArr.length > 0) {
//     menu.paramPath = routePath;
//   }
//   menu.routePath = realPath;
//   // children
//   menu.children?.forEach((item) => configureDynamicParamsMenu(item, params));
//   console.log('menuHelper: ', menu);
// }
