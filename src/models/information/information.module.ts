import { Module } from '@nestjs/common';
import { InformationController } from './information.controller';
import { InformationService } from './information.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InformationRepository } from './information.repository';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([InformationRepository])],
  controllers: [InformationController],
  providers: [InformationService, ConfigModule],
  exports: [InformationService],
})
export class InformationModule {}
