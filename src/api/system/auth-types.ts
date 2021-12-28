export interface authorityInfo {
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt?: Date;
  authorityId: string;
  authorityName: string;
  parentId: string;
  dataAuthorityId?: Array<authorityInfo>;
  children?: Array<authorityInfo>;
  menus?: Array<any>;
  defaultRouter: string;
}
