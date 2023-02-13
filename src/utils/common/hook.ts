// dynamic use hook props
// import { unref } from 'vue';

// export function getDynamicProps<T, U>(props: T): Partial<U> {
//   const ret: Recordable = {};
//
//   Object.keys(props).map((key) => {
//     ret[key] = unref((props as Recordable)[key]);
//   });
//
//   return ret as Partial<U>;
// }
