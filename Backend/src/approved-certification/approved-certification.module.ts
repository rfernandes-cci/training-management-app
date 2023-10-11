import { Module } from '@nestjs/common';
import { ApprovedCertificationController } from './approved-certification.controller';
import { ApprovedCertificationService } from './approved-certification.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ApprovedCertification } from './entities/approved-certification.entity';
import { ApprovedCertificationRepository } from './approved-certification.repository';
import { RawApprovedCertificationRepository } from 'src/raw-data/certification/raw-approved-certification.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ApprovedCertification])],
  controllers: [ApprovedCertificationController],
  providers: [
    ApprovedCertificationService,
    ApprovedCertificationRepository,
    RawApprovedCertificationRepository,
  ],
  exports: [
    ApprovedCertificationService,
    ApprovedCertificationRepository,
    RawApprovedCertificationRepository,
  ],
})
export class ApprovedCertificationModule {}
