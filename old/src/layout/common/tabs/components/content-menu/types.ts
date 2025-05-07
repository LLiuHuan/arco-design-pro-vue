export enum TabEventEnum {
  REFRESH_PAGE,
  CLOSE_CURRENT,
  CLOSE_LEFT,
  CLOSE_RIGHT,
  CLOSE_OTHER,
  CLOSE_ALL,
  SCALE,
}

export interface DropOption {
  label: string;
  event: TabEventEnum;
  icon?: string;
  disabled?: boolean;
  divider?: boolean;
}
