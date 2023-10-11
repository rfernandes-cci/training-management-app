import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobModule } from './Job/job.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { RawDataModule } from './raw-data/raw-data.module';
import { DevtoolsModule } from '@nestjs/devtools-integration';
import { EmployeeModule } from './employee/employee.module';
import { BatchModule } from './batch/batch.module';
import { ApprovedCertificationModule } from './approved-certification/approved-certification.module';
import { TrainingDetailModule } from './training-detail/training-detail.module';
import { CertificationAchievedModule } from './certification-achieved/certification-achieved.module';
import { CertificationOngoingModule } from './certification-ongoing/certification-ongoing.module';
import { databaseAsyncConfig } from './config/database-config';
import { NormalizeModule } from './normalize/normalize.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(databaseAsyncConfig),
    ScheduleModule.forRoot(),
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    JobModule,
    RawDataModule,
    EmployeeModule,
    BatchModule,
    ApprovedCertificationModule,
    TrainingDetailModule,
    CertificationAchievedModule,
    CertificationOngoingModule,
    NormalizeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
