declare type Recordable<T = any> = Record<string, T>;

declare let __APP_INFO__: {
  pkg: {
    name: string;
    version: string;
    dependencies: Recordable<string>;
    devDependencies: Recordable<string>;
  };
  lastBuildTime: string;
};

declare global {
  declare type Recordable<T = any> = Record<string, T>;

  declare function parseInt(s: string | number, radix?: number): number;

  declare type Nullable<T> = T | null;

  declare interface ViteEnv {
    VITE_PORT: number;
    VITE_BASE_URL: string;
    VITE_USE_MOCK: boolean;
    VITE_PUBLIC_PATH: string;
    VITE_GLOB_APP_TITLE: string;
    VITE_GLOB_APP_SHORT_NAME: string;
    VITE_DROP_CONSOLE: boolean;
    VITE_GLOB_PROD_MOCK: boolean;
    VITE_GLOB_IMG_URL: string;
    VITE_PROXY: [string, string][];
    VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none';
    VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
  }

  namespace JSX {
    // tslint:disable no-empty-interface
    type Element = VNode;
    // tslint:disable no-empty-interface
    type ElementClass = ComponentRenderProxy;

    interface ElementAttributesProperty {
      $props: any;
    }

    interface IntrinsicElements {
      [elem: string]: any;
    }

    interface IntrinsicAttributes {
      [elem: string]: any;
    }
  }
}
