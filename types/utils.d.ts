import { ComputedRef, Ref } from 'vue';

declare namespace TypeUtil {
  interface DataType {
    boolean: boolean;
    null: null;
    undefined: undefined;
    bigInt: bigint;
    regExp: RegExp;
    set: Set<any>;
    map: Map<any, any>;
    file: File;
    promise: Promise<any>;
  }

  type TypeStringKey = keyof DataType;

  type TypeString<T extends TypeStringKey = TypeStringKey> =
    `[object ${Capitalize<T>}]`;
}

export type DynamicProps<T> = {
  [P in keyof T]: Ref<T[P]> | T[P] | ComputedRef<T[P]>;
};
