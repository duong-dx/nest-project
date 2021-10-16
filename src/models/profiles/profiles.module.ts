import { Module } from '@nestjs/common';
import { ProfilesController } from './profiles.controller';
import { ProfilesService } from './profiles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfilesRepository } from './profiles.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([ProfilesRepository])],
  controllers: [ProfilesController],
  providers: [ProfilesService, ConfigModule],
  exports: [ProfilesService],
})
export class ProfilesModule {}
