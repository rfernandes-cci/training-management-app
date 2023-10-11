import { DataSource, Repository } from 'typeorm';
import { RawBatch } from './entities/raw-batch.entity';
import { BatchesDto } from './dto/createBatches.dto';
import { PaginatedResponse } from 'src/core/pagination.interface';
import { UpdateBatchesDto } from '../overall-training/dto/updateBatches.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RawBatchRepository extends Repository<RawBatch> {
  constructor(private dataSource: DataSource) {
    super(RawBatch, dataSource.createEntityManager());
  }

  async createNewEntry(newData: BatchesDto) {
    try {
      const newRow = this.create(newData);
      await this.save(newRow);
    } catch (error) {
      throw new error();
    }
  }

  async getAll(
    pageNo: number,
    noOfRecords: number,
    orderBy: string,
    order: string,
    status: string,
    tech: string,
  ): Promise<PaginatedResponse> {
    const take = noOfRecords || 10;
    const page = pageNo || 1;
    const skip = (page - 1) * take;
    const actualOrderBy = orderBy || 'createdAt';
    let queryBuilder = this.createQueryBuilder('entity');

    if (pageNo == 0) {
      queryBuilder.orderBy(
        `entity.${actualOrderBy}`,
        order === 'asc' ? 'ASC' : 'DESC',
      );
    } else {
      queryBuilder
        .orderBy(`entity.${actualOrderBy}`, order === 'asc' ? 'ASC' : 'DESC')
        .take(take)
        .skip(skip);
    }

    if (status) {
      queryBuilder = queryBuilder.andWhere('entity.status ILIKE :status', {
        status: `${status}%`,
      });
    }
    if (tech) {
      queryBuilder = queryBuilder.andWhere('entity.tech LIKE :tech', {
        tech: `%${tech}%`,
      });
    }

    if (pageNo == 0) {
      const res = await queryBuilder.getMany();
      return { records: res };
    }

    const [result, total] = await queryBuilder.getManyAndCount();

    const totalPages = Math.ceil(total / take);

    return {
      records: result,
      totalRecords: total,
      totalPages,
      currentPage: Number(page),
    };
  }

  async getTech() {
    const queryBuilder = await this.createQueryBuilder('entity')
      .select('entity.tech', 'tech')
      .groupBy('entity.tech')
      .orderBy('entity.tech', 'ASC')
      .getRawMany();
    const techArray = queryBuilder.map((result) => result.tech);

    return techArray;
  }

  async getStatus() {
    const queryBuilder = await this.createQueryBuilder('entity')
      .select('entity.status', 'status')
      .groupBy('entity.status')
      .orderBy('entity.status', 'ASC')
      .getRawMany();
    const statusArray = queryBuilder.map((result) => result.status);

    return statusArray;
  }

  async getOne(id: string): Promise<RawBatch> {
    const result = await this.findOne({ where: { id: id } });
    return result;
  }

  async updateData(
    row: RawBatch,
    updateBatchesDto: UpdateBatchesDto,
  ): Promise<RawBatch> {
    const updateUserEntity = Object.assign(row, updateBatchesDto);
    const updatedUser = await this.save(updateUserEntity);
    return updatedUser;
  }

  async findExisting(conditions: any): Promise<RawBatch[]> {
    const { batchTitle, tech, startDate, trainingCoordinator, headTrainer } =
      conditions;

    const existing = this.find({
      where: {
        batchTitle: batchTitle,
        tech: tech,
        startDate: startDate,
        trainingCoordinator: trainingCoordinator,
        headTrainer: headTrainer,
      },
    });

    return existing;
  }
}
