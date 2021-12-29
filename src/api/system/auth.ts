import http from '@/utils/http/axios';
import { PageInfo } from '@/api/types/common/types';
import { AddAuthority, DelAuthority, UpdAuthority } from '@/api/system/auth-types';

// GetAuthorityList 分页获取角色列表
// @Tags Authority
// @Summary 分页获取角色列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.PageInfo true "页码, 每页大小"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /authority [get]
export const getAuthorityList = (data: PageInfo) => {
  return http.request({
    url: '/v1/authority',
    method: 'get',
    params: data,
  });
};

// DeleteAuthority 删除角色
// @Tags Authority
// @Summary 删除角色
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body system.SysAuthority true "删除角色"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /authority [delete]
export const deleteAuthority = (data: DelAuthority) => {
  return http.request({
    url: '/v1/authority',
    method: 'delete',
    data,
  });
};

// UpdateAuthority 更新角色信息
// @Tags Authority
// @Summary 更新角色信息
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body system.SysAuthority true "权限id, 权限名, 父角色id"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /authority [put]
export const updateAuthority = (data: UpdAuthority) => {
  return http.request({
    url: '/v1/authority',
    method: 'put',
    data,
  });
};

// CreateAuthority 创建角色
// @Tags Authority
// @Summary 创建角色
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body system.SysAuthority true "权限id, 权限名, 父角色id"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /authority [post]
export const createAuthority = (data: AddAuthority) => {
  return http.request({
    url: '/v1/authority',
    method: 'post',
    data,
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
