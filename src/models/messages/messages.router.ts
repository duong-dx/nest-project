import { Routes } from '@nestjs/core';
import { MessagesService } from './messages.service';

export const appRoutes: Routes = [
  {
    path: 'messages',
    module: MessagesService,
    children: [],
  },
];
