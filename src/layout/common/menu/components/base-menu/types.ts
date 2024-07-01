export interface Props {
  /**
   * 当前父组件的主题
   * The theme of the current parent component
   */
  theme?: 'light' | 'dark';
  /**
   * 菜单的模式
   * The mode of the menu
   */
  mode?: 'vertical' | 'horizontal' | 'pop' | 'popButton';
  /**
   * 菜单数据
   * Menu data
   */
  menus: App.Menu[];

  /**
   * 菜单是否收起
   * Whether the menu is collapsed
   */
  collapsed?: boolean;
}

export interface MenuState {
  selectedKeys: string[];
  openKeys: string[];
}

export interface MenuItemProps {
  item: App.Menu;
}
