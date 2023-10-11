import { Module } from '@nestjs/common';
import { CertificationOngoingController } from './certification-ongoing.controller';
import { CertificationOngoingService } from './certification-ongoing.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CertificationOngoing } from './entities/certification-ongoing.entity';
import { CertificationOngoingRepository } from './certification-ongoing.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CertificationOngoing])],
  controllers: [CertificationOngoingController],
  providers: [CertificationOngoingService, CertificationOngoingRepository],
})
export class CertificationOngoingModule {}
