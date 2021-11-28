import { resultSuccess } from '../_utils';

const userInfo = {
  name: '王立群',
  avatar:
    'https://lf1-xgcdn-tos.pstatp.com/obj/vcloud/vadmin/start.8e0e4855ee346a46ccff8ff3e24db27b.png',
  email: 'wangliqun@email.com',
  job: 'frontend',
  jobName: '前端开发工程师',
  organization: 'Frontend',
  organizationName: '前端',
  location: 'beijing',
  locationName: '北京',
  introduction: '王力群并非是一个真实存在的人。',
  personalWebsite: 'https://www.arco.design',
};

const login = (params) => {
  const { userName, password } = JSON.parse(params.body);
  if (!userName) {
    return {
      status: 'error',
      msg: '用户名不能为空',
    };
  }
  if (!password) {
    return {
      status: 'error',
      msg: '密码不能为空',
    };
  }
  if (userName === 'admin' && password === 'admin') {
    return {
      status: 'ok',
    };
  }
  return {
    status: 'error',
    msg: '账号或者密码错误',
  };
};

export default [
  {
    url: '/api/user/userInfo',
    timeout: 1000,
    method: 'get',
    response: () => {
      return resultSuccess(userInfo);
    },
  },
  {
    url: '/api/user/login',
    timeout: 1000,
    method: 'post',
    response: login,
  },
];
