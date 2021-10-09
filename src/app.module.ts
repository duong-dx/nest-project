import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from './orm-config';
import { MessagesModule } from './models/messages/messages.module';
import { UsersModule } from './models/users/users.module';
import { AuthModule } from './auth/auth.module';
import { RulesModule } from './models/users/rules/rules.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    MessagesModule,
    UsersModule,
    AuthModule,
    RulesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
