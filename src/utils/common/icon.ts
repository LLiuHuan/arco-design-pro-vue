import { h } from 'vue';
import { Icon } from '@iconify/vue';
import SvgIcon from '@/components/custom/SvgIcon.vue';

/**
 * 动态渲染iconify
 * @param icon - 图标名称
 * @param color - 图标颜色
 * @param size - 图标大小
 */
export function iconifyRender(icon: string, color?: string, size?: number) {
  const style: { color?: string; size?: string } = {};
  if (color) {
    style.color = color;
  }
  if (size) {
    style.size = `${size}px`;
  }
  // 开头是icon-的图标 就是默认图标，不需要处理
  if (icon.startsWith('icon-')) {
    return icon;
  }
  return () => h(Icon, { icon, style, class: 'arco-icon arco-icon-file' });
}

/**
 * 动态渲染自定义图标
 * @param icon - 图标名称
 * @param color - 图标颜色
 * @param size - 图标大小
 */
export function customIconRender(icon: string, color?: string, size?: number) {
  const style: { color?: string; size?: string } = {};
  if (color) {
    style.color = color;
  }
  if (size) {
    style.size = `${size}px`;
  }

  return () => h(SvgIcon, { icon, style });
}
