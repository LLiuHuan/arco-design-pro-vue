import http from '@/utils/http/axios';

// @Summary 用户登录 获取动态路由
// @Produce  application/json
// @Param 可以什么都不填 调一下即可
// @Router /menu/getMenu [post]
export const asyncMenu = () => {
  return http.request({
    url: '/v1/menus/user',
    method: 'get',
  });
};

// @Summary 获取menu列表
// @Produce  application/json
// @Param {
//  page     int
//	pageSize int
// }
// @Router /v1/menu/getMenuList [post]
export const getMenuList = (data) => {
  return http.request({
    url: '/v1/menus',
    method: 'get',
    params: data,
  });
};

// @Summary 根据id获取menu
// @Produce  application/json
// @Param {
//  page     int
//	pageSize int
// }
// @Router /v1/menu/getBaseMenuById [post]
export const getBaseMenuById = (data) => {
  return http.request({
    url: '/v1/menus/' + data.id,
    method: 'get',
  });
};

export const updateBaseMenu = (data) => {
  return http.request({
    url: '/v1/menus',
    method: 'put',
    data: data,
  });
};

// @Summary 新增基础menu
// @Produce  application/json
// @Param menu Object
// @Router /menu/getMenuList [post]
export const addBaseMenu = (data) => {
  return http.request({
    url: '/v1/menus',
    method: 'post',
    data,
  });
};

// @Summary 删除基础菜单
// @Produce  application/json
// @Param ID float64
// @Router /menu/deleteBaseMenu [post]
export const deleteBaseMenu = (data) => {
  return http.request({
    url: '/v1/menus',
    method: 'delete',
    data,
  });
};

// @Summary 删除基础菜单s
// @Produce  application/json
// @Param IDS []float64
// @Router /menu/deleteBaseMenu [post]
export const deleteBaseMenus = (data) => {
  return http.request({
    url: '/v1/menus/' + data.id,
    method: 'delete',
  });
};

export const getMenuAuth = (data) => {
  return http.request({
    url: '/v1/menus/auth',
    method: 'get',
    params: data,
  });
};

// @Summary 获取基础路由列表
// @Produce  application/json
// @Param 可以什么都不填 调一下即可
// @Router /menu/base [get]
export const getBaseMenuTree = () => {
  return http.request({
    url: '/v1/menus/base',
    method: 'get',
  });
};

// @Summary 添加用户menu关联关系
// @Produce  application/json
// @Param menus Object authorityId string
// @Router /menu/getMenuList [post]
export const addMenuAuthority = (data) => {
  return http.request({
    url: '/v1/menus/auth',
    method: 'post',
    data,
  });
};
