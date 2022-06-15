import { http } from '@/utils';

/**
 * 获取验证码
 * @param phone - 手机号
 * @returns - 返回boolean值表示是否发送成功
 */
export function fetchSmsCode(phone: string) {
  return http.request<boolean>({
    url: '/getSmsCode',
    method: 'post',
    params: { phone },
  });
}

/**
 * 登录
 * @param username - 用户名
 * @param password - 密码
 */
export function fetchLogin(username: string, password: string) {
  return http.request<ApiAuth.Token>({
    url: '/login',
    method: 'post',
    params: { username, password },
  });
}

/** 获取用户信息 */
export function fetchUserInfo() {
  return http.request<ApiAuth.UserInfo>({
    url: '/getUserInfo',
    method: 'get',
  });
}

/**
 * 获取用户路由数据
 * @param userId - 用户id
 * @description 后端根据用户id查询到对应的角色类型，并将路由筛选出对应角色的路由数据返回前端
 */
export function fetchUserRoutes(userId: string) {
  return http.request<ApiRoute.Route>({
    url: '/getUserRoutes',
    method: 'post',
    params: { userId },
  });
}

/**
 * 刷新token
 * @param refreshToken
 */
export function fetchUpdateToken(refreshToken: string) {
  return http.request<ApiAuth.Token>({
    url: '/updateToken',
    method: 'post',
    params: { refreshToken },
  });
}
