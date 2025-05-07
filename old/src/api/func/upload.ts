/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2024-07-16 17:49:18
 * @LastEditTime: 2024-07-17 16:11:35
 * @LastEditors: LLiuHuan
 */
import { goHttp } from '@/utils/http';
import { BigFileUploadModel } from './model/uploadModel';

enum Api {
  Upload = '/api/v1/helper/upload',
}

export const bigFileUpload = (params: BigFileUploadModel) => {
  return goHttp.uploadFile(
    {
      url: Api.Upload,
    },
    {
      file: params.chunk,
      data: {
        hash: params.hash,
        index: params.index,
        start: params.start,
        end: params.end,
      },
    },
  );
};
