import http from '@/utils/http/axios';

// @Tags InitDB
// @Summary 初始化用户数据库
// @Produce  application/json
// @Param data body request.InitDB true "初始化数据库参数"
// @Success 200 {string} string "{"code":0,"data":{},"msg":"自动创建数据库成功"}"
// @Router /initdb/initdb [post]
export const initDB = (data) => {
  return http.request({
    url: '/v1/init/initdb',
    method: 'post',
    data,
  });
};

// @Tags CheckDB
// @Summary 初始化用户数据库
// @Produce  application/json
// @Success 200 {string} string "{"code":0,"data":{},"msg":"探测完成"}"
// @Router /initdb/checkdb [post]
export const checkDB = () => {
  return http.request({
    url: '/v1/init/checkdb',
    method: 'post',
  });
};
