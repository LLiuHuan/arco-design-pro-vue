const docEle = document.documentElement;

/* istanbul ignore next */
export function on(
  element: Element | HTMLElement | Document | Window,
  event: string,
  handler: EventListenerOrEventListenerObject,
): void {
  if (element && event && handler) {
    element.addEventListener(event, handler, false);
  }
}

// 给元素添加类名
export function toggleClass(
  flag: boolean,
  clsName: string,
  target?: HTMLElement,
) {
  const targetEl = target || document.body;
  let { className } = targetEl;
  className = className.replace(clsName, '');
  targetEl.className = flag ? `${className} ${clsName} ` : className;
}

// 设置css变量
export function setCssVar(prop: string, val: any, dom = docEle) {
  dom.style.setProperty(prop, val);
}
