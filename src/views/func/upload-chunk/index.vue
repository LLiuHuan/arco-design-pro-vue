<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2024-07-13 00:08:42
 * @LastEditTime: 2024-07-17 20:05:08
 * @LastEditors: LLiuHuan
-->
<template>
  <div>
    <a-card>
      <a-upload
        :custom-request="customRequest"
        :file-list="data"
        :on-before-upload="onBeforeUpload"
        action="#"
        directory
        draggable
        multiple
      />

      <!--      <div class="mt-50px"> 验证码</div>-->
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { consoleLog } from '@/utils/common';
  import { fragmentFile } from '@/utils/upload/file';
  import { hashByWebWorker } from '@/utils/upload/hash';
  import { RequestOption, UploadRequest } from '@arco-design/web-vue';
  import { ref } from 'vue';
  import { bigFileUpload } from '@/api/func/upload';

  const data = ref([]);

  /**
   * @description: 上传切片
   *
   * @param chunks 全部切片
   * @param hash 文件hash
   * @param max 最大并发数
   */
  const uploadChunks = async (
    chunks: ChunkItem[],
    hash: string,
    max: number = 2,
  ) => {
    const taskPool = chunks.map(({ blob, index, start, end }) => {
      return bigFileUpload({
        chunk: blob,
        hash,
        index,
        start,
        end,
      });
    });

    let index = 0;
    const concurrentPromise: any[] = [];

    const toFetch: any = () => {
      if (index >= taskPool.length) {
        return Promise.resolve();
      }
      // 执行异步任务
      // eslint-disable-next-line no-plusplus
      const pool = taskPool[index++];
      concurrentPromise.push(pool);

      pool.then(() => {
        concurrentPromise.splice(concurrentPromise.indexOf(pool), 1);
      });

      const p =
        concurrentPromise.length >= max
          ? Promise.race(concurrentPromise)
          : Promise.resolve();
      return p.then(() => toFetch());
    };

    toFetch().then(() => {
      Promise.all(concurrentPromise).then(() => {
        consoleLog('上传完成');
      });
    });
  };

  /**
   * @description: 分片上传
   *
   * @param file 上传的文件
   */
  const ChunkUpload = async (file: File) => {
    // 默认 分块大小
    const chunkSize = 1024 * 1024 * 5;
    const chunks: ChunkItem[] = await fragmentFile(file, 'sha256', chunkSize);
    const hash = await hashByWebWorker(chunks, 'sha256');
    consoleLog(`hash: ${hash}`);

    await uploadChunks(chunks, `${hash}`, 2);
  };

  /**
   * @description: 普通上传
   */
  const SimpleUpload = async () => {};

  const onBeforeUpload = (file: File) => {
    console.log('file111111', file);
    return true;
  };

  const customRequest = (option: RequestOption): UploadRequest => {
    const { onProgress, onError, onSuccess, fileItem } = option;
    // 重置进度
    onProgress(0);

    if (fileItem.file) {
      // 根据文件大小判断是否需要分段上传, 大于30M的文件使用分片上传
      if (fileItem.file.size > 30 * 1024 * 1024) {
        // 切片上传
        ChunkUpload(fileItem.file).then(() => {
          onSuccess();
        });
      } else {
        // 普通上传
        SimpleUpload().then(() => {
          onSuccess();
        });
      }
    } else {
      onError();
    }

    return {
      abort() {
        console.log('abort');
      },
    };
  };
</script>

<style lang="less" scoped></style>
