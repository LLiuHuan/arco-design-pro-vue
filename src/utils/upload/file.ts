import { consoleLog } from '@/utils/common';
import { Algo } from './hash';
import Worker from './chunk.work?worker';

const THREAD_COUNT = navigator.hardwareConcurrency || 4; // 表示可用的硬件线程数，如果浏览器不支持 navigator.hardwareConcurrency 属性，将默认值设为 4

export const fragmentFile = async (
  file: Blob,
  algo: Algo,
  chunkSize: number = 1024 * 1024 * 10,
): Promise<any[]> => {
  return new Promise((resolve) => {
    // 计算文件的分片数量
    const chunkCount = Math.ceil(file.size / chunkSize);
    // 计算每个线程需要处理的分片数量
    const workerChunkCount = Math.ceil(chunkCount / THREAD_COUNT);
    // 获取算法实例
    consoleLog(
      `文件大小${file.size} 总线程${THREAD_COUNT} 总分片数${chunkCount} 每个线程需要处理的分片数${workerChunkCount}`,
    );

    const result: any[] = [];
    let finishCount = 0;

    // 创建线程
    for (let i = 0; i < THREAD_COUNT; i += 1) {
      const worker = new Worker();

      const start = i * workerChunkCount;
      let end = (i + 1) * workerChunkCount;
      if (end > chunkCount) {
        end = chunkCount;
      }
      worker.postMessage({
        file,
        chunkSize,
        start,
        end,
        algo,
      });
      // eslint-disable-next-line no-loop-func
      worker.onmessage = ({ data }) => {
        result[i] = data;
        worker.terminate();
        finishCount += 1;
        if (finishCount === THREAD_COUNT) {
          resolve(result.flat());
        }
      };
    }
  });
};
