export interface IMessage {
  id: number | string;
  user_id: number | null;
  conversation_id: number | null;
  status: boolean;
  message: string | null;
}
