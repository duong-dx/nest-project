import { Routes } from '@nestjs/core';
import { ProfilesService } from './profiles.service';

export const appRoutes: Routes = [
  {
    path: 'profiles',
    module: ProfilesService,
    children: [],
  },
];
