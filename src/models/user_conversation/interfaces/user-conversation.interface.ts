export interface IUserConversation {
  id: number;
  user_id: number | null;
  conversation_id: number | null;
  mute: boolean;
  block: boolean;
  last_message_id: number | null;
}

export interface UpdateLastMessage {
  user_id: number;
  conversation_id: number;
  message_id: number;
}
