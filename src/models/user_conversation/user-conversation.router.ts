import { Routes } from '@nestjs/core';
import { UserConversationService } from './user-conversation.service';

export const appRoutes: Routes = [
  {
    path: 'messages',
    module: UserConversationService,
    children: [],
  },
];
