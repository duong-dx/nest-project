export interface IConversation {
  id: number | string;
  title: string | null;
  description: string | null;
  emoji: Emojis;
  background: Backgrounds;
  createdAt: Date;
  updatedAt: Date;
}

export enum Emojis {
  like = 'like',
  heart = 'heart',
  haha = 'haha',
}

export enum Backgrounds {
  white = 'white',
  lavender = 'lavender',
  green = 'green',
}
