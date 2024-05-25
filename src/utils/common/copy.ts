import { Message } from '@arco-design/web-vue';

export const copyText = (
  text: string,
  prompt: string | null = '已成功复制到剪切板!',
) => {
  if (navigator.clipboard) {
    return navigator.clipboard
      .writeText(text)
      .then(() => {
        prompt && Message.success(prompt);
      })
      .catch((error) => {
        Message.error(`复制失败!${error.message}`);
        return error;
      });
  }
  if (Reflect.has(document, 'execCommand')) {
    return new Promise<void>((resolve, reject) => {
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        // 在手机 Safari 浏览器中，点击复制按钮，整个页面会跳动一下
        textArea.style.opacity = '0';
        textArea.style.position = 'absolute';
        textArea.style.zIndex = '-1';
        // textArea.style.width = '0';
        // textArea.style.position = 'fixed';
        // textArea.style.left = '-999px';
        // textArea.style.top = '10px';
        textArea.setAttribute('readonly', 'readonly');
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);

        prompt && Message.success(prompt);
        resolve();
      } catch (error) {
        Message.error(`复制失败!${error}`);
        reject(error);
      }
    });
  }
  return Promise.reject(
    `"navigator.clipboard" 或 "document.execCommand" 中存在API错误, 拷贝失败!`,
  );
};
