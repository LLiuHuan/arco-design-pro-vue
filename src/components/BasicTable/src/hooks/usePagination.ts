// import { computed, unref, ref, ComputedRef } from 'vue';
// import { PaginationProps } from '@arco-design/web-vue/es/pagination/interface';
// import { isBoolean } from '@/utils';
// // import type { PaginationProps } from '../types/pagination';
// import type { BasicTableProps } from '../types/table';
// import { DEFAULTPAGESIZE, PAGESIZES } from '../const';
//
// export function usePagination(refProps: ComputedRef<BasicTableProps>) {
//   const configRef = ref<PaginationProps>({});
//   const show = ref(true);
//
//   const getPaginationInfo = computed((): PaginationProps | boolean => {
//     const { pagination } = unref(refProps);
//     if (!unref(show) || (isBoolean(pagination) && !pagination)) {
//       return false;
//     }
//     // const { totalField } = APISETTING;
//     return {
//       pageSize: DEFAULTPAGESIZE,
//       pageSizeOptions: PAGESIZES,
//       showPageSize: true,
//       showJumper: true,
//       showTotal: true,
//       ...(isBoolean(pagination) ? {} : pagination),
//       ...unref(configRef),
//       total: unref(configRef).total,
//     };
//   });
//
//   function setPagination(info: Partial<PaginationProps>) {
//     const paginationInfo = unref(getPaginationInfo);
//     configRef.value = {
//       ...(!isBoolean(paginationInfo) ? paginationInfo : {}),
//       ...info,
//     };
//   }
//
//   function getPagination() {
//     return unref(getPaginationInfo);
//   }
//
//   function getShowPagination() {
//     return unref(show);
//   }
//
//   async function setShowPagination(flag: boolean) {
//     show.value = flag;
//   }
//
//   return { getPagination, getPaginationInfo, setShowPagination, getShowPagination, setPagination };
// }
