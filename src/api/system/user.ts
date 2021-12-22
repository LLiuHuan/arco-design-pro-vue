import http from '@/utils/http/axios';
import { PageInfo } from '@/api/types/common/types';

// @Tags User
// @Summary 获取用户列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body compoments.SysUser true "设置用户信息"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"修改成功"}"
// @Router /user/getUserList [get]
export const getUserList = (data: PageInfo) => {
  return http.request({
    url: '/v1/user/getUserList',
    method: 'get',
    params: data,
  });
};

// 删除用户
export const delUser = (data) => {
  return http.request({
    url: '/v1/user/deleteUser',
    method: 'delete',
    data: data,
  });
};

// @Tags User
// @Summary 设置用户信息
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body compoments.SysUser true "设置用户信息"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"修改成功"}"
// @Router /user/setUserInfo [put]
export const setUserInfo = (data) => {
  return http.request({
    url: '/v1/user/setUserInfo',
    method: 'put',
    data: data,
  });
};

export const setUserAuthorities = (data) => {
  return http.request({
    url: '/v1/user/setUserAuthorities',
    method: 'post',
    data: data,
  });
};

export const register = (data) => {
  return http.request({
    url: '/v1/user/register',
    method: 'post',
    data: data,
  });
};
