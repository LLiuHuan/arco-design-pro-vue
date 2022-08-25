// import { ref, ComputedRef, unref, computed, onMounted, watchEffect, watch, Ref } from 'vue';
// import { PaginationProps } from '@arco-design/web-vue/es/pagination/interface';
// import { isBoolean, isFunction } from '@/utils';
// import type { BasicTableProps } from '../types/table';
// import { APISETTING } from '../const';
//
// interface test {
//   getPaginationInfo: ComputedRef<boolean | PaginationProps>;
//   setPagination: (info: Partial<PaginationProps>) => void;
//   setLoading: (flag: boolean) => void;
//   tableData: Ref<Recordable[]>;
// }
//
// export function useDataSource(
//   propsRef: ComputedRef<BasicTableProps>,
//   { getPaginationInfo, setPagination, setLoading, tableData }: test,
//   emit: (
//     event:
//       | 'fetch-success'
//       | 'fetch-error'
//       | 'update:checked-row-keys'
//       | 'edit-end'
//       | 'edit-cancel'
//       | 'edit-row-end'
//       | 'edit-change',
//     ...args: any[]
//   ) => void
// ) {
//   const dataSourceRef = ref<Recordable[]>([]);
//
//   watchEffect(() => {
//     tableData.value = unref(dataSourceRef);
//   });
//
//   watch(
//     () => unref(propsRef).dataSource,
//     () => {
//       const { dataSource }: any = unref(propsRef);
//       dataSource && (dataSourceRef.value = dataSource);
//     },
//     {
//       immediate: true,
//     }
//   );
//
//   const getRowKey = computed(() => {
//     const { rowKey }: any = unref(propsRef);
//     return (
//       rowKey ||
//       (() => {
//         return 'key';
//       })
//     );
//   });
//
//   const getDataSourceRef = computed(() => {
//     const dataSource = unref(dataSourceRef);
//     if (!dataSource || dataSource.length === 0) {
//       return unref(dataSourceRef);
//     }
//     return unref(dataSourceRef);
//   });
//
//   async function fetch(opt?: any) {
//     try {
//       setLoading(true);
//       const { request, pagination, beforeRequest, afterRequest }: any = unref(propsRef);
//       if (!request) return;
//       // 组装分页信息
//       const { pageField } = APISETTING;
//       const { sizeField } = APISETTING;
//       const { totalField } = APISETTING;
//       const { listField } = APISETTING;
//
//       let pageParams = {};
//       const { current = 1, pageSize = 10 } = unref(getPaginationInfo) as PaginationProps;
//
//       if ((isBoolean(pagination) && !pagination) || isBoolean(getPaginationInfo)) {
//         pageParams = {};
//       } else {
//         // @ts-ignore
//         pageParams[pageField] = (opt && opt[pageField]) || current;
//         // @ts-ignore
//         pageParams[sizeField] = pageSize;
//       }
//
//       let params = {
//         ...pageParams,
//       };
//       if (beforeRequest && isFunction(beforeRequest)) {
//         // The params parameter can be modified by outsiders
//         params = (await beforeRequest(params)) || params;
//       }
//       const res = await request(params);
//
//       const resultTotal = res[totalField] || 0;
//       const currentPage = res[pageField];
//
//       // 如果数据异常，需获取正确的页码再次执行
//       if (resultTotal) {
//         if (current > resultTotal) {
//           setPagination({
//             [pageField]: resultTotal,
//           });
//           fetch(opt);
//         }
//       }
//       let resultInfo = res[listField] ? res[listField] : [];
//       if (afterRequest && isFunction(afterRequest)) {
//         // can modify the data returned by the interface for processing
//         resultInfo = (await afterRequest(resultInfo)) || resultInfo;
//       }
//       dataSourceRef.value = resultInfo;
//       setPagination({
//         [pageField]: currentPage,
//         [totalField]: resultTotal,
//       });
//       if (opt && opt[pageField]) {
//         setPagination({
//           [pageField]: opt[pageField] || 1,
//         });
//       }
//       emit('fetch-success', {
//         items: unref(resultInfo),
//         resultTotal,
//       });
//     } catch (error) {
//       console.error(error);
//       emit('fetch-error', error);
//       dataSourceRef.value = [];
//       // setPagination({
//       //   pageCount: 0,
//       // });
//     } finally {
//       setLoading(false);
//     }
//   }
//
//   onMounted(() => {
//     setTimeout(() => {
//       fetch();
//     }, 16);
//   });
//
//   function setTableData(values: any[]) {
//     dataSourceRef.value = values;
//   }
//
//   function getDataSource(): any[] {
//     return getDataSourceRef.value;
//   }
//
//   async function reload(opt?: any) {
//     await fetch(opt);
//   }
//
//   return {
//     fetch,
//     getRowKey,
//     getDataSourceRef,
//     getDataSource,
//     setTableData,
//     reload,
//   };
// }
