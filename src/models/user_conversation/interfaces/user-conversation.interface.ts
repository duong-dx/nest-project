export interface IUserConversation {
  id: number;
  user_id: number | null;
  conversation_id: number | null;
  mute: boolean;
  block: boolean;
}
