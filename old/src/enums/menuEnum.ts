// /**
//  * @description: menu type - [菜单类型]
//  */
// export enum MenuTypeEnum {
//   // left menu - [左侧菜单]
//   SIDEBAR = 'sidebar',
//   // mixin menu - [左侧混合菜单]
//   MIX_SIDEBAR = 'mix-sidebar',
//   // top menu - [顶部菜单]
//   TOP_MENU = 'top-menu',
//   // mixin menu - [顶部混合菜单]
//   MIX_TOP_MENU = 'mix-top-menu',
// }

/**
 * @description: menu mode - [菜单模式]
 */
export enum MenuModeEnum {
  // vertical - [垂直]
  VERTICAL = 'vertical',
  // horizontal - [水平]
  HORIZONTAL = 'horizontal',
  // vertical-mix - [垂直混合]
  VERTICAL_MIX = 'vertical-mix',
  // horizontal-mix - [水平混合]
  HORIZONTAL_MIX = 'horizontal-mix',
}

// 折叠触发器位置
export enum TriggerEnum {
  // 不显示
  NONE = 'NONE',
  // 菜单底部
  FOOTER = 'FOOTER',
  // 头部
  HEADER = 'HEADER',
}

export enum MixSidebarTriggerEnum {
  HOVER = 'hover',
  CLICK = 'click',
}
