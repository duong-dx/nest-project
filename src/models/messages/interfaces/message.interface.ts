export interface IMessage {
  id: number | string;
  user_id: number | null;
  conversation_id: number | null;
  status: boolean;
  message: string | null;
}

export interface MessageListParam {
  conversation_id: number | string | null;
  take: number | null;
  page: number | null;
}

export interface CreateMessage {
  user_id: number | null;
  conversation_id: number | null;
  status: boolean;
  message: string | null;
  createdAt: Date | null;
  updatedAt: Date | null;
}
