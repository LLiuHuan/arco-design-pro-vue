export interface TabItem {
  key: string;
  title: string;
  avatar?: string;
}

export interface MessageRecord {
  id: number;
  type: string;
  title: string;
  subTitle: string;
  avatar?: string;
  content: string;
  time: string;
  status: 0 | 1;
  messageType?: number;
}

export type MessageListType = MessageRecord[];
