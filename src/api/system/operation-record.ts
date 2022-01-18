import http from '@/utils/http/axios';

// @Tags SysOperationRecord
// @Summary 删除SysOperationRecord
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysOperationRecord true "删除SysOperationRecord"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /v1/operation/record [delete]
export const deleteSysOperationRecord = (data) => {
  return http.request({
    url: '/v1/operation/record',
    method: 'delete',
    data,
  });
};

// @Tags SysOperationRecord
// @Summary 删除SysOperationRecord
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "删除SysOperationRecord"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /v1/operation/record/byIds [delete]
export const deleteSysOperationRecordByIds = (data) => {
  return http.request({
    url: '/v1/operation/record/byIds',
    method: 'delete',
    data,
  });
};

// @Tags SysOperationRecord
// @Summary 分页获取SysOperationRecord列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.PageInfo true "分页获取SysOperationRecord列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /v1/operation/record [get]
export const getSysOperationRecordList = (params) => {
  return http.request({
    url: '/v1/operation/record',
    method: 'get',
    params,
  });
};
