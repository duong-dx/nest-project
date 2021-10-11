export interface IMessage {
  id: number | string;
  conversation_id: number | null;
  status: boolean;
  message: string | null;
}
