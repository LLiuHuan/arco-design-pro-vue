function sprintf(format: string, ...args: any[]) {
  return format
    .replace(/%s/g, () => {
      // 最后undefined过滤掉
      return args.shift() ?? '';
    })
    .trim();
}

const prettyLog = () => {
  // const isProduction = import.meta.env.MODE === 'production';
  const isProduction = import.meta.env.PROD;

  const prettyPrint = (
    title: string,
    color: string,
    message: any,
    ...optionalParams: any[]
  ) => {
    if (isProduction) return;
    console.log(
      `%c ${title} %c ${sprintf(message, optionalParams)} %c`,
      `background:${color};border:1px solid ${color}; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;`,
      `border:1px solid ${color}; padding: 1px; border-radius: 0 2px 2px 0; color: ${color};`,
      'background:transparent',
    );
  };
  const info = (message: any, ...optionalParams: any[]) => {
    prettyPrint('Info', '#909399', message, ...optionalParams);
  };
  const infoTitle = (title: string, message: any, ...optionalParams: any[]) => {
    prettyPrint(title, '#909399', message, ...optionalParams);
  };
  const error = (message: any, ...optionalParams: any[]) => {
    prettyPrint('Error', '#F56C6C', message, ...optionalParams);
  };
  const warning = (message: any, ...optionalParams: any[]) => {
    prettyPrint('Warning', '#E6A23C', message, ...optionalParams);
  };
  const success = (message: any, ...optionalParams: any[]) => {
    prettyPrint('Success', '#67C23A', message, ...optionalParams);
  };
  const picture = (url: string, scale = 1) => {
    if (isProduction) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const c = document.createElement('canvas');
      const ctx = c.getContext('2d');
      if (ctx) {
        c.width = img.width;
        c.height = img.height;
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.drawImage(img, 0, 0);
        const dataUri = c.toDataURL('image/png');

        console.log(
          `%c sup?`,
          `font-size: 1px;
                    padding: ${Math.floor((img.height * scale) / 2)}px ${Math.floor((img.width * scale) / 2)}px;
                    background-image: url(${dataUri});
                    background-repeat: no-repeat;
                    background-size: ${img.width * scale}px ${img.height * scale}px;
                    color: transparent;
                    `,
        );
      }
    };
    img.src = url;
  };

  return {
    info,
    infoTitle,
    error,
    warning,
    success,
    picture,
  };
};

/**
 * @description Print log - [打印log]
 * @param message
 * @param optionalParams
 */
export function consoleLog(message?: any, ...optionalParams: any[]) {
  const { info } = prettyLog();
  info(message, ...optionalParams);
}

/**
 * @description Print warn - [打印警告]
 * @param message
 * @param optionalParams
 */
export function consoleWarn(message?: any, ...optionalParams: any[]) {
  const { warning } = prettyLog();
  warning(message, ...optionalParams);
}

/**
 * @description Print error - [打印错误]
 * @param message
 * @param optionalParams
 */
export function consoleError(message?: any, ...optionalParams: any[]) {
  const { error } = prettyLog();
  error(message, ...optionalParams);
}
