export const loginModuleLabels: Record<LoginModuleType, string> = {
  'pwd-login': 'sys.login.pwdLogin.title',
  'code-login': 'sys.login.codeLogin.title',
  'register': 'sys.login.register.title',
  'reset-pwd': 'sys.login.resetPwd.title',
  'bind-wechat': 'sys.login.bindWeChat.title',
  'bind-github': 'sys.login.bindGithub.title',
  'forget-pwd': 'sys.login.forgetPwd.title',
};

export const GITHUB = {
  ClientId: '',
  ClientSecret: '',
};
export const GITHUB_AUTHORIZE_URL = `https://github.com/login/oauth/authorize?client_id=${GITHUB.ClientId}`;
export const GITHUB_TOKEN_URL = `https://cors-anywhere.azm.workers.dev/https://github.com/login/oauth/access_token`;
export const GITHUB_USER_INFO_URL = `https://api.github.com/user`;
