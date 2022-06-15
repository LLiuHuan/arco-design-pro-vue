const setting = {
  // 导航模式 vertical 左侧菜单模式 horizontal 顶部菜单模式   horizontal 没实现，当前结构实现出来有点问题，有时间再调试
  navMode: 'vertical',
  // 顶部
  headerSetting: {
    // 固定顶部 没用
    fixed: true,
    // 显示重载按钮
    isReload: true,
    // 顶部高度 没用
    headerHeight: '64px',
  },
  // 页脚
  showFooter: true,
  // 菜单权限模式 FIXED 前端固定路由  BACK 动态获取
  permissionMode: 'BACK',
  // 菜单
  menuSetting: {
    // 最小宽度
    minMenuWidth: 48,
    // 菜单宽度
    menuWidth: 200,
    // 固定菜单
    fixed: true,
    // 分割菜单
    mixMenu: false,
    // 折叠
    collapsed: false,
  },
  // 是否开启路由动画
  isPageAnimate: true,
  // 路由动画类型
  pageAnimateType: 'zoom-fade',
  // 多标签
  multiTabsSetting: {
    // 是否显示
    show: true,
    // 固定多标签
    fixed: true,
  },
  // 面包屑
  crumbsSetting: {
    // 是否显示
    show: true,
    // 显示图标
    showIcon: false,
  },
  // 关闭水印
  watermark: false,
};

export default setting;
