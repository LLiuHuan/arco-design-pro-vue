import http from '@/utils/http/axios';
import { PageInfo } from '@/api/types/common/types';

// @Tags User
// @Summary 获取用户列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body components.SysUser true "设置用户信息"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"修改成功"}"
// @Router /user/getUserList [get]
export const getUserList = (data: PageInfo) => {
  return http.request({
    url: '/v1/users',
    method: 'get',
    params: data,
  });
};

// 删除用户
export const delUser = (data) => {
  return http.request({
    url: '/v1/users',
    method: 'delete',
    data: data,
  });
};

// @Tags User
// @Summary 设置用户信息
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body components.SysUser true "设置用户信息"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"修改成功"}"
// @Router /user/setUserInfo [put]
export const setUserInfo = (data) => {
  return http.request({
    url: '/v1/users',
    method: 'put',
    data: data,
  });
};

export const setUserAuthorities = (data) => {
  return http.request({
    url: '/v1/users/authorities',
    method: 'post',
    data: data,
  });
};

export const register = (data) => {
  return http.request({
    url: '/v1/users/register',
    method: 'post',
    data: data,
  });
};

// @Tags User
// @Summary 设置用户权限
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body api.SetUserAuth true "设置用户权限"
// @Success 200 {string} json "{"success":true,"data":{},"msg":"修改成功"}"
// @Router /v1/users/authority [post]
export const setUserAuthority = (data) => {
  return http.request({
    url: '/v1/users/authority',
    method: 'post',
    data: data,
  });
};

// @Tags User
// @Summary 获取用户信息
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Success 200 {string} json "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /users/info [get]
export const getUserInfo = () => {
  return http.request({
    url: '/v1/users/info',
    method: 'get',
  });
};
