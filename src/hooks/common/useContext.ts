import {
  InjectionKey,
  UnwrapRef,
  inject,
  provide,
  reactive,
  readonly as defineReadonly,
  Ref,
} from 'vue';

/**
 * @description create context options - [创建上下文选项]
 */
export interface CreateContextOptions {
  readonly?: boolean;
  createProvider?: boolean;
  native?: boolean;
}

/**
 * @description shallow unwrap - [浅层解包]
 */
type ShallowUnwrap<T> = {
  [P in keyof T]: UnwrapRef<T[P]>;
};

/**
 * @description app provider context props - [应用程序提供者上下文属性]
 */
export interface AppProviderContextProps {
  prefixCls: Ref<string>;
  isMobile: Ref<boolean>;
}

/**
 * @description injection key - [注入键]
 */
const key: InjectionKey<AppProviderContextProps> = Symbol();

/**
 * @description create context - [创建上下文]
 * @param context
 * @param key
 * @param options
 */
export function createContext<T>(
  context: any,
  key: InjectionKey<T> = Symbol(),
  options: CreateContextOptions = {},
) {
  const { readonly = true, createProvider = true, native = false } = options;

  const state = reactive(context);
  const provideData = readonly ? defineReadonly(state) : state;
  createProvider && provide(key, native ? context : provideData);

  return {
    state,
  };
}

/**
 * @description use context - [使用上下文]
 * @param key
 * @param native
 */
export function useContext<T>(key: InjectionKey<T>, native?: boolean): T;

/**
 * @description use context - [使用上下文]
 * @param key
 * @param defaultValue
 */
export function useContext<T>(
  key: InjectionKey<T> = Symbol(),
  defaultValue?: any,
): ShallowUnwrap<T> {
  return inject(key, defaultValue || {});
}

/**
 * @description create app provider context - [创建应用程序提供者上下文]
 * @param context
 */
export function createAppProviderContext(context: AppProviderContextProps) {
  return createContext<AppProviderContextProps>(context, key);
}

/**
 * @description use app provider context - [使用应用程序提供者上下文]
 */
export function useAppProviderContext() {
  return useContext<AppProviderContextProps>(key);
}

/**
 * @description use design - [使用设计]
 * @param scope
 */
export function useDesign(scope: string) {
  const values = useAppProviderContext();

  return {
    prefixCls: `${values.prefixCls}-${scope}`,
    prefixVar: values.prefixCls,
  };
}
