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
