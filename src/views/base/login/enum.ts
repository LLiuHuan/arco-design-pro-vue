import { useI18n } from '@/hooks/web';

const { t } = useI18n();

export const loginModuleLabels: Record<LoginModuleType, string> = {
  'pwd-login': t('sys.login.pwdLogin.title'),
  'code-login': t('sys.login.codeLogin.title'),
  'register': t('sys.login.register.title'),
  'reset-pwd': t('sys.login.resetPwd.title'),
  'bind-wechat': t('sys.login.bindWeChat.title'),
  'forget-pwd': t('sys.login.forgetPwd.title'),
};
