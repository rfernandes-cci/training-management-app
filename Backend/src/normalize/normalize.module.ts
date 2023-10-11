import { Module } from '@nestjs/common';
import { NormalizeController } from './normalize.controller';
import { NormalizeService } from './normalize.service';
import { EmployeeModule } from 'src/employee/employee.module';
import { BatchModule } from 'src/batch/batch.module';
import { TrainingDetailModule } from 'src/training-detail/training-detail.module';
import { ApprovedCertificationModule } from 'src/approved-certification/approved-certification.module';
import { CertificationAchievedModule } from 'src/certification-achieved/certification-achieved.module';

@Module({
  imports: [
    EmployeeModule,
    BatchModule,
    TrainingDetailModule,
    ApprovedCertificationModule,
    CertificationAchievedModule,
  ],
  controllers: [NormalizeController],
  providers: [NormalizeService],
})
export class NormalizeModule {}
