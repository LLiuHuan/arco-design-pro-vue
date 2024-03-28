declare global {}

// const __APP_INFO__: {
//   pkg: {
//     name: string;
//     version: string;
//     dependencies: Recordable<string>;
//     devDependencies: Recordable<string>;
//   };
//   lastBuildTime: string;
// };

// nullable type - [可以为空的类型]
declare type Nullable<T> = T | null;
declare type Recordable<T = any> = Record<string, T>;
declare type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

declare type TargetContext = '_self' | '_blank';

interface Document {
  startViewTransition?: (
    callback: () => Promise<void> | void,
  ) => ViewTransition;
}

declare type ComponentRef<T extends HTMLElement = HTMLDivElement> =
  ComponentElRef<T> | null;

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;
