import type { App, ObjectDirective } from 'vue';
import { loadEnv } from 'vite';
import { isExternal } from '@/utils';

export const downLoadUrl: ObjectDirective = {
  mounted(el: any, binding: any) {
    if (binding.value.url) {
      el.addEventListener('click', () => {
        const a = document.createElement('a');
        let url = '';
        if (isExternal(binding.value.url)) {
          url = binding.value.url; // 完整的url则直接使用
        } else {
          const root = process.cwd();
          const mode = import.meta.env.MODE;
          const env = loadEnv(mode, root);
          url = `${env.VITE_PORT}/${binding.value}`; // 若是不完整的url则需要拼接baseURL
        }
        // 这里是将url转成blob地址，
        fetch(url)
          .then((res) => res.blob())
          .then((blob) => {
            // 将链接地址字符内容转变成blob地址
            a.href = URL.createObjectURL(blob);
            // a.download = binding.value.name || ''; // 下载文件的名字
            a.download = url.split('/')[url.split('/').length - 1]; //  // 下载文件的名字
            document.body.appendChild(a);
            a.click();

            // 在资源下载完成后 清除 占用的缓存资源
            window.URL.revokeObjectURL(a.href);
            document.body.removeChild(a);
          });
      });
    }
  },
};

export function setupDownload(app: App) {
  app.directive('download', downLoadUrl);
}
