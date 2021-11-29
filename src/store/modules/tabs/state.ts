import { RouteItem } from '/#/config';

export type State = {
  tabsList: RouteItem[]; // 标签页
};

export const state: State = {
  tabsList: [],
};
