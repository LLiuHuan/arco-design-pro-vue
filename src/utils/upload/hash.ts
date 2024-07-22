/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2024-07-15 23:20:04
 * @LastEditTime: 2024-07-16 16:12:50
 * @LastEditors: LLiuHuan
 */
import { Algo } from '@/utils/common/hash';
import Worker from './hash.work?worker';

// export const hashFileInternal = async (
//   file: Blob,
//   algo: Hasher,
//   chunkSize: number,
// ): Promise<string> => {
//   let promise = Promise.resolve();
//
//   /* hash blob */
//   const hashBlob = (blob: Blob) => {
//     return new Promise<void>((resolve) => {
//       const reader = new FileReader();
//       reader.onload = ({ target }) => {
//         if (!target!.result) return;
//         if (typeof target!.result === 'string') return;
//         const wordArray = arrayBufferToWordArray(target!.result);
//         // update hash
//         algo.update(wordArray);
//         resolve();
//       };
//       reader.readAsArrayBuffer(blob);
//     });
//   };
//
//   // chunks
//   for (let index = 0; index < file.size; index += chunkSize) {
//     promise = promise.then(() =>
//       hashBlob(file.slice(index, index + chunkSize)),
//     );
//   }
//
//   return promise.then(() => CryptoES.enc.Hex.stringify(algo.finalize()));
// };
//
// /**
//  * @description: hash file
//  *
//  * @param file
//  * @param algo
//  * @param chunkSize
//  * @constructor
//  */
// export const HashFile = async (
//   file: Blob,
//   algo: Algo,
//   chunkSize: number = 1024 * 1024 * 10,
// ): Promise<string> => {
//   const algoInstance = getAlgoInstance(algo);
//   return hashFileInternal(file, algoInstance, chunkSize);
// };

// // 获取文件的hash值
// export const getFileHash = async (file: File, algo: Algo) => {
//   // 应该加上文件地址和文件id
//   const content = `${file.name}+${file.size}+${file.lastModified}`;
//   const algoInstance = getAlgoInstance(algo);
//   algoInstance.update(content);
//   return CryptoES.enc.Hex.stringify(algoInstance.finalize());
// };

// /**
//  * 抽样计算hash值 大概是1G文件花费1S的时间
//  *
//  * 采用抽样hash的方式来计算hash
//  * 我们在计算hash的时候，将超大文件以2M进行分割获得到另一个chunks数组，
//  * 第一个元素(chunks[0])和最后一个元素(chunks[-1])我们全要了
//  * 其他的元素(chunks[1,2,3,4....])我们再次进行一个分割，这个时候的分割是一个超小的大小比如2kb，我们取* 每一个元素的头部，尾部，中间的2kb。
//  *  最终将它们组成一个新的文件，我们全量计算这个新的文件的hash值。
//  * @param file {File}
//  * @returns
//  */
// export async function calcHashSample(file: File) {
//   return new Promise((resolve) => {
//     const spark = new SparkMD5.ArrayBuffer();
//     const reader = new FileReader();
//     // 文件大小
//     const { size } = file;
//     const offset = 2 * 1024 * 1024;
//     const chunks = [file.slice(0, offset)];
//     // 前面2mb的数据
//     let cur = offset;
//     while (cur < size) {
//       // 最后一块全部加进来
//       if (cur + offset >= size) {
//         chunks.push(file.slice(cur, cur + offset));
//       } else {
//         // 中间的 前中后去两个字节
//         const mid = cur + offset / 2;
//         const end = cur + offset;
//         chunks.push(file.slice(cur, cur + 2));
//         chunks.push(file.slice(mid, mid + 2));
//         chunks.push(file.slice(end - 2, end));
//       }
//       // 前取两个字节
//       cur += offset;
//     }
//     // 拼接
//     reader.readAsArrayBuffer(new Blob(chunks));
//     // 最后100K
//     reader.onload = (e) => {
//       spark.append(e.target?.result as ArrayBuffer);
//       resolve({ hashValue: spark.end(), progress: 100 });
//     };
//   });
// }

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
