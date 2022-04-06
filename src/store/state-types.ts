export interface UserInfoType {
  uuid: string;
  nickName: string;
  headerImg?: string;
  authority?: {
    defaultRouter?: string;
    authorityName?: string;
  };
  sideMode?: string;
  activeColor?: string;
  baseColor?: string;
  language?: string;
  authorityId?: string;
}
