import http from '@/utils/http/axios';
import { PageInfo } from '@/api/types/common/types';

export const getAuthorityList = (data: PageInfo) => {
  return http.request({
    url: '/v1/authority',
    method: 'get',
    params: data,
  });
};

// @Tags authority
// @Summary 拷贝角色
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body api.CreateAuthorityPatams true "拷贝角色"
// @Success 200 {string} json "{"success":true,"data":{},"msg":"拷贝成功"}"
// @Router /authority/copyAuthority [post]
export const copyAuthority = (data) => {
  return http.request({
    url: '/v1/authority/copy',
    method: 'post',
    data,
  });
};

// @Summary 删除角色
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body {authorityId uint} true "删除角色"
// @Success 200 {string} json "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /authority/deleteAuthority [post]
export const deleteAuthority = (data) => {
  return http.request({
    url: '/v1/authority',
    method: 'delete',
    data,
  });
};

// @Summary 修改角色
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysAuthority true "修改角色"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"设置成功"}"
// @Router /authority/setDataAuthority [post]
export const updateAuthority = (data) => {
  return http.request({
    url: '/v1/authority',
    method: 'put',
    data,
  });
};

// @Summary 创建角色
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body api.CreateAuthorityPatams true "创建角色"
// @Success 200 {string} json "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /authority/createAuthority [post]
export const createAuthority = (data) => {
  return http.request({
    url: '/v1/authority',
    method: 'post',
    data,
  });
};
