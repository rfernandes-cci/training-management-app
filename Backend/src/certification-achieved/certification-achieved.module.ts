import { Module } from '@nestjs/common';
import { CertificationAchievedController } from './certification-achieved.controller';
import { CertificationAchievedService } from './certification-achieved.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CertificationAchieved } from './entities/certification-achieved.entity';
import { CertificationAchievedRepository } from './certification-achieved.repository';
import { RawAchievedRepository } from 'src/raw-data/certification/raw-achieved.repository';
import { EmployeeRepository } from 'src/employee/employee.repository';
import { ApprovedCertificationRepository } from 'src/approved-certification/approved-certification.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CertificationAchieved])],
  controllers: [CertificationAchievedController],
  providers: [
    CertificationAchievedService,
    CertificationAchievedRepository,
    RawAchievedRepository,
    EmployeeRepository,
    ApprovedCertificationRepository,
  ],
  exports: [
    CertificationAchievedService,
    CertificationAchievedRepository,
    RawAchievedRepository,
    EmployeeRepository,
    ApprovedCertificationRepository,
  ],
})
export class CertificationAchievedModule {}
