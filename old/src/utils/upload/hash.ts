/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2024-07-15 23:20:04
 * @LastEditTime: 2024-07-16 16:12:50
 * @LastEditors: LLiuHuan
 */
import { Algo } from '@/utils/common/hash';
import Worker from './hash.work?worker';

/**
 * @description 抽样计算hash值
 */
export const hashByWebWorker = async (chunks: ChunkItem[], algo: Algo) => {
  return new Promise((resolve) => {
    const worker = new Worker();
    // 第一个和最后一个是完整的， 中间的是抽样的，每个切片取前2字节，中间2字节，后2字节
    // 最后拍扁
    const blobs = [
      chunks[0].blob,
      ...chunks.slice(1, chunks.length - 1).map((item) => item.blobSample),
      chunks[chunks.length - 1].blob,
    ].flat();
    worker.postMessage({
      blobs,
      algo,
    });
    worker.onmessage = (e: { data: string }) => {
      resolve(e.data);
      worker.terminate();
    };
  });
};
