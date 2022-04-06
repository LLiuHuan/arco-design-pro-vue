import { authorityInfo } from '@/api/system/auth-types';

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
  authorityIds: string[];
  authority: authorityInfo;
  authorities: authorityInfo[];
}
