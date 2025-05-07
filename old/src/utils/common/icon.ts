import { h, VNode } from 'vue';
import { SvgIcon } from '@/components/Icon';

interface IconConfig {
  /**
   * 图标名称(iconify图标的名称)
   * - 例如：mdi-account 或者 mdi:account
   */
  icon?: string;
  /**
   * 本地svg图标文件名(assets/svg-icon文件夹下)
   */
  localIcon?: string;
  /** 图标颜色 */
  color?: string;
  /** 图标大小 */
  fontSize?: number | string;
}

/**
 * 图标渲染
 * @param config
 * @property icon - 图标名称(iconify图标的名称), 例如：mdi-account 或者 mdi:account
 * @property localIcon - 本地svg图标文件名(assets/svg-icon文件夹下)
 * @property color - 图标颜色
 * @property fontSize - 图标大小
 */
export const iconRender = (config: IconConfig): (() => VNode) | undefined => {
  const { color, fontSize, icon, localIcon } = config;

  if (!icon && !localIcon) {
    // consoleWarn('没有传递图标名称，请确保给icon或localIcon传递有效值!');
    return undefined;
  }

  return () => h(SvgIcon, { icon, localIcon, color, size: fontSize });
};
