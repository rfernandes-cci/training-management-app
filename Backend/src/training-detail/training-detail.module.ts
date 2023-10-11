import { Module } from '@nestjs/common';
import { TrainingDetailController } from './training-detail.controller';
import { TrainingDetailService } from './training-detail.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingDetail } from './entities/training-detail.entity';
import { TrainingDetailRepository } from './training-detail.repository';
import { RawTrainingDashboardRepository } from 'src/raw-data/overall-training/raw-training-dashboard.repository';
import { BatchRepository } from 'src/batch/batch.repository';
import { EmployeeRepository } from 'src/employee/employee.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TrainingDetail])],
  controllers: [TrainingDetailController],
  providers: [
    TrainingDetailService,
    TrainingDetailRepository,
    RawTrainingDashboardRepository,
    BatchRepository,
    EmployeeRepository,
  ],
  exports: [
    TrainingDetailService,
    TrainingDetailRepository,
    RawTrainingDashboardRepository,
    BatchRepository,
    EmployeeRepository,
  ],
})
export class TrainingDetailModule {}
