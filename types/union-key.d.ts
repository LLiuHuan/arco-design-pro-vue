/**
 * 登录模块
 * - pwd-login: 账密登录
 * - code-login: 手机验证码登录
 * - register: 注册
 * - reset-pwd: 重置密码
 * - bind-wechat: 微信绑定
 */
type LoginModuleType =
  | 'pwd-login'
  | 'forget-pwd'
  | 'code-login'
  | 'register'
  | 'reset-pwd'
  | 'bind-wechat';

/**
 * 布局组件的名称
 * - basic 基础布局
 * - blank 空白布局
 */
type LayoutComponentType = 'basic' | 'blank';
