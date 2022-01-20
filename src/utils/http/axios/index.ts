import axios, { AxiosResponse } from 'axios';
import { VAxios } from '@/utils/http/axios/VAxios';
import { useGlobSetting } from '@/hooks/setting';
import { ContentTypeEnum, RequestEnum, ResultEnum } from '@/enums/httpEnum';
import { AxiosTransform } from '@/utils/http/axios/axiosTransform';
import { RequestOptions, Result } from '@/utils/http/axios/types';
// import { PageEnum } from '@/enums/pageEnum';
import { isString } from '@/utils/is';
import { formatRequestDate, joinTimestamp } from '@/utils/http/axios/helper';
import { setObjToUrlParams } from '@/utils/http/axios/utlUtil';
import { checkStatus } from '@/utils/http/axios/checkStatus';
import { Message, Modal } from '@arco-design/web-vue';
import { PageEnum } from '@/enums/pageEnum';
import router from '@/router';
import { storage } from '@/utils/storage';
import { useUserStore } from '@/store/modules/users';
import { ACCESS_TOKEN } from '@/store/mutation-types';

const globSetting = useGlobSetting();
const urlPrefix = globSetting.urlPrefix || '';

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  /**
   * @description: 处理请求数据
   */
  transformRequestData: (
    res: AxiosResponse<Result>,
    options: RequestOptions,
    reject: (reason?: any) => void
  ) => {
    // @ts-ignore
    // const { $message: Message, $dialog: Modal } = window;
    if (res.headers['new-token']) {
      const usersStore = useUserStore();
      console.log(res.headers);
      usersStore.setToken(res.headers['new-token']);
    }

    const {
      isShowMessage = true, // 是否显示提示信息
      isShowErrorMessage, // 是否显示失败信息
      isShowSuccessMessage, // 是否显示成功信息
      successMessageText, // 成功的文本信息
      errorMessageText, // 错误的文本信息
      isTransformResponse, // 不进行任何处理，直接返回
      isReturnNativeResponse, // 是否返回原生响应头
    } = options;

    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res;
    }
    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse) {
      return res.data;
    }

    // const reject = Promise.reject;

    const result = res.data;

    if (!result) {
      // return '[HTTP] Request has no return value';
      return reject(result);
    }
    //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
    const { code, data, message } = result;
    // 请求成功
    const hasSuccess = result && Reflect.has(result, 'code') && code === ResultEnum.SUCCESS;
    // 是否显示提示信息
    if (isShowMessage) {
      if (hasSuccess && (successMessageText || isShowSuccessMessage)) {
        // 是否显示自定义信息提示
        Message.success(successMessageText || message || '操作成功！');
      } else if (!hasSuccess && (errorMessageText || isShowErrorMessage)) {
        // 是否显示自定义信息提示
        Message.error(message || errorMessageText || '操作失败！');
      } else if (!hasSuccess && options.errorMessageMode === 'modal') {
        Modal.info({
          title: '提示',
          content: message,
          okText: '确定',
          onOk: () => {},
          onCancel: () => {},
        });
        // console.log(
        //   'components errorMessageMode=‘custom-modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误'
        // );
      }
    }

    // 接口请求成功，直接返回结果
    if (code === ResultEnum.SUCCESS) {
      return data;
    }
    // 接口请求错误，统一提示错误信息
    if (code === ResultEnum.ERROR) {
      const msg = message ? message : '操作失败,系统异常!';
      Message.error(msg);
      // Promise.reject(msg);
      return reject(msg);
    }

    // 登录超时
    if (code === ResultEnum.TIMEOUT) {
      const LoginName = PageEnum.BASE_LOGIN_NAME;
      if (router.currentRoute.value.name == LoginName) return;
      // 到登录页
      const timeoutMsg = '登录超时,请重新登录!';
      Modal.warning({
        title: '提示',
        content: '登录身份已失效，请重新登录!',
        okText: '确定',
        cancelText: '取消',
        onOk: () => {
          storage.clear();
          router.replace({
            name: LoginName,
            query: {
              redirect: router.currentRoute.value.fullPath,
            },
          });
        },
        onCancel: () => {},
      });
      return reject(new Error(timeoutMsg));
    }

    // 这里逻辑可以根据项目进行修改
    if (!hasSuccess) {
      return reject(new Error(message));
    }

    return data;
  },

  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true } = options;

    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }

    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`;
    }
    const params = config.params || {};
    const data = config.data || false;
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`;
        config.params = undefined;
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params);
        if (Reflect.has(config, 'data') && config.data && Object.keys(config.data).length) {
          config.data = data;
          config.params = params;
        } else {
          config.data = params;
          config.params = undefined;
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(
            config.url as string,
            Object.assign({}, config.params, config.data)
          );
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params;
        config.params = undefined;
      }
    }
    return config;
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config) => {
    // 请求之前处理config
    // const userStore = useUserStoreWidthOut();
    const token = storage.get(ACCESS_TOKEN);
    if (token) {
      // jwt token
      if (config.headers) {
        config.headers['x-token'] = token;
      }
    }
    return config;
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (error: any) => {
    console.log(error);
    // @ts-ignore
    const { response, code, message } = error || {};
    // TODO 此处要根据后端接口返回格式修改
    const msg: string =
      response && response.data && response.data.message ? response.data.message : '';
    const err: string = error.toString();
    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        Message.error('接口请求超时,请刷新页面重试!');
        return;
      }
      if (err && err.includes('Network Error')) {
        Modal.info({
          title: '网络异常',
          content: '请检查您的网络连接是否正常!',
          okText: '确定',
          onOk: () => {},
          onCancel: () => {},
        });
        return;
      }
    } catch (error) {
      throw new Error(error as string);
    }
    // 请求是否被取消
    const isCancel = axios.isCancel(error);
    if (!isCancel) {
      checkStatus(error.response && error.response.status, msg, console);
    } else {
      Message.warning('请求被取消！');
      // console.warn(error, '请求被取消！');
    }
    return error;
  },
};

const Axios = new VAxios({
  timeout: 10 * 1000,
  // 接口前缀
  prefixUrl: urlPrefix,
  headers: { 'Content-Type': ContentTypeEnum.JSON },
  // 数据处理方式
  transform,
  // 配置项，下面的选项都可以在独立的接口请求中覆盖
  requestOptions: {
    // 默认将prefix 添加到url
    joinPrefix: true,
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    isReturnNativeResponse: false,
    // 需要对返回数据进行处理
    isTransformResponse: true,
    // post请求的时候添加参数到url
    joinParamsToUrl: false,
    // 格式化提交参数时间
    formatDate: true,
    // 消息提示类型
    errorMessageMode: 'none',
    // 接口地址
    apiUrl: globSetting.apiUrl as string,
    // 是否显示提示
    // isShowMessage: true,
    // isShowSuccessMessage: true,
    // isShowErrorMessage: true,
  },
  withCredentials: false,
});

export default Axios;
