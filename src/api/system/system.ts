import http from '@/utils/http/axios';

// @Tags system
// @Summary 获取服务器运行状态
// @Security ApiKeyAuth
// @Produce  application/json
// @Success 200 {string} string "{"success":true,"data":{},"msg":"返回成功"}"
// @Router /system/info [get]
export const getSystemState = () => {
  return http.request({
    url: '/v1/system/info',
    method: 'get',
  });
};
