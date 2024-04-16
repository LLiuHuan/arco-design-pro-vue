/**
 * @description: menu type - [菜单类型]
 */
export enum MenuTypeEnum {
  // left menu - [左侧菜单]
  SIDEBAR = 'sidebar',
  // mixin menu - [混合菜单]
  MIX_SIDEBAR = 'mix-sidebar',
  // mixin menu - [混合菜单]
  MIX = 'mix',
  // top menu - [顶部菜单]
  TOP_MENU = 'top-menu',
}

/**
 * @description: fold trigger position - [折叠触发器位置]
 */
export enum MenuModeEnum {
  // vertical - [垂直]
  VERTICAL = 'vertical',
  // horizontal - [水平]
  HORIZONTAL = 'horizontal',
  // vertical-right - [垂直右]
  VERTICAL_RIGHT = 'vertical-right',
  // inline - [行内]
  INLINE = 'inline',
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
