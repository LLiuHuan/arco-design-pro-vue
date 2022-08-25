// 水印功能

export interface watermarkType {
  zIndex?: number;
  rotate?: number;
  width?: number;
  height?: number;
  offsets?: {
    x: number;
    y: number;
  };
  fillStyle?: string;
  font?: string;
}

const watermark = {
  set(contents: string[] | string, type: watermarkType) {
    const canvas = document.createElement('canvas');
    canvas.width = type.width || 150;
    canvas.height = type.height || 120;
    canvas.style.display = 'none';
    const watermarkCanvas = canvas.getContext('2d');
    if (watermarkCanvas) {
      // 控制文字的旋转角度和上下位置
      watermarkCanvas.rotate((-(type.rotate || 20) * Math.PI) / 180);
      watermarkCanvas.translate(type.offsets?.x || -50, type.offsets?.y || 20);
      // 文字颜色
      watermarkCanvas.fillStyle = type.fillStyle || '#868686';
      // 文字样式
      watermarkCanvas.font = type.font || '100 16px Microsoft JhengHei ';

      if (typeof contents === 'string') {
        watermarkCanvas.fillText(contents, canvas.width / 3, canvas.height / 2);
      } else {
        contents.forEach((item, index) => {
          watermarkCanvas.fillText(item, canvas.width / 3, canvas.height / 2 + index * 20 + 20);
        });
      }

      // shuiyin.fillText(text2, canvas.width / 3, canvas.height / 2 + 20);
    }

    /* 新建一个用于填充canvas水印的标签，之所以没有直接在body上添加，
       是因为z-index对个别内容影响，才考虑的不用body */
    const watermarkDom = document.createElement('div');
    const styleStr = `
            position:fixed;
            top:0;
            left:0;
            width:100vw;
            height:100vh;
            z-index:${type.zIndex || 1000001};
            pointer-events:none;
            background-repeat:repeat;
            mix-blend-mode: multiply;
            background-image:url('${canvas.toDataURL('image/png')}')`;
    watermarkDom.setAttribute('style', styleStr);
    watermarkDom.classList.add('watermark');
    document.body.appendChild(watermarkDom);

    // 此方法是防止用户通过控制台修改样式去除水印效果
    /* MutationObserver 是一个可以监听DOM结构变化的接口。 */
    const observer = new MutationObserver(() => {
      const wmInstance = document.querySelector('.watermark');
      if ((wmInstance && wmInstance.getAttribute('style') !== styleStr) || !wmInstance) {
        // 如果标签在，只修改了属性，重新赋值属性
        if (wmInstance) {
          // 避免一直触发
          // observer.disconnect();
          // console.log('水印属性修改了');
          wmInstance.setAttribute('style', styleStr);
        } else {
          /* 此处根据用户登录状态，判断是否终止监听，避免用户退出后登录页面仍然有水印 */
          // if (store.getters.token) {
          //   //标签被移除，重新添加标签
          //   // console.log('水印标签被移除了');
          //   document.body.appendChild(watermark);
          // } else {
          observer.disconnect();
          // }
        }
      }
    });
    observer.observe(document.body, {
      attributes: true,
      subtree: true,
      childList: true,
    });
  },
  close() {
    /* 关闭页面的水印，即要移除水印标签 */
    const watermarkDom = document.querySelector('.watermark');
    if (watermarkDom) {
      // watermark.remove();
      document.body.removeChild(watermarkDom);
    }
  },
};
export default watermark;
