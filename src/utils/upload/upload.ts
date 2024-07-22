import { fragmentFile } from '@/utils/upload/file';
import { hashByWebWorker } from '@/utils/upload/hash';


// //! 传入请求列表  最大并发数  全部请求完毕后的回调
// function concurrentSendRequest(requestArr: any, max = 3, callback: any) {
//   let i = 0 // 执行任务计数器
//   let concurrentRequestArr: any[] = [] //并发请求列表

//   let toFetch: any = () => {
//       // (每次执行i+1) 如果i=arr.length 说明是最后一个任务  
//       // 返回一个resolve 作为最后的toFetch.then()执行
//       // (执行Promise.all() 全部任务执行完后执行回调函数  发起文件合并请求)
//       if (i === requestArr.length) {
//           return Promise.resolve()
//       }

//       //TODO 执行异步任务  并推入并发列表(计数器+1)
//       let it = requestArr[i++]()
//       concurrentRequestArr.push(it)

//       //TODO 任务执行后  从并发列表中删除
//       it.then(() => {
//           concurrentRequestArr.splice(concurrentRequestArr.indexOf(it), 1)
//       })

//       //todo 如果并发数达到最大数，则等其中一个异步任务完成再添加
//       let p = Promise.resolve()
//       if (concurrentRequestArr.length >= max) {
//           //! race方法 返回fetchArr中最快执行的任务结果 
//           p = Promise.race(concurrentRequestArr)
//       }
//       //todo race中最快完成的promise,在其.then递归toFetch函数
//       if (globalProp.stop) { return p.then(() => { console.log('停止发送') }) }
//       return p.then(() => toFetch())
//   }

//   // 最后一组任务全部执行完再执行回调函数(发起合并请求)(如果未合并且未暂停)
//   toFetch().then(() =>
//       Promise.all(concurrentRequestArr).then(() => {
//           if (!globalProp.stop && !globalProp.finished) { callback() }
//       })
//   )
// }

const concurRequest = async (taskPool: Array<() => Promise<any>>, max = 4) => {
  
};

export const SimpleUpload = async (
  file: File,
  hash: string,
  setProgress: (value: number) => void,
) => {
  const form = new FormData();
  form.append('file', file);
  form.append('hash', hash);

  // await axios.post('http://localhost:8080/file', form, {
  //   // 上传进度
  //   onUploadProgress: (progressEvent: ProgressEvent) => {
  //     const p = (progressEvent.loaded / file.size) * 100;
  //     setProgress(p);
  //   },
  // });
};

export const ChunkUpload = async (
  file: File,
  setProgress: (value: number) => void,
) => {
  // 默认 分块大小
  const chunkSize = 1024 * 1024 * 5;
  const chunks: ChunkItem[] = await fragmentFile(file, 'sha256', chunkSize);
  const hash = await hashByWebWorker(chunks, 'sha256');
  console.log(chunks);
  console.log(`文件hash: ${hash}`);
  // console.log(chunks);
  // console.log(ChunksHash(chunks));
  // 开始将分块文件上传，并合并，上传进度
  // for (let i = 0; i < chunks.length; i += 1) {
  //   const chunk = chunks[i];
  //   const form = new FormData();
  //   form.append('chunk_file', chunk.blob);
  //   form.append('chunk_index', String(chunk.index));
  //   form.append('chunk_hash', String(chunk.hash));
  //   form.append('chunk_sum', String(chunks.length));
  //   form.append('file_hash', 'sha256');
  //   // 上传分块
  //   // await axios.post('http://localhost:8080/file/chunk', form, {});
  //   // eslint-disable-next-line no-await-in-loop
  //   await new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve('');
  //     }, 1000);
  //   });
  //
  //   // 所有分块上传完毕, 调用 合并文件接口
  //   if (i === chunks.length - 1) {
  //     // await axios.post('http://localhost:8080/file/chunk/merge', form, {});
  //     console.log('已经合并，上传成功');
  //   }
  //   // 更新上传进度
  //   const p = i / (chunks.length - 1);
  //   console.log(p);
  //   setProgress(Number(p.toFixed(2)));
  // }

  // 已经上传的分块文件 index
  // let indexesReady: number[] = [];

  // // 获取上传状态
  // const res = await axios.get('http://localhost:8080/file/chunk/state', {
  //   params: {
  //     hash,
  //   },
  // });

  // // 获取服务端返回数据
  // const { code, indexes } = res.data;
  // // 判断 业务code
  // switch (code) {
  //   // 正常，获取到已上传分块
  //   case 2000:
  //     console.log('正常， 获取到已经上传分块');
  //     indexesReady = indexes;
  //     break;
  //   // 没有文件夹
  //   case 2001:
  //     console.log('没有文件夹');
  //     break;
  //   // 上传成功
  //   case 2002:
  //     console.log('上传成功');
  //     setProgress(100);
  //     return;
  //   // 文件夹为空
  //   case 2003:
  //     console.log('文件夹为空');
  //     break;
  //   default:
  //     break;
  // }

  // // 所有分块上传完毕， 等待合并
  // if (indexesReady.length === chunksSum) {
  //   const form = new FormData();
  //   form.append('chunk_sum', String(chunksSum));
  //   form.append('file_hash', hash);
  //
  //   // await axios.post('http://localhost:8080/file/chunk/merge', form, {});
  //   setProgress(100);
  //   console.log('所有分块上传完毕,已经合并，上传成功');
  // }
  //
  // // 获取数组交集，得到已经成功上传的 分块文件 index 数组 （分块上传时跳过， 断点续传）
  // const uploadedIndex = indexesTotal.filter((item) =>
  //   indexesReady.includes(item),
  // );

  // // 切片文件遍历上传
  // for (
  //   let index = 0, chunkIndex = 0;
  //   index < file.size;
  //   index += chunkSize, chunkIndex += 1
  // ) {
  //   // 在上传成功的分块 index 中， 无需上传分块
  //   // if (uploadedIndex.includes(chunkIndex)) {
  //   //   continue;
  //   // }
  //
  //   const chunkFile = file.slice(index, index + chunkSize);
  //   const chunkHash = await HashFile(chunkFile, 'sha256');
  //
  //   const form = new FormData();
  //   form.append('chunk_file', chunkFile);
  //   form.append('chunk_index', String(chunkIndex));
  //   form.append('chunk_hash', String(chunkHash));
  //   form.append('chunk_sum', String(chunksSum));
  //   form.append('file_hash', hash);
  //   // 上传分块
  //   // await axios.post('http://localhost:8080/file/chunk', form, {});
  //   // 所有分块上传完毕, 调用 合并文件接口
  //   if (chunkIndex === chunksSum - 1) {
  //     // await axios.post('http://localhost:8080/file/chunk/merge', form, {});
  //     console.log('已经合并，上传成功');
  //   }
  //   // 更新上传进度
  //   const p = (chunkIndex / (chunksSum - 1)) * 100;
  //   setProgress(Number(p.toFixed(2)));
  // }
};
