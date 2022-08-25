import { defineStore } from 'pinia';
import watermark from '@/utils/watermark';
import { getNaiveThemeOverrides, getThemeSettings } from './helpers';

type ThemeState = Theme.Setting;

export const useThemeStore = defineStore('theme-store', {
  state: (): ThemeState => getThemeSettings(),
  persist: true,
  getters: {
    /** 主题配置 无用 */
    naiveThemeOverrides(state) {
      return getNaiveThemeOverrides({ primary: state.themeColor, ...state.otherColor });
    },
    /** 暗黑主题 */
    naiveTheme(state) {
      // const darkTheme = document.body.getAttribute('arco-theme');
      return state.darkMode ? 'dark' : '';
    },
    pageAnimateMode(state) {
      return state.page.animate ? state.page.animateMode : undefined;
    },
    /** 语言 */
    getLanguage(state) {
      return state.language ? state.language : 'zh-CN';
    },
  },
  actions: {
    /** 重置theme状态 */
    resetThemeStore() {
      this.$reset();
    },
    /** 设置暗黑模式 */
    setDarkMode(darkMode: boolean) {
      this.darkMode = darkMode;
    },
    /** 设置自动跟随系统主题 */
    setFollowSystemTheme(visible: boolean) {
      this.followSystemTheme = visible;
    },
    /** 自动跟随系统主题 */
    autoFollowSystemMode(darkMode: boolean) {
      if (this.followSystemTheme) {
        this.darkMode = darkMode;
      }
    },
    /** 切换/关闭 暗黑模式 */
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
    },
    /** 设置布局最小宽度 */
    setLayoutMinWidth(minWidth: number) {
      this.layout.minWidth = minWidth;
    },
    /** 设置布局模式 */
    setLayoutMode(mode: EnumType.ThemeLayoutMode) {
      if (mode === 'horizontal-mix') {
        this.fixedHeaderAndTab = true;
      }
      this.layout.mode = mode;
    },
    /** 设置侧边栏反转色 */
    setSiderInverted(isInverted: boolean) {
      this.sider.inverted = isInverted;
    },
    /** 设置头部反转色 */
    setHeaderInverted(isInverted: boolean) {
      this.header.inverted = isInverted;
    },
    /** 设置系统主题颜色 */
    setThemeColor(themeColor: string) {
      this.themeColor = themeColor;
    },
    /** 设置固定头部和多页签 */
    setIsFixedHeaderAndTab(isFixed: boolean) {
      this.fixedHeaderAndTab = isFixed;
    },
    /** 设置重载按钮可见状态 */
    setReloadVisible(visible: boolean) {
      this.showReload = visible;
    },
    /** 设置头部高度 */
    setHeaderHeight(height: number | undefined) {
      if (height) {
        this.header.height = height;
      }
    },
    /** 设置头部面包屑可见 */
    setHeaderCrumbVisible(visible: boolean) {
      this.header.crumb.visible = visible;
    },
    /** 设置头部面包屑图标可见 */
    setHeaderCrumbIconVisible(visible: boolean) {
      this.header.crumb.showIcon = visible;
    },
    /** 设置多页签可见 */
    setTabVisible(visible: boolean) {
      this.tab.visible = visible;
    },
    /** 设置多页签高度 */
    setTabHeight(height: number | undefined) {
      if (height) {
        this.tab.height = height;
      }
    },
    /** 设置多页签风格 */
    setTabMode(mode: EnumType.ThemeTabMode) {
      this.tab.mode = mode;
    },
    /** 设置多页签缓存 */
    setTabIsCache(isCache: boolean) {
      this.tab.isCache = isCache;
    },
    /** 侧边栏宽度 */
    setSiderWidth(width: number | undefined) {
      if (width) {
        this.sider.width = width;
      }
    },
    /** 侧边栏折叠时的宽度 */
    setSiderCollapsedWidth(width: number) {
      this.sider.collapsedWidth = width;
    },
    /** vertical-mix模式下侧边栏宽度 */
    setMixSiderWidth(width: number | undefined) {
      if (width) {
        this.sider.mixWidth = width;
      }
    },
    /** vertical-mix模式下侧边栏折叠时的宽度 */
    setMixSiderCollapsedWidth(width: number) {
      this.sider.mixCollapsedWidth = width;
    },
    /** vertical-mix模式下侧边栏展示子菜单的宽度 */
    setMixSiderChildMenuWidth(width: number) {
      this.sider.mixChildMenuWidth = width;
    },
    /** 设置水平模式的菜单的位置 */
    setHorizontalMenuPosition(position: EnumType.ThemeHorizontalMenuPosition) {
      this.menu.horizontalPosition = position;
    },
    /** 设置底部是否固定 */
    setFooterIsFixed(isFixed: boolean) {
      this.footer.fixed = isFixed;
    },
    /** 设置底部高度 */
    setFooterHeight(height: number) {
      this.footer.height = height;
    },
    /** 设置切换页面时是否过度动画 */
    setPageIsAnimate(animate: boolean) {
      this.page.animate = animate;
    },
    /** 设置页面过渡动画类型 */
    setPageAnimateMode(mode: EnumType.ThemeAnimateMode) {
      this.page.animateMode = mode;
    },
    /** 设置中英文 */
    setLanguage(language: EnumType.Language) {
      this.language = language;
      // localStorage.setItem('arco-locale', value);
      // Message.success(i18.t('navbar.action.locale'));
    },
    /** 设置水印 */
    setWatermark(val: boolean) {
      this.watermark.watermark = val;
      val ? watermark.set(this.watermark.watermarkText || '水印', {}) : watermark.close();
    },
    /** 设置水印文字 */
    setWatermarkText(text: string) {
      this.watermark.watermarkText = text;
    },
  },
});
