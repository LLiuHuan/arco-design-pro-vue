/**
 * @description: 创建分片
 * @description: create chunk
 *
 * @param file
 * @param index
 * @param chunkSize
 */
export function createChunk(
  file: File,
  index: number,
  chunkSize: number,
): Promise<ChunkItem> {
  return new Promise((resolve, reject) => {
    try {
      const start = index * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const blob = file.slice(start, end);
      // 取出抽样计算hash值的样本，这里取的是前2字节，中间2字节，后2字节
      const mid = start + chunkSize / 2;
      const blobSample = [
        file.slice(start, start + 2),
        file.slice(mid, mid + 2),
        file.slice(end - 2, end),
      ];
      resolve({
        start,
        end,
        index,
        blob,
        blobSample,
      });
    } catch (e) {
      reject(e);
    }
  });
}
