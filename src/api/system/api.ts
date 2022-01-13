import http from '@/utils/http/axios';

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
    method: 'post',
    data,
  });
};
