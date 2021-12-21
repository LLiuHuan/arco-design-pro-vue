import http from '@/utils/http/axios';

// @Summary 用户登录 获取动态路由
// @Produce  application/json
// @Param 可以什么都不填 调一下即可
// @Router /menu/getMenu [post]
export const asyncMenu = () => {
  return http.request({
    url: '/v1/menu/getMenu',
    method: 'post',
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
    url: '/v1/menu/getMenuList',
    method: 'post',
    data: data,
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
    url: '/v1/menu/getBaseMenuById',
    method: 'post',
    data: data,
  });
};

export const updateBaseMenu = (data) => {
  return http.request({
    url: '/v1/menu/updateBaseMenu',
    method: 'post',
    data: data,
  });
};
