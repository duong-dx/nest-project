import { Routes } from '@nestjs/core';
import { InformationService } from './information.service';

export const appRoutes: Routes = [
  {
    path: 'messages',
    module: InformationService,
    children: [],
  },
];
