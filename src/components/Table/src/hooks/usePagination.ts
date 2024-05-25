import {computed, ComputedRef, ref, unref, watch} from 'vue';
import {BasicTableProps} from '@/components/Table/src/types/table';
import {isBoolean} from '@/utils/common';
import {PaginationProps} from '@arco-design/web-vue';
import {DEFAULT_CURRENT, DEFAULT_PAGE_SIZE, DEFAULT_PAGE_SIZE_OPTIONS, DEFAULT_SIZE,} from '../const';

export function usePagination(refProps: ComputedRef<BasicTableProps>) {
  const configRef = ref<PaginationProps>({});
  const show = ref(true);

  watch(
    () => unref(refProps).pagination,
    (pagination) => {
      if (!isBoolean(pagination) && pagination) {
        configRef.value = {
          ...unref(configRef),
          ...(pagination ?? {}),
        };
      }
    },
  );

  /**
   * @description 获取分页配置
   * @description Get pagination information
   */
  const getPaginationInfo = computed((): PaginationProps | boolean => {
    const {pagination} = unref(refProps);

    if (!unref(show) || (isBoolean(pagination) && !pagination)) {
      return false;
    }

    return {
      current: DEFAULT_CURRENT,
      size: DEFAULT_SIZE,
      defaultPageSize: DEFAULT_PAGE_SIZE,
      showTotal: true,
      showPageSize: true,
      showJumper: true,
      pageSizeOptions: DEFAULT_PAGE_SIZE_OPTIONS,
      ...(isBoolean(pagination) ? {} : pagination),
      ...unref(configRef),
    };
  });

  /**
   * @description 设置分页配置
   * @description Set pagination configuration
   * @param info 分页配置
   */
  const setPagination = (info: Partial<PaginationProps>) => {
    const paginationInfo = unref(getPaginationInfo);
    configRef.value = {
      ...(!isBoolean(paginationInfo) ? paginationInfo : {}),
      ...info,
    };
  };

  /**
   * @description 获取分页配置
   * @description Get pagination configuration
   */
  const getPagination = () => unref(getPaginationInfo);

  /**
   * @description 获取是否显示分页
   * @description Get whether to show pagination
   */
  const getShowPagination = () => unref(show);

  /**
   * @description 设置是否显示分页
   * @description Set whether to show pagination
   * @param flag 是否显示
   */
  const setShowPagination = async (flag: boolean) => {
    show.value = flag;
  };

  return {
    getPagination,
    getPaginationInfo,
    setPagination,
    getShowPagination,
    setShowPagination,
  };
}
