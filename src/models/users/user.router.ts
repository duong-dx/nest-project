import { Routes } from '@nestjs/core';
import { UsersService } from './users.service';

export const appRoutes: Routes = [
  {
    path: 'users',
    module: UsersService,
    children: [],
  },
];
