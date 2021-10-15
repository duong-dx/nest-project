import { Routes } from '@nestjs/core';
import { ConversationsService } from './conversations.service';

export const appRoutes: Routes = [
  {
    path: 'conversations',
    module: ConversationsService,
    children: [],
  },
];
