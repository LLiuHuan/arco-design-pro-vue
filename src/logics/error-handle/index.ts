import { App } from 'vue';
import { appSetting } from '@/settings';
import { useErrorLogStore } from '@/store/modules/errorLog';
import { ErrorTypeEnum } from '@/enums';
import { ErrorLogInfo } from '~/types/storage';

/**
 * @description 处理脚本错误
 * @description Handling error stack information
 * @param error
 */
function processStackMsg(error: Error) {
  if (!error.stack) {
    return '';
  }
  let stack = error.stack
    .replace(/\n/gi, '') // Remove line breaks to save the size of the transmitted content
    .replace(/\bat\b/gi, '@') // At in chrome, @ in ff
    .split('@') // Split information with @
    .slice(0, 9) // The maximum stack length (Error.stackTraceLimit = 10), so only take the first 10
    .map((v) => v.replace(/^\s*|\s*$/g, '')) // Remove extra spaces
    .join('~') // Manually add separators for later display
    .replace(/\?[^:]+/gi, ''); // Remove redundant parameters of js file links (?x=1 and the like)
  const msg = error.toString();
  if (stack.indexOf(msg) < 0) {
    stack = `${msg}@${stack}`;
  }
  return stack;
}

/**
 * @description 获取组件名称
 * @description get comp name
 * @param vm
 */
function formatComponentName(vm: any) {
  if (vm.$root === vm) {
    return {
      name: 'root',
      path: 'root',
    };
  }

  const options = vm.$options as any;
  if (!options) {
    return {
      name: 'anonymous',
      path: 'anonymous',
    };
  }
  const name = options.name || options._componentTag;
  return {
    name,
    path: options.__file,
  };
}

/**
 * @description 处理错误堆栈信息
 * @description Configure Vue error handling function
 */
function vueErrorHandler(err: unknown, vm: any, info: string) {
  const errorLogStore = useErrorLogStore();
  const { name, path } = formatComponentName(vm);
  errorLogStore.addErrorLogInfo({
    type: ErrorTypeEnum.VUE,
    name,
    file: path,
    message: (err as Error).message,
    stack: processStackMsg(err as Error),
    detail: info,
    url: window.location.href,
  });
}

/**
 * @description 注册promise异常处理
 * @description Configure script error handling function
 */
export function scriptErrorHandler(
  event: Event | string,
  source?: string,
  lineno?: number,
  colno?: number,
  error?: Error,
) {
  if (event === 'Script error.' && !source) {
    return false;
  }
  const errorInfo: Partial<ErrorLogInfo> = {};
  colno = colno || (window.event && (window.event as any).errorCharacter) || 0;
  errorInfo.message = event as string;
  if (error?.stack) {
    errorInfo.stack = error.stack;
  } else {
    errorInfo.stack = '';
  }
  const name = source ? source.substr(source.lastIndexOf('/') + 1) : 'script';
  const errorLogStore = useErrorLogStore();
  errorLogStore.addErrorLogInfo({
    type: ErrorTypeEnum.SCRIPT,
    name,
    colno,
    file: source as string,
    detail: `lineno${lineno}`,
    url: window.location.href,
    ...(errorInfo as Pick<ErrorLogInfo, 'message' | 'stack'>),
  });
  return true;
}

/**
 * @description 注册资源异常处理
 * @description Configure Promise error handling function
 */
function registerPromiseErrorHandler() {
  window.addEventListener(
    'unhandledrejection',
    function (event) {
      const errorLogStore = useErrorLogStore();
      errorLogStore.addErrorLogInfo({
        type: ErrorTypeEnum.PROMISE,
        name: 'Promise Error!',
        file: 'none',
        detail: 'promise error!',
        url: window.location.href,
        stack: 'promise error!',
        message: event.reason,
      });
    },
    true,
  );
}

/**
 * @description 注册资源加载错误处理函数
 * @description Configure monitoring resource loading error handling function
 */
function registerResourceErrorHandler() {
  // Monitoring resource loading error(img,script,css,and jsonp)
  window.addEventListener(
    'error',
    function (e: Event) {
      const target = e.target ? e.target : (e.srcElement as any);
      const errorLogStore = useErrorLogStore();
      errorLogStore.addErrorLogInfo({
        type: ErrorTypeEnum.RESOURCE,
        name: 'Resource Error!',
        file: (e.target || ({} as any)).currentSrc,
        detail: JSON.stringify({
          tagName: target.localName,
          html: target.outerHTML,
          type: e.type,
        }),
        url: window.location.href,
        stack: 'resource is not found',
        message: `${(e.target || ({} as any)).localName} is load error`,
      });
    },
    true,
  );
}

/**
 * @description 配置全局错误处理
 * @description Configure global error handling
 * @param app
 */
export function setupErrorHandle(app: App) {
  const { useErrorHandle } = appSetting;
  if (!useErrorHandle) {
    return;
  }
  // Vue exception monitoring;
  app.config.errorHandler = vueErrorHandler;

  // script error
  window.onerror = scriptErrorHandler;

  //  promise exception
  registerPromiseErrorHandler();

  // Static resource exception
  registerResourceErrorHandler();
}
