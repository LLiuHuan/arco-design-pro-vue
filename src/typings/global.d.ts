// interface Window {
//   $loadingBar?: import('naive-ui').LoadingBarProviderInst;
//   $dialog?: import('naive-ui').DialogProviderInst;
//   $message?: import('naive-ui').MessageProviderInst;
//   $notification?: import('naive-ui').NotificationProviderInst;
// }

// interface Window extends Window {
//   MonacoEnvironment: import('monaco-editor').Environment;
// }

/** 通用类型 */
declare namespace Common {
  /**
   * 策略模式
   * [状态, 为true时执行的回调函数]
   */
  type StrategyAction = [boolean, () => void];
}

/** 构建时间 */
declare const PROJECT_BUILD_TIME: string;

declare type Nullable<T> = T | null;

declare type Recordable<T = any> = Record<string, T>;

declare type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null;

declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare type LabelValueOptions = {
  label: string;
  value: any;
  disabled: boolean;
  [key: string]: string | number | boolean;
}[];

declare interface ChangeEvent extends Event {
  target: HTMLInputElement;
}
