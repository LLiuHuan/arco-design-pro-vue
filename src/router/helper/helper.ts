/** 获取登录页面模块的动态路由的正则 */
export function getLoginModuleRegExp() {
  const modules: LoginModuleType[] = [
    'pwd-login',
    'code-login',
    'register',
    'reset-pwd',
    'bind-wechat',
    'bind-github',
  ];
  return modules.join('|');
}
