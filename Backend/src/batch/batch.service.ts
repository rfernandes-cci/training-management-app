import { Injectable, Logger } from '@nestjs/common';
import { BatchRepository } from './batch.repository';
import { CreateBatchDto } from './dto/create-batch.dto';
import { Batch } from './entities/batch.entity';
import { UpdateBatchDto } from './dto/update-batch.dto';
import { RawBatchRepository } from 'src/raw-data/overall-training/raw-batch.repository';

@Injectable()
export class BatchService {
  private logger = new Logger('BatchService');
  constructor(
    private batchRepository: BatchRepository,
    private rawBatchRepo: RawBatchRepository,
  ) {}

  async createBatch(createBatchDto: CreateBatchDto): Promise<Batch> {
    return await this.batchRepository.createRecord(createBatchDto);
  }

  async getAll(): Promise<Batch[]> {
    return await this.batchRepository.getAll();
  }

  async getOne(id: string): Promise<Batch> {
    return await this.batchRepository.getOne(id);
  }

  async updateData(id: string, updateBatchDto: UpdateBatchDto): Promise<Batch> {
    return await this.batchRepository.updateData(id, updateBatchDto);
  }

  async deleteData(id: string): Promise<Batch> {
    return await this.batchRepository.deleteData(id);
  }

  async transferRawData() {
    const rawBatches = await this.rawBatchRepo.find({
      where: { isProcessed: false },
    });
    if (rawBatches.length === 0) {
      this.logger.log('No Data present in raw_batch table to process');
      return { message: 'No Data present in raw_batch table to process' };
    }
    let newData: CreateBatchDto = new CreateBatchDto();

    for (const data of rawBatches) {
      newData.batchTitle = data.batchTitle.trimEnd();
      newData.tech = data.tech.trimEnd();
      newData.startDate = data.startDate;
      newData.endDate = data.endDate;
      newData.trainingCoordinator = data.trainingCoordinator;
      newData.headTrainer = data.headTrainer;
      newData.status = data.status;

      await this.batchRepository.createRecord(newData);
      await this.rawBatchRepo.updateData(data, {
        isProcessed: true,
      });
    }
  }
}
