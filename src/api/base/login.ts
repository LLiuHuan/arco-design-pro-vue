import http from '@/utils/http/axios';
import * as T from '@/api/base/login-types';

// @Tags login
// @Summary 登陆
// @accept application/json
// @Produce application/json
// @Success 200 {string} string ""
// @Router /jwt/jsonInBlacklist [post]
export const Login = (params: T.ILoginTypes) => {
  return http.request({
    url: '/v1/base/login',
    method: 'post',
    params,
  });
};

// @Tags login
// @Summary 获取验证码
// @accept application/json
// @Produce application/json
// @Success 200 {string} string ""
// @Router /jwt/jsonInBlacklist [post]
export const Captcha = () => {
  return http.request({
    url: '/v1/base/captcha',
    method: 'post',
  });
};

// @Tags login
// @Summary jwt加入黑名单
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Success 200 {string} string "{"success":true,"data":{},"msg":"拉黑成功"}"
// @Router /jwt/jsonInBlacklist [post]
export const jsonInBlacklist = () => {
  return http.request({
    url: '/v1/jwt/black',
    method: 'post',
  });
};
