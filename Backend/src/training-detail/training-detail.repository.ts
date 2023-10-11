import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TrainingDetail } from './entities/training-detail.entity';
import { CreateTrainingDetailDto } from './dto/create-training-detail.dto';
import { UpdateTrainingDetailDto } from './dto/update-training-detail.dto';

@Injectable()
export class TrainingDetailRepository extends Repository<TrainingDetail> {
  constructor(private dataSource: DataSource) {
    super(TrainingDetail, dataSource.createEntityManager());
  }

  async createRecord(
    createTrainingDetailDto: CreateTrainingDetailDto,
  ): Promise<TrainingDetail> {
    const newData = this.create(createTrainingDetailDto);
    const createdData = await this.save(newData);

    return createdData;
  }

  async getAll(
    empId: string,
    supId: string,
    clientName: string,
  ): Promise<TrainingDetail[]> {
    const query = this.createQueryBuilder('trainingDetail');
    if (!empId && !supId && !clientName) {
      const data = await query
        .leftJoinAndSelect('trainingDetail.empId', 'emp')
        .leftJoinAndSelect('trainingDetail.batchId', 'batch')
        .getMany();
      return data;
    }

    if (empId) {
      const data = await query
        .leftJoinAndSelect('trainingDetail.empId', 'emp')
        .leftJoinAndSelect('trainingDetail.batchId', 'batch')
        .where('emp.empId = :id', { id: empId })
        .getMany();
      return data;
    }

    if (supId) {
      const data = await query
        .leftJoinAndSelect('trainingDetail.empId', 'emp')
        .leftJoinAndSelect('trainingDetail.batchId', 'batch')
        .where('emp.reportingTo = :id', { id: supId })
        .getMany();
      return data;
    }

    if (clientName) {
      const data = await query
        .leftJoinAndSelect('trainingDetail.empId', 'emp')
        .leftJoinAndSelect('trainingDetail.batchId', 'batch')
        .where('emp.currClient1 ILIKE :client', { client: `%${clientName}%` })
        .getMany();
      return data;
    }
  }

  async getOne(id: string): Promise<TrainingDetail> {
    const query = this.createQueryBuilder('trainingDetail');
    const data = await query
      .leftJoinAndSelect('trainingDetail.empId', 'emp')
      .leftJoinAndSelect('trainingDetail.batchId', 'batch')
      .where('trainingDetail.id = :id', { id: id })
      .getOne();

    if (!data) {
      throw new NotFoundException(`Training Detail for ID: ${id} not found`);
    }

    return data;
  }

  async updateData(
    id: string,
    updateTrainingDetailDto: UpdateTrainingDetailDto,
  ) {
    const data = await this.getOne(id);
    const updateData = Object.assign(data, updateTrainingDetailDto);
    const updatedData = await this.save(updateData);
    return updatedData;
  }

  async deleteData(id: string): Promise<TrainingDetail> {
    const data = await this.getOne(id);

    await this.delete(data);
    return data;
  }
}
