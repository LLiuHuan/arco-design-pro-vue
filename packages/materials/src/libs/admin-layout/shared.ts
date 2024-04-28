import type {
  AdminLayoutProps,
  LayoutCssVars,
  LayoutCssVarsProps,
} from '../../types';

/** The id of the scroll element of the layout */
export const LAYOUT_SCROLL_EL_ID = '__SCROLL_EL_ID__';

/** The max z-index of the layout */
export const LAYOUT_MAX_Z_INDEX = 100;

/**
 * Create layout css vars by css vars props
 *
 * @param props Css vars props
 */
function createLayoutCssVarsByCssVarsProps(props: LayoutCssVarsProps) {
  const cssVars: LayoutCssVars = {
    '--adp-header-height': `${props.headerHeight}px`,
    '--adp-header-z-index': props.headerZIndex,
    '--adp-tab-height': `${props.tabHeight}px`,
    '--adp-tab-z-index': props.tabZIndex,
    '--adp-sider-width': `${props.siderWidth}px`,
    '--adp-sider-collapsed-width': `${props.siderCollapsedWidth}px`,
    '--adp-sider-z-index': props.siderZIndex,
    '--adp-mobile-sider-z-index': props.mobileSiderZIndex,
    '--adp-footer-height': `${props.footerHeight}px`,
    '--adp-footer-z-index': props.footerZIndex,
  };

  return cssVars;
}

/**
 * Create layout css vars
 *
 * @param props
 */
export function createLayoutCssVars(props: AdminLayoutProps) {
  const {
    mode,
    isMobile,
    maxZIndex = LAYOUT_MAX_Z_INDEX,
    headerHeight,
    tabHeight,
    siderWidth,
    siderCollapsedWidth,
    footerHeight,
  } = props;

  const headerZIndex = maxZIndex - 3;
  const tabZIndex = maxZIndex - 5;
  const siderZIndex =
    mode === 'vertical' || isMobile ? maxZIndex - 1 : maxZIndex - 4;
  const mobileSiderZIndex = isMobile ? maxZIndex - 2 : 0;
  const footerZIndex = maxZIndex - 5;

  const cssProps: LayoutCssVarsProps = {
    headerHeight,
    headerZIndex,
    tabHeight,
    tabZIndex,
    siderWidth,
    siderZIndex,
    mobileSiderZIndex,
    siderCollapsedWidth,
    footerHeight,
    footerZIndex,
  };

  return createLayoutCssVarsByCssVarsProps(cssProps);
}
