export interface MessageItemData {
  id: string;
  title: string;
  subTitle: string;
  avatar: string;
  content: string;
  time: string;
  status: number;
}

export type MessageListType = MessageItemData[];

import MessageBox from './index.vue';

export { MessageBox };
