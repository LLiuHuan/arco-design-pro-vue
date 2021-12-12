import http from '@/utils/http/axios';

export function getUserInfo(params) {
  return http.request({
    url: '/user/userInfo',
    method: 'get',
    params,
  });
}

// @Tags User
// @Summary 设置用户信息
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysUser true "设置用户信息"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"修改成功"}"
// @Router /user/setUserInfo [put]
export const setUserInfo = (data) => {
  return http.request({
    url: '/v1/user/setUserInfo',
    method: 'put',
    data: data,
  });
};
