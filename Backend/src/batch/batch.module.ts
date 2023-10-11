import { Module } from '@nestjs/common';
import { BatchController } from './batch.controller';
import { BatchService } from './batch.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Batch } from './entities/batch.entity';
import { BatchRepository } from './batch.repository';
import { RawBatchRepository } from 'src/raw-data/overall-training/raw-batch.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Batch])],
  controllers: [BatchController],
  providers: [BatchService, BatchRepository, RawBatchRepository],
  exports: [BatchService, BatchRepository, RawBatchRepository],
})
export class BatchModule {}
