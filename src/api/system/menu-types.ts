export interface MenuTypes {
  CreatedAt: string;
  ID: number;
  UpdatedAt: string;
  authoritys?: Array<any>;
  children?: Array<MenuTypes>;
  component: string;
  hidden: boolean;
  menuId?: string;
  meta: MetaType;
  name: string;
  parameters?: Array<any>;
  parentId: string;
  path: string;
  redirect: string;
  sort: number;
  menu_type: number;
}

export interface MetaType {
  keepAlive: boolean;
  defaultMenu: boolean;
  title: string;
  icon: string;
  closeTab: boolean;
  permissions: string;
}
