import http from '@/utils/http/axios';
import { RequestEnum } from '@/enums/httpEnum';

// GetAllApis 获取所有的Api 不分页
// @Tags SysApi
// @Summary 获取所有的Api 不分页
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /v1/api/all [get]
export const getApiAllList = () => {
  return http.request({
    url: '/v1/api/all',
    method: 'get',
  });
};

// @Tags api
// @Summary 分页获取角色列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body modelInterface.PageInfo true "分页获取用户列表"
// @Success 200 {string} json "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /v1/api/page [post]
// {
//  page     int
//	pageSize int
// }
export const getApiList = (data) => {
  return http.request({
    url: '/v1/api/page',
    method: RequestEnum.GET,
    data,
  });
};

// @Tags menu
// @Summary 根据id获取菜单
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body api.GetById true "根据id获取菜单"
// @Success 200 {string} json "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /menu/getApiById [post]
export const getApiById = (id) => {
  return http.request({
    url: '/v1/api/' + id,
    method: 'get',
  });
};

// @Tags Api
// @Summary 更新api
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body api.CreateApiParams true "更新api"
// @Success 200 {string} json "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /api/updateApi [post]
export const updateApi = (data) => {
  return http.request({
    url: '/v1/api',
    method: 'put',
    data,
  });
};

// @Tags Api
// @Summary 创建基础api
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body api.CreateApiParams true "创建api"
// @Success 200 {string} json "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /api/createApi [post]
export const createApi = (data) => {
  return http.request({
    url: '/v1/api',
    method: 'post',
    data,
  });
};

// @Tags Api
// @Summary 删除指定api
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body dbModel.Api true "删除api"
// @Success 200 {string} json "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /api/deleteApi [post]
export const deleteApi = (data) => {
  return http.request({
    url: '/v1/api',
    method: 'delete',
    data,
  });
};

// @Tags SysApi
// @Summary 删除选中Api
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "ID"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /api/deleteApisByIds [delete]
export const deleteApisByIds = (data) => {
  return http.request({
    url: '/v1/api/byIds',
    method: 'delete',
    data,
  });
};
