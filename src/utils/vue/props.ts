import { unref } from 'vue';

export function getDynamicProps<T extends Record<string, unknown>, U>(
  props: T,
): Partial<U> {
  const ret: Recordable = {};

  Object.keys(props).forEach((key) => {
    ret[key] = unref((props as Recordable)[key]);
  });

  return ret as Partial<U>;
}
