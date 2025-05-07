import { shallowRef, unref } from 'vue';

/**
 * @description 滚动到目标位置选项
 * @description Scroll to target position options
 */
interface UseScrollToOptions {
  el: any;
  to: number;
  duration?: number;
  callback?: () => any;
}

/**
 * @description 缓动方程函数
 * @description Easing equation function
 * @param t 滚动时间
 * @param b 开始位置
 * @param c 变化量
 * @param d 持续时间
 */
function easeInOutQuad(t: number, b: number, c: number, d: number) {
  t /= d / 2;
  if (t < 1) {
    return (c / 2) * t * t + b;
  }
  t -= 1;
  return (-c / 2) * (t * (t - 2) - 1) + b;
}

/**
 * @description 移动到目标位置
 * @description Move to the target position
 * @param el
 * @param amount
 */
function move(el: HTMLElement, amount: number) {
  el.scrollTop = amount;
}

/**
 * @description 获取当前位置
 * @description Get the current position
 * @param el
 */
const position = (el: HTMLElement) => {
  return el.scrollTop;
};

/**
 * @description 滚动到目标位置
 * @description Scroll to the target position
 */
function useScrollTo({ el, to, duration = 500, callback }: UseScrollToOptions) {
  const isActiveRef = shallowRef(false);
  const start = position(el);
  const change = to - start;
  const increment = 20;
  let currentTime = 0;

  const animateScroll = () => {
    if (!unref(isActiveRef)) {
      return;
    }
    currentTime += increment;
    const val = easeInOutQuad(currentTime, start, change, duration);
    move(el, val);
    if (currentTime < duration && unref(isActiveRef)) {
      requestAnimationFrame(animateScroll);
    } else if (callback && typeof callback === 'function') {
      callback();
    }
  };
  const run = () => {
    isActiveRef.value = true;
    animateScroll();
  };

  const stop = () => {
    isActiveRef.value = false;
  };

  return { start: run, stop };
}

export { useScrollTo, type UseScrollToOptions };
