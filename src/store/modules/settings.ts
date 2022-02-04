import { defineStore } from 'pinia';
import designSetting from '@/settings/designSetting';
import projectSetting from '@/settings/projectSetting';
import type { IcrumbsSetting, IheaderSetting, ImenuSetting, ImultiTabsSetting } from '/#/config';

const { Theme } = designSetting;
const {
  navMode,
  permissionMode,
  menuSetting,
  showFooter,
  isPageAnimate,
  pageAnimateType,
  multiTabsSetting,
  headerSetting,
  crumbsSetting,
} = projectSetting;

export interface ISettingsState {
  navMode: string; //导航模式
  theme: string; //主题
  loading: boolean; // TODO: 临时测试，无用
  permissionMode: string;
  headerSetting: IheaderSetting; //顶部设置
  menuSetting: ImenuSetting; //菜单
  multiTabsSetting: ImultiTabsSetting; //多标签
  showFooter: boolean; //页脚
  isPageAnimate: boolean; //是否开启路由动画
  pageAnimateType: string; //路由动画类型
  crumbsSetting: IcrumbsSetting; //面包屑
}

export const useSettingStore = defineStore({
  id: 'app-settings',
  state: (): ISettingsState => ({
    navMode: navMode,
    theme: Theme,
    loading: false,
    permissionMode: permissionMode,
    headerSetting: headerSetting,
    menuSetting: menuSetting,
    showFooter: showFooter,
    isPageAnimate: isPageAnimate,
    pageAnimateType: pageAnimateType,
    multiTabsSetting: multiTabsSetting,
    crumbsSetting: crumbsSetting,
  }),
  getters: {
    // 获取导航模式
    getNavMode(): string {
      return this.navMode;
    },
    // 获取背景色
    getTheme(): string {
      return this.theme;
    },
    // 获取是否加载中 测试用
    getLoading(): boolean {
      return this.loading;
    },
    // 是否显示底部栏
    getShowFooter(): boolean {
      return this.showFooter;
    },
    // 是否开启路由动画
    getIsPageAnimate(): boolean {
      return this.isPageAnimate;
    },
    // 路由动画类型
    getPageAnimateType(): string {
      return this.pageAnimateType;
    },
  },
  actions: {
    setTheme(theme: string) {
      this.theme = theme;
    },
    setLoading(loading: boolean) {
      this.loading = loading;
    },
  },
  // 开启数据缓存
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'app-settings',
        storage: localStorage,
        // paths: ['name', 'age']
      },
    ],
  },
});
