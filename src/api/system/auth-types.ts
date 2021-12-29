export interface authorityInfo {
  CreatedAt?: string;
  UpdatedAt?: string;
  DeletedAt?: string;
  authorityId: string;
  authorityName: string;
  parentId: string;
  dataAuthorityId?: Array<authorityInfo>;
  children?: Array<authorityInfo>;
  menus?: Array<any>;
  defaultRouter?: string;
}

export interface DelAuthority {
  authorityId: string;
}

export interface UpdAuthority {
  authorityId: string;
  authorityName: string;
  parentId: string;
  defaultRouter?: string;
}

export interface AddAuthority {
  authorityId: string;
  authorityName: string;
  parentId: string;
}

export interface CopyAuthority {
  authorityId: string;
  authorityName: string;
  parentId: string;
  dataAuthorityId: Array<string>;
}
