import { authorityInfo } from '@/api/authority/authority-types';

export interface UserInfo {
  ID: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  uuid: string;
  userName: string;
  nickName: string;
  sideMode: string;
  headerImg: string;
  baseColor: string;
  activeColor: string;
  language: string;
  authorityId: string;
  authorityIds: Array<string>;
  authority: authorityInfo;
  authorities: Array<authorityInfo>;
}
