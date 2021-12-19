import { mapGetters, createNamespacedHelpers } from 'vuex';
import { useMapper } from './useMapper';

export function useGetters(moduleName, mapper) {
  let mapperFn = mapGetters;
  if (typeof moduleName === 'string' && moduleName.length > 0) {
    mapperFn = createNamespacedHelpers(moduleName).mapGetters;
  }

  return useMapper(mapper, mapperFn);
}
