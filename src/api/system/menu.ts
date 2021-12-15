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
