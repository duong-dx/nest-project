import { Module } from '@nestjs/common';
import { UsersModule } from '../users.module';
import { UserExistsRule } from './user-exists-rule.rule';

@Module({
  imports: [UsersModule],
  providers: [UserExistsRule]
})

export class RulesModule {}
