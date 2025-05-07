/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2024-05-13 22:31:00
 * @LastEditTime: 2024-08-21 15:55:29
 * @LastEditors: LLiuHuan
 */
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

declare type TimeoutHandle = ReturnType<typeof setTimeout>;
declare type IntervalHandle = ReturnType<typeof setInterval>;
declare type ClassName =
  | string
  | Record<string, boolean>
  | (string | Record<string, boolean>)[];
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

/**
 * 策略模式
 * [状态, 为true时执行的回调函数]
 */
type StrategyAction = [boolean, () => void];

declare type ComponentRef<T extends HTMLElement = HTMLDivElement> =
  ComponentElRef<T> | null;

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;

declare interface ChangeEvent extends Event {
  target: HTMLInputElement;
}

/** Build time of the project */
declare const BUILD_TIME: string;

declare type EmitType = ReturnType<typeof defineEmits>;

declare module '*.vue' {
  import Vue from 'vue';

  export default Vue;
}
